import { getCustomRepository, MongoRepository } from "typeorm";
import { Student } from "../entities/Student";
import { StudentRepository } from "../repositories/StudentRepository";

class StudentService {
  private studentRepository: MongoRepository<Student>;

  constructor() {
    this.studentRepository = getCustomRepository(StudentRepository);
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
}

export { StudentService };
