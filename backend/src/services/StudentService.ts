import { getCustomRepository, MongoRepository } from "typeorm";
import { Student } from "../entities/Student";
import { StudentRepository } from "../repositories/StudentRepository";
import bcrypt from "bcryptjs";


class StudentService {
    private studentRepository: MongoRepository<Student>;

    constructor() {
        this.studentRepository = getCustomRepository(StudentRepository);
    }

    async createStudent(
        matriculationNumber: number, name: string, email: string, birthDate: Date, 
        cpf: string, password: string){
            
        const studentExist = await this.studentRepository.findOne({
            MatriculationNumber: matriculationNumber
        });

        if(studentExist){
            return 0;
        }

        const student = new Student(matriculationNumber, name, email, birthDate, cpf, [], password);

        await this.studentRepository.insertOne(student);

        return student;

    }

    async getStudentByMatNbr(matriculationNumber: number) {
        const student = await this.studentRepository.findOne({
            MatriculationNumber: matriculationNumber
        });

        return student;
    }

    async updatePassword(matriculationNumber: number, password: string, passwordUpdated: string){
        const student = await this.studentRepository.findOne({
            MatriculationNumber: matriculationNumber
        });

        if (await bcrypt.compare(password, student.Password)){
            passwordUpdated = bcrypt.hashSync(passwordUpdated, 10);
            const studentUpdated = await this.studentRepository.findOneAndUpdate(
                {MatriculationNumber: matriculationNumber},
                {
                    $set: {
                        "Password": passwordUpdated
                    }
                }
            );

            return studentUpdated.value;
        }

        return {Error: "Senha atual incorreta"};
    }
}

export { StudentService }