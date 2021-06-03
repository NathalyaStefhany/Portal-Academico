import { ObjectId } from "bson";
import { Request, Response } from "express";
import { Frequency } from "../entities/Frequency";
import { ClassService } from "../services/ClassService";

class ClassController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const {
        employeeNumber,
        acronym,
        classParam,
        classroom,
        classDate,
        testDates,
        frequencyLimit,
        frequency,
        schoolSupplies,
        students,
      } = request.body;

      const classService = new ClassService();

      const subjectClass = await classService.createClass(
        employeeNumber,
        acronym,
        classParam,
        classroom,
        classDate,
        testDates,
        frequencyLimit,
        frequency,
        schoolSupplies,
        students
      );

      if (subjectClass === 1) {
        return response
          .status(404)
          .json({ Error: "Matéria ou professor não encontrado" });
      } else if (subjectClass === 0) {
        return response.status(409).json({ Error: "Turma existente" });
      } else {
        return response.json(subjectClass);
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
      const students = classParams.Students;
      const frequency = classParams.Frequency;

      return response.json({ acronym, classParam, students, frequency });
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async insertFrequency(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { acronym, classParam, frequency } = request.body;

      const classService = new ClassService();

      const frequencyToInsert = new Frequency(
        new Date(frequency.classDate),
        frequency.subjectMatter,
        frequency.classesTaught,
        frequency.missingStudents
      );

      const result = await classService.insertFrequency(
        acronym,
        classParam,
        frequencyToInsert
      );

      if (!result) {
        return response.status(404).json({ Message: "Turma não encontrada" });
      }

      return response.json({ Message: "Frequência inserida com sucesso" });
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async getTeacher(request: Request, response: Response): Promise<Response> {
    try {
      let { acronym, classParam } = request.params;

      const classService = new ClassService();

      if (classParam === '""') {
        classParam = "";
      }

      const result = await classService.getTeacher(acronym, classParam);

      if (result === 0) {
        return response.status(404).json({ Message: "Turma não encontrada" });
      } else if (result === 1) {
        return response
          .status(404)
          .json({ Message: "Professor não encontrado" });
      } else {
        return response.json(result);
      }
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }
}

export { ClassController };
