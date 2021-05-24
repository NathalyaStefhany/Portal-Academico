import { ObjectId } from "bson";
import { Request, Response } from "express";
import { ClassService } from "../services/ClassService";

class ClassController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const {
        acronym,
        classParam,
        classRoom,
        classDate,
        testDates,
        frequencyLimit,
        frequency,
        schoolSupplies,
        students,
      } = request.body;

      const classService = new ClassService();

      const subjectClass = await classService.createClass(
        acronym,
        classParam,
        classRoom,
        classDate,
        testDates,
        frequencyLimit,
        frequency,
        schoolSupplies,
        students
      );

      if (subjectClass) {
        return response.json(subjectClass);
      } else {
        return response.status(409).json({ Error: "Turma existente" });
      }
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async insertTest(request: Request, response: Response): Promise<Response> {
    try {
      const { acronym, classParam, testName, date, time, local } = request.body;

      const classService = new ClassService();

      const result = await classService.insertTest(
        acronym,
        classParam,
        testName,
        new Date(date),
        time,
        local
      );

      if (result === 0) {
        return response.status(404).json({ Message: "Turma não encontrada" });
      } else if (result === 1) {
        return response
          .status(409)
          .json({ Message: "Teste já cadastrado nessa turma" });
      } else {
        return response.json(result);
      }
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async getClass(request: Request, response: Response): Promise<Response> {
    try {
      const { _id } = request.params;

      const classService = new ClassService();

      const classParams = await classService.getClassById(new ObjectId(_id));

      const acronym = classParams.Acronym;
      const classParam = classParams.Class;

      return response.json({ acronym, classParam });
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }
}

export { ClassController };
