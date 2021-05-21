import { Request, Response } from "express";
import { SubjectService } from "../services/SubjectService";

class SubjectController {

    async create(request: Request, response: Response): Promise<Response> {
        try {
            const { acronym, name, period, classes, requirements, credits } = request.body;

            const subjectService = new SubjectService();

            const subject = await subjectService.createSubject(acronym, name, period, classes, requirements, credits);

            if (subject) {
                return response.json(subject);
            }
            else {
                return response.status(409).json({ "Error": "Disciplina existente" });
            }
        } catch (error) {
            return response.status(500).json({
                message: error.message,
            });
        }
    }

    async getSubject(request: Request, response: Response): Promise<Response> {
        try {
            const {acronym} = request.params;

            const subjectService = new SubjectService();

            const subject = await subjectService.getSubjectByAcronym(acronym);

            return response.json(subject);
            
        } catch (error) {
            return response.status(500).json({
                message: error.message,
            });
        }
    }
}

export { SubjectController }