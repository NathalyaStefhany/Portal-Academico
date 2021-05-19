import { Request, Response } from "express";
import { AcademicCoefficientService } from "../services/AcademicCoefficientService"


class AcademicCoefficientController {
    async create(request: Request, response: Response): Promise<Response> {
        try {
            const { matriculationNumber, values } = request.body;

            const coefficientService = new AcademicCoefficientService();

            const coefficient = await coefficientService.create(parseInt(matriculationNumber), values);

            if (coefficient) {
                return response.json(coefficient);
            }
            else {
                return response.status(409).json({ "Error": "Coeficiente existente" });
            }

        } catch (error) {
            return response.status(500).json({
                message: error.message,
            });
        }
    }

    async getCoefficient(request: Request, response: Response): Promise<Response> {
        try {
            const {matriculationNumber} = request.params;

            const coefficientService = new AcademicCoefficientService();

            const coefficient = await coefficientService.getCoefficientByMatNbr(parseInt(matriculationNumber));

            return response.json(coefficient);
            
        } catch (error) {
            return response.status(500).json({
                message: error.message,
            });
        }
    }

    async deleteCoefficient(request: Request, response: Response): Promise<Response> {
        try {
            const {matriculationNumber} = request.params;

            const coefficientService = new AcademicCoefficientService();

            const coefficient = await coefficientService.deleteCoefficient(parseInt(matriculationNumber));

            return response.json(coefficient);

        } catch (error) {
            return response.status(500).json({
                message: error.message,
            })
        }
    }
}

export { AcademicCoefficientController }