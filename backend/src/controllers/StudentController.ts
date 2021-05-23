import { Request, Response } from "express";
import { StudentService } from "../services/StudentService";

class StudentController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const {
        matriculationNumber,
        course,
        name,
        email,
        birthDate,
        cpf,
        password,
      } = request.body;

      const studentService = new StudentService();

      const student = await studentService.createStudent(
        matriculationNumber,
        course,
        name,
        email,
        new Date(birthDate),
        cpf,
        password
      );

      if (student) {
        return response.json(student);
      } else {
        return response.status(409).json({ Error: "Estudante existente" });
      }
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async getStudent(request: Request, response: Response): Promise<Response> {
    try {
      const { matriculationNumber } = request.params;

      const studentService = new StudentService();

      const student = await studentService.getStudentByMatNbr(
        parseInt(matriculationNumber)
      );

      return response.json(student);
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async deleteStudent(request: Request, response: Response) {
    try {
      const { matriculationNumber } = request.params;

      const studentService = new StudentService();

      const student = await studentService.deleteStudentByMatriculationNbr(
        parseInt(matriculationNumber)
      );

      return response.json(student.value);
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async updatePassword(request: Request, response: Response): Promise<Response> {
    try {
      const { matriculationNumber, password, passwordUpdated } = request.body;

      const studentService = new StudentService();

      const result = await studentService.updatePassword(
        matriculationNumber,
        password,
        passwordUpdated,
      );

      return response.json(result);
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }
}

export { StudentController };
