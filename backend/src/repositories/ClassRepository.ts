import { EntityRepository, MongoRepository } from "typeorm";
import { Class } from "../entities/Class";

@EntityRepository(Class)
class ClassRepository extends MongoRepository<Class>{ }

export { ClassRepository };