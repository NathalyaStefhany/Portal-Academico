import { getCustomRepository, MongoRepository } from "typeorm";
import { Teacher } from "../entities/Teacher";
import { TeacherRepository } from "../repositories/TeacherRepository";
import bcrypt from "bcryptjs";
import { TimeTable } from "../entities/TimeTable";

class TeacherService {
  private teacherRepository: MongoRepository<Teacher>;

  constructor() {
    this.teacherRepository = getCustomRepository(TeacherRepository);
  }

  async createTeacher(
    employeeNumber: number,
    name: string,
    email: string,
    birthDate: Date,
    password: string
  ) {
    const teacherExist = await this.teacherRepository.findOne({
      EmployeeNumber: employeeNumber,
    });

    if (teacherExist) {
      return 0;
    }

    const teacher = new Teacher(
      employeeNumber,
      name,
      email,
      birthDate,
      [],
      [],
      password
    );

    await this.teacherRepository.insertOne(teacher);

    return teacher;
  }

  async getTeacherByEmployeeNbr(employeeNumber: number) {
    const teacher = await this.teacherRepository.findOne({
      EmployeeNumber: employeeNumber,
    });

    return teacher;
  }

  async updatePassword(
    employeeNumber: number,
    password: string,
    passwordUpdated: string
  ) {
    const teacher = await this.teacherRepository.findOne({
      EmployeeNumber: employeeNumber,
    });

    if (await bcrypt.compare(password, teacher.Password)) {
      passwordUpdated = bcrypt.hashSync(passwordUpdated, 10);
      await this.teacherRepository.findOneAndUpdate(
        { EmployeeNumber: employeeNumber },
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

  async insertTimeTable(employeeNumber: number, timeTable: TimeTable) {
    const teacher = await this.teacherRepository.findOne({
      EmployeeNumber: employeeNumber,
    });

    if (!teacher) {
      return 0;
    }

    let timeTableToInsert = teacher.TimeTable;
    timeTableToInsert.push(timeTable);

    const result = await this.teacherRepository.findOneAndUpdate(
      { EmployeeNumber: employeeNumber },
      {
        $set: {
          TimeTable: timeTableToInsert,
        },
      }
    );

    return result;
  }

  async getTimeTable(employeeNumber: number) {
    const teacher = await this.teacherRepository.findOne({
      EmployeeNumber: employeeNumber,
    });

    if (!teacher) {
      return 0;
    }

    return teacher.TimeTable;
  }


}

export { TeacherService };
