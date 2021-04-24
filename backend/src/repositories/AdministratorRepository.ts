import { EntityRepository, MongoRepository, Repository } from "typeorm";
import { Administrator } from "../entities/Administrator";

@EntityRepository(Administrator)
class AdministratorsRepository extends MongoRepository<Administrator>{ }

export { AdministratorsRepository };