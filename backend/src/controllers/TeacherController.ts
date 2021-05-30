import { Request, Response } from "express";
import { TeacherService } from "../services/TeacherService";

class TeacherController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { employeeNumber, name, email, birthDate, password } = request.body;

      const teacherService = new TeacherService();

      const teacher = await teacherService.createTeacher(
        employeeNumber,
        name,
        email,
        new Date(birthDate),
        password
      );

      if (teacher) {
        return response.json(teacher);
      } else {
        return response.status(409).json({ Error: "Professor existente" });
      }
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async getTeacher(request: Request, response: Response) {
    try {
      const { employeeNumber } = request.params;

      const teacherService = new TeacherService();

      const teacher = await teacherService.getTeacherByEmployeeNbr(
        parseInt(employeeNumber)
      );

      return response.json(teacher);
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async updatePassword(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { employeeNumber, password, passwordUpdated } = request.body;

      const teacherService = new TeacherService();

      const result = await teacherService.updatePassword(
        employeeNumber,
        password,
        passwordUpdated
      );

      return response.json(result);
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async insertTimeTable(request: Request, response: Response): Promise<Response> {
    try {
      const { employeeNumber, timeTable } = request.body;

      const teacherService = new TeacherService();

      const result = await teacherService.insertTimeTable(employeeNumber, timeTable);

      if (result === 0) {
        return response.status(404).json({ Message: "Professor não encontrado" });
      }
      else {
        return response.json(result);
      }

    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async getTimeTable(request: Request, response: Response): Promise<Response> {
    try {
      const { employeeNumber } = request.params;

      const teacherService = new TeacherService();

      const result = await teacherService.getTimeTable(parseInt(employeeNumber));

      if (result === 0) {
        return response.status(404).json({ Message: "Professor não encontrado" });
      }
      else {
        return response.json(result);
      }
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

}

export { TeacherController };
