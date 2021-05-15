import { getCustomRepository, MongoRepository } from "typeorm";
import { Administrator } from "../entities/Administrator";
import { AdministratorRepository } from "../repositories/AdministratorRepository";


class AdministratorsService {
    private admininstratorsRepository: MongoRepository<Administrator>;

    constructor() {
        this.admininstratorsRepository = getCustomRepository(AdministratorRepository);
    }

    async create(employeeNumber: number, name: string, email: string, birthDate: Date) {

        const adminExist = await this.admininstratorsRepository.findOne({
            EmployeeNumber: employeeNumber
        });

        if (adminExist) {
            return 0;
        }

        const admin = new Administrator(employeeNumber, name, email, birthDate)

        await this.admininstratorsRepository.insertOne(admin);

        return admin;
    }

    async getAdminByEmployeeNbr(employeeNumber: number){
        const admin = await this.admininstratorsRepository.findOne({
            EmployeeNumber: employeeNumber
        });

        return admin;
    }

    async deleteAdminByEmployeeNbr(employeeNumber: number){
        const admin = this.admininstratorsRepository.findOneAndDelete({
            "EmployeeNumber": employeeNumber
        });

        return admin;
    }
}

export { AdministratorsService }