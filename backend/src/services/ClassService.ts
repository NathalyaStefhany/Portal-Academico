import { getCustomRepository, MongoRepository } from "typeorm";
import { Class } from "../entities/Class";
import { ClassDate } from "../entities/ClassDate";
import { Frequency } from "../entities/Frequency";
import { SchoolSupply } from "../entities/SchoolSupply";
import { Test } from "../entities/Test";
import { ClassRepository } from "../repositories/ClassRepository";

interface matriculationNumber {
    matriculationNumber: number
}

class ClassService {
    private classRepository: MongoRepository<Class>;

    constructor() {
        this.classRepository = getCustomRepository(ClassRepository);
    }

    async createClass(
        acronym: string, classParam: string, classroom: string, classDate: Array<ClassDate>,
        testDates: Array<Test>, frequencyLimit: number, frequency: Array<Frequency>,
        schoolSupplies: Array<SchoolSupply>, students: Array<matriculationNumber>) {

        const classExist = await this.classRepository.findOne({
            Class: classParam
        });

        if (classExist) {
            return 0;
        }

        const subjectClass = new Class(acronym, classParam, classroom, classDate, testDates, frequencyLimit, frequency, schoolSupplies, students);

        await this.classRepository.insertOne(subjectClass);

        return subjectClass;

    }
}

export { ClassService }