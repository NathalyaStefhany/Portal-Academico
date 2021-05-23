import { getCustomRepository, MongoRepository } from "typeorm";
import { Administrator } from "../entities/Administrator";
import { AdministratorRepository } from "../repositories/AdministratorRepository";
import bcrypt from "bcryptjs";

class AdministratorsService {
  private admininstratorsRepository: MongoRepository<Administrator>;

  constructor() {
    this.admininstratorsRepository = getCustomRepository(
      AdministratorRepository
    );
  }

  async create(
    employeeNumber: number,
    name: string,
    email: string,
    birthDate: Date,
    password: string
  ) {
    const adminExist = await this.admininstratorsRepository.findOne({
      EmployeeNumber: employeeNumber,
    });

    if (adminExist) {
      return 0;
    }

    const admin = new Administrator(
      employeeNumber,
      name,
      email,
      birthDate,
      password
    );

    await this.admininstratorsRepository.insertOne(admin);

    return admin;
  }

  async getAdminByEmployeeNbr(employeeNumber: number) {
    const admin = await this.admininstratorsRepository.findOne({
      EmployeeNumber: employeeNumber,
    });

    return admin;
  }

  async deleteAdminByEmployeeNbr(employeeNumber: number) {
    const admin = await this.admininstratorsRepository.findOneAndDelete({
      EmployeeNumber: employeeNumber,
    });

    return admin.value;
  }

  async updatePassword(
    employeeNumber: number,
    password: string,
    passwordUpdated: string
  ) {
    const admin = await this.admininstratorsRepository.findOne({
      EmployeeNumber: employeeNumber,
    });

    if (await bcrypt.compare(password, admin.Password)) {
      passwordUpdated = bcrypt.hashSync(passwordUpdated, 10);
      const adminUpdated =
        await this.admininstratorsRepository.findOneAndUpdate(
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
}

export { AdministratorsService };
