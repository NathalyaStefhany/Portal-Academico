import { Request, Response } from "express";
import { ClassService } from "../services/ClassService";

class ClassController {
    async create(request: Request, response: Response): Promise<Response> {
        try {
            const {
                acronym, classParam, classRoom, classDate, testDates, frequencyLimit,
                frequency, schoolSupplies, students
            } = request.body;

            const classService = new ClassService();

            const subjectClass = await classService.createClass(
                acronym, classParam, classRoom, classDate, testDates, frequencyLimit,
                frequency, schoolSupplies, students
            );

            if (subjectClass) {
                return response.json(subjectClass);
            }
            else {
                return response.status(409).json({ "Error": "Turma existente" });
            }

        } catch (error) {
            return response.status(500).json({
                message: error.message,
            });
        }
    }
}

export { ClassController }