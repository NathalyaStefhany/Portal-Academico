import { Request, Response } from "express";
import { ClassReplacementService } from "../services/ClassReplacementService";

class ClassReplacementController {
    async create(request: Request, response: Response): Promise<Response>{
        try {
            const {classId, date, hour, room} = request.body;

            const replacementService = new ClassReplacementService();

            const replacement = await replacementService.createReplacement(classId, new Date(date), hour, room);

            return response.json(replacement);


        } catch (error) {
            return response.status(500).json({
                message: error.message,
            });
        }
    }
}

export { ClassReplacementController }