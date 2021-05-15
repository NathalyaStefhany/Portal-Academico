import { EntityRepository, MongoRepository } from "typeorm";
import { AcademicCoefficient } from "../entities/AcademicCoefficient";

@EntityRepository(AcademicCoefficient)
class AcademicCoefficientRepository extends MongoRepository<AcademicCoefficient>{ }

export { AcademicCoefficientRepository };