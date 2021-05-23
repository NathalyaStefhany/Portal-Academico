import { ObjectId } from "mongodb";
import { getCustomRepository, MongoRepository } from "typeorm";
import { ClassReplacement } from "../entities/ClassReplacement";
import { ClassReplacementRepository } from "../repositories/ClassReplacementRepository";

class ClassReplacementService {
    private classReplacementRepository: MongoRepository<ClassReplacement>;

    constructor() {
        this.classReplacementRepository = getCustomRepository(ClassReplacementRepository);
    }

    async createReplacement(classId: ObjectId, date: Date, hour: string, room: string) {
        const replacement = new ClassReplacement(classId, date, hour, room);

        await this.classReplacementRepository.insertOne(replacement);

        return replacement;
    }
}

export { ClassReplacementService }