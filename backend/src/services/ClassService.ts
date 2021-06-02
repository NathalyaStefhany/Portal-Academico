import { ObjectId } from "bson";
import { getCustomRepository, MongoRepository } from "typeorm";
import { Class } from "../entities/Class";
import { Subject } from "../entities/Subject";
import { ClassDate } from "../entities/ClassDate";
import { Frequency } from "../entities/Frequency";
import { SchoolSupply } from "../entities/SchoolSupply";
import { Teacher } from "../entities/Teacher";
import { Test } from "../entities/Test";
import { ClassRepository } from "../repositories/ClassRepository";
import { SubjectRepository } from "../repositories/SubjectRepository";
import { TeacherRepository } from "../repositories/TeacherRepository";
import { TimeTable } from "../entities/TimeTable";

interface matriculationNumber {
  matriculationNumber: number;
}

class ClassService {
  private classRepository: MongoRepository<Class>;
  private teacherRepository: MongoRepository<Teacher>;
  private subjectRepository: MongoRepository<Subject>;

  constructor() {
    this.classRepository = getCustomRepository(ClassRepository);
    this.teacherRepository = getCustomRepository(TeacherRepository);
    this.subjectRepository = getCustomRepository(SubjectRepository);
  }

  async createClass(
    teacherNumber: number,
    acronym: string,
    classParam: string,
    classroom: string,
    classDate: Array<ClassDate>,
    testDates: Array<Test>,
    frequencyLimit: number,
    frequency: Array<Frequency>,
    schoolSupplies: Array<SchoolSupply>,
    students: Array<matriculationNumber>
  ) {
    const classExist = await this.classRepository.findOne({
      where: {
        $and: [{ Class: classParam }, { Acronym: acronym }],
      },
    });

    if (classExist) {
      return 0;
    }

    let teacher = await this.teacherRepository.findOne({
      EmployeeNumber: teacherNumber,
    });

    if (!teacher) {
      return 1;
    }

    let subject = await this.subjectRepository.findOne({
      Acronym: acronym,
    });

    if (!subject) {
      return 1;
    }

    const subjectClass = new Class(
      acronym,
      classParam,
      classroom,
      classDate,
      testDates,
      frequencyLimit,
      frequency,
      schoolSupplies,
      students
    );

    await this.classRepository.insertOne(subjectClass);

    subject.Classes.push({ ClassId: subjectClass._id });
    await this.subjectRepository.findOneAndUpdate(
      { Acronym: acronym },
      {
        $set: {
          Classes: subject.Classes,
        },
      }
    );

    teacher.Classes.push(subjectClass._id);

    const timeTable = new TimeTable(
      subjectClass.Acronym,
      subjectClass.Class,
      subjectClass.Classroom,
      subjectClass.ClassDate
    );
    teacher.TimeTable.push(timeTable);

    await this.teacherRepository.findOneAndUpdate(
      { EmployeeNumber: teacherNumber },
      {
        $set: {
          Classes: teacher.Classes,
          TimeTable: teacher.TimeTable,
        },
      }
    );

    return subjectClass;
  }

  async insertTest(
    acronym: string,
    classParam: string,
    testName: string,
    date: Date,
    time: string,
    local: string
  ) {
    const classExist = await this.classRepository.findOne({
      where: {
        $and: [{ Class: classParam }, { Acronym: acronym }],
      },
    });

    if (!classExist) {
      return 0;
    }

    let flag = 0;
    classExist.TestDates.forEach((t) => {
      if (t.TestName === testName) {
        flag = 1;
      }
    });

    if (flag) {
      return 1;
    }

    let testDates = new Array<Test>();
    testDates = classExist.TestDates;
    testDates.push(new Test(testName, date, time, local));

    await this.classRepository.findOneAndUpdate(
      { _id: classExist._id },
      {
        $set: {
          TestDates: testDates,
        },
      }
    );

    return { Message: "Teste inserido com sucesso" };
  }

  async getClassById(_id: ObjectId) {
    const classParam = await this.classRepository.findOne({
      _id: new ObjectId(_id),
    });

    return classParam;
  }

  async insertFrequency(
    acronym: string,
    classParam: string,
    frequency: Frequency
  ) {
    const classToUpdate = await this.classRepository.findOne({
      where: {
        $and: [{ Class: classParam }, { Acronym: acronym }],
      },
    });

    if (!classToUpdate) {
      return 0;
    }

    let frequencyToInsert = classToUpdate.Frequency;
    frequencyToInsert.push(frequency);

    const result = await this.classRepository.findOneAndUpdate(
      {
        $and: [{ Class: classParam }, { Acronym: acronym }],
      },
      {
        $set: {
          Frequency: frequencyToInsert,
        },
      }
    );

    return result;
  }

  async getTeacher(acronym: string, classParam: string) {
    const classFound = await this.classRepository.findOne({
      where: {
        $and: [{ Class: classParam }, { Acronym: acronym }],
      },
    });

    if (!classFound) {
      return 0;
    }

    let teacherFound = await this.teacherRepository.findOne({
      where: {
        Classes: classFound._id,
      },
    });

    if (!teacherFound) {
      return 1;
    }

    teacherFound.CreatedAt = undefined;
    teacherFound.Email = undefined;
    teacherFound.BirthDate = undefined;
    teacherFound.Password = undefined;
    teacherFound.TimeTable = undefined;
    teacherFound.Classes = undefined;

    return teacherFound;
  }

  async insertFile(acronym: string, classParam: string, file: SchoolSupply) {
    const classFound = await this.classRepository.findOne({
      where: {
        $and: [{ Class: classParam }, { Acronym: acronym }],
      },
    });

    if (!classFound) {
      return 0;
    }

    let schoolSupply = classFound.SchoolSupplies;
    schoolSupply.push(file);

    const result = await this.classRepository.findOneAndUpdate(
      {
        $and: [{ Class: classParam }, { Acronym: acronym }],
      },
      {
        $set: {
          SchoolSupply: schoolSupply
        },
      }
    );

    return result;

  }
}

export { ClassService };
