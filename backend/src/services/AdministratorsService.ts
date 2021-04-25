import { getCustomRepository, MongoRepository, Repository } from "typeorm";
import { Administrator } from "../entities/Administrator";
import { AdministratorsRepository } from "../repositories/AdministratorRepository";

class AdministratorsService {
    private admininstratorsRepository: MongoRepository<Administrator>;

    constructor() {
        this.admininstratorsRepository = getCustomRepository(AdministratorsRepository);
    }
    /** 
        async create({ employeeNumber, name, email, birthDate }: IAdministrator) {
            const exist = await this.admininstratorsRepository.findOne(
                {
                    employeeNumber,
                }
            )
        }*/
}

export { AdministratorsService }