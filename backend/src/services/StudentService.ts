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
import { Grade } from "../entities/Grade";

interface TestExam {
  Acronym: string;
  Class: string;
  TestInf: Array<Test>;
}

class StudentService {
  private studentRepository: MongoRepository<Student>;
  private classRepository: MongoRepository<Class>;

  constructor() {
    this.studentRepository = getCustomRepository(StudentRepository);
    this.classRepository = getCustomRepository(ClassRepository);
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

    let classes = new Array<StudentClass>();
    classIds.forEach((id) => {
      const studentClass = new StudentClass(new ObjectId(id), []);
      classes.push(studentClass);
    });

    await this.studentRepository.findOneAndUpdate(
      { MatriculationNumber: matriculationNumber },
      {
        $set: {
          Classes: classes,
        },
      }
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
}

export { StudentService };
