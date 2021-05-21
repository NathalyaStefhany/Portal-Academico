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

    subjects = subjects.sort(
      function shortSubject(subject1: SubjectHist, subject2: SubjectHist) {
        let num1 = subject1.SemesterYear.charAt(2) as unknown as number;
        let num2 = subject2.SemesterYear.charAt(2) as unknown as number;

        if (num1 > num2) {
          return 1;
        }
        else if (num1 < num2) {
          return -1;
        }
        else {
          num1 = subject1.SemesterYear.charAt(3) as unknown as number;
          num2 = subject2.SemesterYear.charAt(3) as unknown as number;

          if (num1 > num2) {
            return 1;
          }
          else if (num1 < num2) {
            return -1;
          }
          else {
            num1 = subject1.SemesterYear.charAt(5) as unknown as number;
            num2 = subject2.SemesterYear.charAt(5) as unknown as number;

            if (num1 > num2) {
              return 1;
            }
            else if (num1 < num2) {
              return -1;
            }
            else {
              return 0;
            }
          }
        }
      });

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
