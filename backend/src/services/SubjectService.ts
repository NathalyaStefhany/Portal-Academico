import { ObjectId } from "mongodb";
import { getCustomRepository, MongoRepository } from "typeorm";
import { Class } from "../entities/Class";
import { Historic } from "../entities/Historic";
import { Requirement } from "../entities/Requirement";
import { Student } from "../entities/Student";
import { Subject } from "../entities/Subject";
import { ClassRepository } from "../repositories/ClassRepository";
import { HistoricRepository } from "../repositories/HistoricRepository";
import { StudentRepository } from "../repositories/StudentRepository";
import { SubjectRepository } from "../repositories/SubjectRepository";

interface classId {
  ClassId: ObjectId;
}

interface Course {
  Course: string;
}

interface RequimentTable {
  Acronym: string;
  Period: number;
  Requirements: Array<Requirement>;
  Credits: number;
  HistoricFlag: number;
}

class SubjectService {
  private subjectRepository: MongoRepository<Subject>;
  private historicRepository: MongoRepository<Historic>;
  private studentRepository: MongoRepository<Student>;
  private classRepository: MongoRepository<Class>;

  constructor() {
    this.subjectRepository = getCustomRepository(SubjectRepository);
    this.historicRepository = getCustomRepository(HistoricRepository);
    this.studentRepository = getCustomRepository(StudentRepository);
    this.classRepository = getCustomRepository(ClassRepository);
  }

  async createSubject(
    acronym: string,
    name: string,
    coursesIn: Array<Course>,
    period: number,
    classes: Array<classId>,
    requirements: Array<Requirement>,
    credits: number
  ) {
    const subjectExist = await this.subjectRepository.findOne({
      Acronym: acronym,
    });

    if (subjectExist) {
      return 0;
    }

    const subject = new Subject(
      acronym,
      name,
      coursesIn,
      period,
      classes,
      requirements,
      credits
    );

    await this.subjectRepository.insertOne(subject);

    return subject;
  }

  async getAllSubjects() {
    const subject = await this.subjectRepository.find();

    return subject;
  }

  async getSubjectByAcronym(acronym: string) {
    const subject = await this.subjectRepository.findOne({
      Acronym: acronym,
    });

    return subject;
  }

  private verifySubjectTaken(
    acronym: string,
    historic: Historic,
    acronymClasses: Array<string>
  ) {
    //Verifica se já foi cursada
    const inHist = historic.Subjects.filter((s) => s.Acronym === acronym);

    if (inHist.length) {
      return 0;
    }

    //Verifica se está sendo cursada
    if (acronymClasses.some((e: string) => e === acronym)) {
      return 1;
    }

    //Ainda não foi cursada
    return 2;
  }

  async getRequirementsTable(matriculationNumber: number) {
    const student = await this.studentRepository.findOne({
      MatriculationNumber: matriculationNumber,
    });

    if (!student) {
      return 0;
    }

    const subjectsToverify = await this.subjectRepository.find({
      where: {
        "CousesIn.Course": { $eq: student.Course },
      },
    });

    if (!subjectsToverify) {
      return 0;
    }

    const historic = await this.historicRepository.findOne({
      MatriculationNumber: matriculationNumber,
    });

    if (!historic) {
      return 0;
    }

    let studentClasses = student.Classes.filter((c) => c.classId);
    let classIds = studentClasses.map((c) => c.classId);
    let classes = [];

    classes.push(
      await Promise.all(
        classIds.map(async (id) => {
          return await this.classRepository.findOne({_id: id});
        })
      )
    );

    const acronymClasses = classes[0].map((c: Class) => {
      return c.Acronym;
    });

    let subjectRequirement: RequimentTable;

    let requirementTable = subjectsToverify.map((s) => {
      subjectRequirement = {
        Acronym: s.Acronym,
        Period: s.Period,
        Requirements: s.Requirements,
        Credits: s.Credits,
        HistoricFlag: this.verifySubjectTaken(
          s.Acronym,
          historic,
          acronymClasses
        ),
      };

      return subjectRequirement;
    });

    requirementTable = requirementTable.sort(function shortSubject(
      subject1: RequimentTable,
      subject2: RequimentTable
    ) {
      if (subject1.Period < subject2.Period) {
        return -1;
      } else if (subject1.Period > subject2.Period) {
        return 1;
      } else {
        return 0;
      }
    });

    return requirementTable;
  }
}

export { SubjectService };
