import { EntityRepository, MongoRepository } from "typeorm";
import { ClassReplacement } from "../entities/ClassReplacement";

@EntityRepository(ClassReplacement)
class ClassReplacementRepository extends MongoRepository<ClassReplacement>{ }

export { ClassReplacementRepository };