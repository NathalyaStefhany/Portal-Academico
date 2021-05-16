import { getCustomRepository, MongoRepository } from "typeorm";
import { Teacher } from "../entities/Teacher";
import { TeacherRepository } from "../repositories/TeacherRepository";


class TeacherService {
    private teacherRepository: MongoRepository<Teacher>;

    constructor() {
        this.teacherRepository = getCustomRepository(TeacherRepository);
    }

    async getAdminByEmployeeNbr(employeeNumber: number) {
        const teacher = await this.teacherRepository.findOne({
            EmployeeNumber: employeeNumber
        });

        return teacher;
    }
}

export { TeacherService }