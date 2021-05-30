import { getCustomRepository, MongoRepository } from "typeorm";
import { Student } from "../entities/Student";
import { StudentRepository } from "../repositories/StudentRepository";
import bcrypt from "bcryptjs";
import { StudentClass } from "../entities/StudentClass";
import { ClassRepository } from "../repositories/ClassRepository";
import { Class } from "../entities/Class";
import { ClassDate } from "../entities/ClassDate";
import { ObjectId } from "mongodb";
import { ClassTimeTable } from "../entities/ClassTimeTable";
import { Test } from "../entities/Test";
import { ClassReplacement } from "../entities/ClassReplacement";
import { ClassReplacementRepository } from "../repositories/ClassReplacementRepository";
import { Grade } from "../entities/Grade";
import { Subject } from "../entities/Subject";
import { SubjectRepository } from "../repositories/SubjectRepository";
import { Teacher } from "../entities/Teacher";
import { TeacherRepository } from "../repositories/TeacherRepository";

interface TestExam {
  Acronym: string;
  Class: string;
  TestInf: Array<Test>;
}

interface Replacement {
  Acronym: string;
  Class: string;
  Date: Date;
  Hour: string;
  Local: string;
}

interface GradeReturn {
  Acronym: string;
  Class: string;
  Test: string;
  Grade: number;
}

interface FrequencyReturn {
  Acronym: string;
  Class: string;
  ClassesTaught: number;
  Absences: number;
}

class StudentService {
  private studentRepository: MongoRepository<Student>;
  private classRepository: MongoRepository<Class>;
  private replacementRepository: MongoRepository<ClassReplacement>;
  private subjectRepository: MongoRepository<Subject>;
  private teacherRepository: MongoRepository<Teacher>;

  constructor() {
    this.studentRepository = getCustomRepository(StudentRepository);
    this.classRepository = getCustomRepository(ClassRepository);
    this.replacementRepository = getCustomRepository(
      ClassReplacementRepository
    );
    this.subjectRepository = getCustomRepository(SubjectRepository);
    this.teacherRepository = getCustomRepository(TeacherRepository);
  }

  async createStudent(
    matriculationNumber: number,
    course: string,
    name: string,
    email: string,
    birthDate: Date,
    cpf: string,
    password: string
  ) {
    const studentExist = await this.studentRepository.findOne({
      MatriculationNumber: matriculationNumber,
    });

    if (studentExist) {
      return 0;
    }

    const student = new Student(
      matriculationNumber,
      course,
      name,
      email,
      birthDate,
      cpf,
      [],
      password
    );

    await this.studentRepository.insertOne(student);

    return student;
  }

  async getStudentByMatNbr(matriculationNumber: number) {
    const student = await this.studentRepository.findOne({
      MatriculationNumber: matriculationNumber,
    });

    return student;
  }

  async deleteStudentByMatriculationNbr(matriculationNumber: number) {
    const admin = this.studentRepository.findOneAndDelete({
      MatriculationNumber: matriculationNumber,
    });

    return admin;
  }

  async updatePassword(
    matriculationNumber: number,
    password: string,
    passwordUpdated: string
  ) {
    const student = await this.studentRepository.findOne({
      MatriculationNumber: matriculationNumber,
    });

    if (await bcrypt.compare(password, student.Password)) {
      passwordUpdated = bcrypt.hashSync(passwordUpdated, 10);
      await this.studentRepository.findOneAndUpdate(
        { MatriculationNumber: matriculationNumber },
        {
          $set: {
            Password: passwordUpdated,
          },
        }
      );

      return { Message: "Senha alterada" };
    }

    return { Error: "Senha atual incorreta" };
  }

  async insertClass(matriculationNumber: number, classIds: Array<ObjectId>) {
    const student = await this.studentRepository.findOne({
      MatriculationNumber: matriculationNumber,
    });

    if (!student) {
      return 0;
    }

    let classes = student.Classes;
    classIds.forEach((id) => {
      id = new ObjectId(id);
      if (
        !classes.some((c) => {
          c.classId === id;
        })
      ) {
        const studentClass = new StudentClass(id, []);
        classes.push(studentClass);
      }
    });

    await this.studentRepository.findOneAndUpdate(
      { MatriculationNumber: matriculationNumber },
      {
        $set: {
          Classes: classes,
        },
      }
    );

    await Promise.all(
      classIds.map(async (id) => {
        const allStudents = await (
          await this.classRepository.findOne({ _id: new ObjectId(id) })
        ).Students;

        allStudents.push({ matriculationNumber: matriculationNumber });

        await this.classRepository.findOneAndUpdate(
          { _id: new ObjectId(id) },
          {
            $set: {
              Students: allStudents,
            },
          }
        );
      })
    );

    return { Message: "Turmas inseridas com sucesso" };
  }

  async insertGrade(
    matriculationNumber: number,
    acronym: string,
    classParam: string,
    description: string,
    percentage: number,
    value: number
  ) {
    const student = await this.studentRepository.findOne({
      MatriculationNumber: matriculationNumber,
    });

    if (!student) {
      return 0;
    }

    const classExist = await this.classRepository.findOne({
      where: {
        $and: [{ Class: classParam }, { Acronym: acronym }],
      },
    });

    if (!classExist) {
      return 0;
    }

    const id = classExist._id;

    let classes = student.Classes;

    let classGrades = classes.filter((value) => value.classId.equals(id))[0];

    let grades = classGrades.Grades;

    grades.push(new Grade(description, percentage, value));

    await this.studentRepository.findOneAndUpdate(
      {
        MatriculationNumber: matriculationNumber,
        "Classes.classId": new ObjectId(id),
      },
      {
        $set: {
          "Classes.$.Grades": grades,
        },
      }
    );

    return { Message: "Nota inserida com sucesso" };
  }

  async getTimeTable(matriculationNumber: number) {
    const student = await this.studentRepository.findOne({
      MatriculationNumber: matriculationNumber,
    });

    if (!student) {
      return 0;
    }

    let timeTable = [];
    let classTime: ClassTimeTable;

    timeTable.push(
      await Promise.all(
        student.Classes.map(async (studentClass) => {
          const classToInsert = await this.classRepository.findOne(
            studentClass.classId as unknown as string
          );

          let classDates = new Array<ClassDate>();

          classToInsert.ClassDate.forEach((e) => {
            classDates.push(e);
          });

          classTime = new ClassTimeTable(
            classToInsert.Acronym,
            classToInsert.Class,
            classToInsert.Classroom,
            classDates
          );

          return classTime;
        })
      )
    );

    return timeTable[0];
  }

  async getTests(matriculationNumber: number) {
    const student = await this.studentRepository.findOne({
      MatriculationNumber: matriculationNumber,
    });

    if (!student) {
      return 0;
    }

    let tests = [];
    let test: TestExam;

    tests.push(
      await Promise.all(
        student.Classes.map(async (studentClass) => {
          const classToInsert = await this.classRepository.findOne(
            studentClass.classId as unknown as string
          );

          test = {
            Acronym: classToInsert.Acronym,
            Class: classToInsert.Class,
            TestInf: classToInsert.TestDates,
          };

          return test;
        })
      )
    );

    return tests[0];
  }

  async getReplacements(matriculationNumber: number) {
    const student = await this.studentRepository.findOne({
      MatriculationNumber: matriculationNumber,
    });

    if (!student) {
      return 0;
    }

    let replacements = [];
    let replacement: Replacement;

    await Promise.all(
      student.Classes.map(async (studentClass) => {
        const replacementToInsert = await this.replacementRepository.find({
          ClassId: studentClass.classId,
        });

        if (replacementToInsert.length) {
          const rep = replacementToInsert.map((r) => {
            replacement = {
              Acronym: r.Acronym,
              Class: r.Class,
              Date: r.Date,
              Hour: r.Hour,
              Local: r.Room,
            };

            return replacement;
          });

          replacements = replacements.concat(rep);
        }
      })
    );

    return replacements;
  }

  async getGrades(matriculationNumber: number) {
    const student = await this.studentRepository.findOne({
      MatriculationNumber: matriculationNumber,
    });

    if (!student) {
      return 0;
    }

    let grade: GradeReturn;
    let grades = [];

    await Promise.all(
      student.Classes.map(async (studentClass) => {
        const classFound = await this.classRepository.find({
          where: {
            _id: studentClass.classId,
          },
        });

        if (classFound.length) {
          const studentGrades = student.Classes.filter(
            (c) => c.classId === studentClass.classId
          );

          grades.push(
            studentGrades[0].Grades.length
              ? studentGrades[0].Grades.map((g) => {
                  grade = {
                    Acronym: classFound[0].Acronym,
                    Class: classFound[0].Class,
                    Test: g.Description,
                    Grade: g.Value,
                  };

                  return grade;
                })
              : [
                  {
                    Acronym: classFound[0].Acronym,
                    Class: classFound[0].Class,
                    Test: "-",
                    Grade: "-",
                  },
                ]
          );
        }
      })
    );

    return grades;
  }

  async getFrequency(matriculationNumber: number) {
    const student = await this.studentRepository.findOne({
      MatriculationNumber: matriculationNumber,
    });

    if (!student) {
      return 0;
    }

    let frequencies = [];
    let frequencyToInsert: FrequencyReturn;

    await Promise.all(
      student.Classes.map(async (studentClass) => {
        const classFound = await this.classRepository.findOne({
          where: {
            _id: studentClass.classId,
          },
        });

        if (classFound.Frequency.length) {
          let classesTaughtToInsert = 0;
          let absencesToInsert = 0;

          classFound.Frequency.map((freq) => {
            classesTaughtToInsert += freq.ClassesTaught;

            freq.MissingStudents.some((m) => m === matriculationNumber)
              ? (absencesToInsert += freq.ClassesTaught)
              : (absencesToInsert += 0);
          });

          frequencies.push(
            (frequencyToInsert = {
              Acronym: classFound.Acronym,
              Class: classFound.Class,
              ClassesTaught: classesTaughtToInsert,
              Absences: absencesToInsert,
            })
          );
        } else {
          frequencies.push(
            (frequencyToInsert = {
              Acronym: classFound.Acronym,
              Class: classFound.Class,
              ClassesTaught: 0,
              Absences: 0,
            })
          );
        }
      })
    );

    return frequencies;
  }

  async getOpeningHours(matriculationNumber: number) {
    const student = await this.studentRepository.findOne({
      MatriculationNumber: matriculationNumber,
    });

    if (!student) {
      return 0;
    }

    let openingHours = new Array<ClassTimeTable>();

    await Promise.all(
      student.Classes.map(async (studentClass) => {
        const classFound = await this.classRepository.findOne({
          where: {
            _id: studentClass.classId,
          },
        });

        if (classFound) {
          const allClasses = [];

          const subjectClasses = await this.subjectRepository.findOne({
            Acronym: classFound.Acronym,
          });

          if (subjectClasses) {
            subjectClasses.Classes.map((c) => {
              allClasses.push(c.ClassId);
            });

            const teachers = await this.teacherRepository.find({
              where: {
                Classes: { $in: allClasses },
              },
            });

            teachers.map((teacher) => {
              const teacherSchedule = teacher.TimeTable.filter(
                (t) => t.Classroom === "Atendimento"
              );
              teacherSchedule.map((ts) => {
                openingHours.push(
                  new ClassTimeTable(
                    ts.Acronym,
                    ts.Class,
                    "Sala do professor",
                    ts.Date
                  )
                );
              });
            });
          }
        }
      })
    );

    return openingHours;
  }
}

export { StudentService };
