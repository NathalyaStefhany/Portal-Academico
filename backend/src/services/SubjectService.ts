import { ObjectId } from "mongodb";
import { getCustomRepository, MongoRepository } from "typeorm";
import { Requirement } from "../entities/Requirement";
import { Subject } from "../entities/Subject";
import { SubjectRepository } from "../repositories/SubjectRepository";

interface classId {
    classId: ObjectId
}

class SubjectService {
    private subjectRepository: MongoRepository<Subject>;

    constructor() {
        this.subjectRepository = getCustomRepository(SubjectRepository);
    }

    async createSubject(
        acronym: string, name: string, period: number, classes: Array<classId>,
        requirements: Array<Requirement>, credits: number) {

        const subjectExist = await this.subjectRepository.findOne({
            Acronym: acronym
        });

        if(subjectExist){
            return 0;
        }

        const subject = new Subject(acronym, name, period, classes, requirements, credits);

        await this.subjectRepository.insertOne(subject);

        return subject;

    }

    async getSubjectByAcronym(acronym: string){
        const subject = await this.subjectRepository.findOne({
            Acronym: acronym
        });

        return subject;
    }
}

export { SubjectService }