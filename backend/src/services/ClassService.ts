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
            where: {
                $and: [
                    { Class: classParam },
                    { Acronym: acronym }
                ]
            }
        });

        if (classExist) {
            return 0;
        }

        const subjectClass = new Class(acronym, classParam, classroom, classDate, testDates, frequencyLimit, frequency, schoolSupplies, students);

        await this.classRepository.insertOne(subjectClass);

        return subjectClass;

    }

    async insertTest(acronym: string, classParam: string, testName: string, date: Date, time: string, local: string) {
        const classExist = await this.classRepository.findOne({
            where: {
                $and: [
                    { Class: classParam },
                    { Acronym: acronym }
                ]
            }
        });

        if (!classExist) {
            return 0;
        }

        let flag = 0;
        classExist.TestDates.forEach(t => {
            if (t.TestName === testName) {
                flag = 1;
            }
        });

        if (flag) {
            return 1;
        }

        let testDates = new Array<Test>();
        testDates = classExist.TestDates;
        testDates.push(new Test(testName, date, time, local))

        await this.classRepository.findOneAndUpdate(
            { _id: classExist._id },
            {
                $set: {
                    TestDates: testDates
                }
            }
        );

        return { Message: "Teste inserido com sucesso" };

    }
}

export { ClassService }