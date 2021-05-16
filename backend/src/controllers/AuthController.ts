import { Request, Response } from "express";
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
                        { expiresIn: 7200 }
                    );
                    admin.Password = undefined;

                    return response.json({ admin, token })
                }
                else {
                    return response.status(400).json({
                        massage: "Senha inválida"
                    })
                }
            }
            else {
                return response.status(400).json({
                    message: "Usuário não encontrado"
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

            let student = await studentService.getStudentByMatNbr(matriculationNumber);

            if (student) {
                if (await bcrypt.compare(password, student.Password)) {
                    const token = jsonwebtoken.sign(
                        { matriculationNumber },
                        "fda3e738d8f85dfc27d68a1c33aab34b2da3eb45",
                        { expiresIn: 7200 }
                    );
                    student.Password = undefined;

                    return response.json({ student, token })
                }
                else {
                    return response.status(400).json({
                        massage: "Senha inválida"
                    })
                }
            }
            else {
                return response.status(400).json({
                    message: "Usuário não encontrado"
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

            let teacher = await teacherService.getAdminByEmployeeNbr(employeeNumber);

            if (teacher) {
                if (await bcrypt.compare(password, teacher.Password)) {
                    const token = jsonwebtoken.sign(
                        { employeeNumber },
                        "fda3e738d8f85dfc27d68a1c33aab34b2da3eb45",
                        { expiresIn: 7200 }
                    );
                    teacher.Password = undefined;

                    return response.json({ teacher, token })
                }
                else {
                    return response.status(400).json({
                        massage: "Senha inválida"
                    })
                }
            }
            else {
                return response.status(400).json({
                    message: "Usuário não encontrado"
                });
            }

        } catch (error) {
            return response.status(500).json({
                message: error.message,
            });
        }
    }
}

export { AuthController }