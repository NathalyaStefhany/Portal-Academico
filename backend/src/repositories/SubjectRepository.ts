import { EntityRepository, MongoRepository } from "typeorm";
import { Subject } from "../entities/Subject";

@EntityRepository(Subject)
class SubjectRepository extends MongoRepository<Subject>{ }

export { SubjectRepository };