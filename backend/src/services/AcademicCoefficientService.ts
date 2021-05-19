import { getCustomRepository, MongoRepository } from "typeorm";
import { AcademicCoefficient } from "../entities/AcademicCoefficient";
import { Coefficient } from "../entities/Coefficient";
import { AcademicCoefficientRepository } from "../repositories/AcademicCoefficientRepository";


class AcademicCoefficientService {
    private coefficientRepository: MongoRepository<AcademicCoefficient>

    constructor() {
        this.coefficientRepository = getCustomRepository(AcademicCoefficientRepository);
    }

    async create(matriculationNumber: number, values: Array<Coefficient>) {
        const matExist = await this.coefficientRepository.findOne({
            MatriculationNumber: matriculationNumber
        });

        if (matExist) {
            return 0;
        }

        const coefficient = new AcademicCoefficient(matriculationNumber, values)

        await this.coefficientRepository.insertOne(coefficient);

        return coefficient;
    }

    async getCoefficientByMatNbr(matriculationNumber: number){
        const coefficient = await this.coefficientRepository.findOne({
            MatriculationNumber: matriculationNumber
        });

        return coefficient;
    }

    async deleteCoefficient(matriculationNumber: number){
        const coefficient = await this.coefficientRepository.findOneAndDelete({
            "MatriculationNumber": matriculationNumber
        });

        return coefficient;
    }
}

export { AcademicCoefficientService }