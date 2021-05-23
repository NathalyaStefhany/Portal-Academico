import { Request, Response } from "express";
import { AdministratorsService } from "../services/AdministratorsService";

class AdministratorsController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { employeeNumber, name, email, birthDate, password } = request.body;

      const adminService = new AdministratorsService();

      const admin = await adminService.create(
        employeeNumber,
        name,
        email,
        new Date(birthDate),
        password
      );

      if (admin) {
        return response.json(admin);
      } else {
        return response.status(409).json({ Error: "Administrador existente" });
      }
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async getAdmin(request: Request, response: Response): Promise<Response> {
    try {
      const { employeeNumber } = request.params;

      const adminService = new AdministratorsService();

      const admin = await adminService.getAdminByEmployeeNbr(
        parseInt(employeeNumber)
      );

      return response.json(admin);
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async deleteAdmin(request: Request, response: Response): Promise<Response> {
    try {
      const { employeeNumber } = request.params;

      const adminService = new AdministratorsService();

      const admin = await adminService.deleteAdminByEmployeeNbr(
        parseInt(employeeNumber)
      );

      return response.json(admin);
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  async updatePassword(request: Request, response: Response): Promise<Response> {
    try {
      const { employeeNumber, password, passwordUpdated } = request.body;

      const adminService = new AdministratorsService();

      const admin = await adminService.updatePassword(employeeNumber, password, passwordUpdated);

      return response.json({ message: "Senha alterada" });

    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }
}

export { AdministratorsController };
