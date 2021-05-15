import { EntityRepository, MongoRepository } from "typeorm";
import { Teacher } from "../entities/Teacher";

@EntityRepository(Teacher)
class TeacherRepository extends MongoRepository<Teacher>{ }

export { TeacherRepository };