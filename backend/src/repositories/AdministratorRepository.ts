import { EntityRepository, MongoRepository } from "typeorm";
import { Administrator } from "../entities/Administrator";

@EntityRepository(Administrator)
class AdministratorRepository extends MongoRepository<Administrator>{ }

export { AdministratorRepository };