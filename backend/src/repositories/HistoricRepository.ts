import { EntityRepository, MongoRepository } from "typeorm";
import { Historic } from "../entities/Historic";

@EntityRepository(Historic)
class HistoricRepository extends MongoRepository<Historic>{ }

export { HistoricRepository };