import { getCustomRepository, MongoRepository } from "typeorm";
import { Student } from "../entities/Student";
import { StudentRepository } from "../repositories/StudentRepository";


class StudentService {
    private studentRepository: MongoRepository<Student>;

    constructor() {
        this.studentRepository = getCustomRepository(StudentRepository);
    }

    async getStudentByMatNbr(matriculationNumber: number) {
        const student = await this.studentRepository.findOne({
            MatriculationNumber: matriculationNumber
        });

        return student;
    }
}

export { StudentService }