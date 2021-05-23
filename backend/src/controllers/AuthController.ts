import { NextFunction, Request, Response } from "express";
import { AdministratorsService } from "../services/AdministratorsService";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { StudentService } from "../services/StudentService";
import { TeacherService } from "../services/TeacherService";

class AuthController {
  async authAdmin(request: Request, response: Response): Promise<Response> {
    try {
      const { employeeNumber, password } = request.body;

      const adminService = new AdministratorsService();

      let admin = await adminService.getAdminByEmployeeNbr(employeeNumber);

      if (admin) {
        if (await bcrypt.compare(password, admin.Password)) {
          const token = jsonwebtoken.sign(
            { employeeNumber },
            "fda3e738d8f85dfc27d68a1c33aab34b2da3eb45",
            { expiresIn: 86400 }
          );
          admin.Password = undefined;

          const name = admin.Name;
          const email = admin.Email;

          return response.json({ name, email, employeeNumber, token });
        } else {
          return response.status(400).json({
            massage: "Senha inválida",
          });
        }
      } else {
        return response.status(400).json({
          message: "Usuário não encontrado",
        });
      }
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async authStudent(request: Request, response: Response): Promise<Response> {
    try {
      const { matriculationNumber, password } = request.body;

      const studentService = new StudentService();

      let student = await studentService.getStudentByMatNbr(
        matriculationNumber
      );

      if (student) {
        if (await bcrypt.compare(password, student.Password)) {
          const token = jsonwebtoken.sign(
            { matriculationNumber },
            "fda3e738d8f85dfc27d68a1c33aab34b2da3eb45",
            { expiresIn: 86400 }
          );
          student.Password = undefined;

          const name = student.Name;
          const email = student.Email;
          const course = student.Course;
          const period = student.Period;

          return response.json({
            matriculationNumber,
            name,
            email,
            course,
            period,
            token,
          });
        } else {
          return response.status(400).json({
            massage: "Senha inválida",
          });
        }
      } else {
        return response.status(400).json({
          message: "Usuário não encontrado",
        });
      }
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async authTeacher(request: Request, response: Response): Promise<Response> {
    try {
      const { employeeNumber, password } = request.body;

      const teacherService = new TeacherService();

      let teacher = await teacherService.getTeacherByEmployeeNbr(
        employeeNumber
      );

      if (teacher) {
        if (await bcrypt.compare(password, teacher.Password)) {
          const token = jsonwebtoken.sign(
            { employeeNumber },
            "fda3e738d8f85dfc27d68a1c33aab34b2da3eb45",
            { expiresIn: 86400 }
          );
          teacher.Password = undefined;

          const name = teacher.Name;
          const email = teacher.Email;

          return response.json({ name, email, employeeNumber, token });
        } else {
          return response.status(400).json({
            massage: "Senha inválida",
          });
        }
      } else {
        return response.status(400).json({
          message: "Usuário não encontrado",
        });
      }
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async verifyUser(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const authHeader = request.headers.authorization;

      if (!authHeader) {
        return response.status(401).json({ error: "Token não fornecido" });
      }

      const parts = authHeader.split(" ");

      if (parts.length !== 2) {
        return response.status(401).json({ error: "Token mal gerado" });
      }

      const [scheme, token] = parts;

      if (!/^Bearer$/i.test(scheme)) {
        return response.status(401).json({ error: "Token mal formado" });
      }

      jsonwebtoken.verify(
        token,
        "fda3e738d8f85dfc27d68a1c33aab34b2da3eb45",
        (err) => {
          if (err)
            return response.status(401).json({ error: "Token inválido" });

          return next();
        }
      );
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }
}

export { AuthController };
