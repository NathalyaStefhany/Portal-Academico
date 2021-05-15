import { EntityRepository, MongoRepository } from "typeorm";
import { Student } from "../entities/Student";

@EntityRepository(Student)
class StudentRepository extends MongoRepository<Student>{ }

export { StudentRepository };