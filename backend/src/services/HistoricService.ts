import { getCustomRepository, MongoRepository } from "typeorm";
import { Historic } from "../entities/Historic";
import { SubjectHist } from "../entities/SubjectHist";
import { HistoricRepository } from "../repositories/HistoricRepository";

class HistoricService {
  private historicRepository: MongoRepository<Historic>;

  constructor() {
    this.historicRepository = getCustomRepository(HistoricRepository);
  }

  async create(matriculationNumber: number, subjects: Array<SubjectHist>) {
    const matExist = await this.historicRepository.findOne({
      MatriculationNumber: matriculationNumber,
    });

    if (matExist) {
      return 0;
    }

    const historic = new Historic(matriculationNumber, subjects);

    await this.historicRepository.insertOne(historic);

    return historic;
  }

  async getHistoricByMatNbr(matriculationNumber: number) {
    const historic = await this.historicRepository.findOne({
      MatriculationNumber: matriculationNumber,
    });

    return historic;
  }

  async deleteHistoric(matriculationNumber: number) {
    const historic = await this.historicRepository.findOneAndDelete({
      MatriculationNumber: matriculationNumber,
    });

    return historic;
  }
}

export { HistoricService };
