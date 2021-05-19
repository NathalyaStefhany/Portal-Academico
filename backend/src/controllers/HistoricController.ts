import { Request, Response } from "express";
import { HistoricService } from "../services/HistoricService";


class HistoricController {
    async create(request: Request, response: Response): Promise<Response> {
        try {
            const { matriculationNumber, subjects } = request.body;

            const historicService = new HistoricService();

            const historic = await historicService.create(parseInt(matriculationNumber), subjects)

            if (historic) {
                return response.json(historic);
            }
            else {
                return response.status(409).json({
                    "Error": "Já existe histórico para essa matrícula"
                });
            }

        } catch (error) {
            return response.status(500).json({
                message: error.message,
            })
        }
    }

    async getHistoric(request: Request, response: Response): Promise<Response>{
        try {
            const {matriculationNumber} = request.params;

            const historicService = new HistoricService();

            const historic = await historicService.getHistoricByMatNbr(parseInt(matriculationNumber));

            return response.json(historic)
            
        } catch (error) {
            return response.status(500).json({
                message: error.message,
            });
        }
    }
    /* async deleteHistoric(request: Request, response: Response): Promise<Response>{
        try {
            const {matriculationNumber} = request.params;

            const historicService = new HistoricService();

            const historic = await historicService.deleteHistoric(parseInt(matriculationNumber));

            return response.json(historic);
            
        } catch (error) {
            return response.status(500).json({
                message: error.message,
            })
        }
    } */
}

export { HistoricController }