import { Request, Response } from "express"
import { AdministratorsService } from "../services/AdministratorsService"

class AdministratorsController {
    async create(request: Request, response: Response): Promise<Response> {
        try {
            const { employeeNumber, name, email, birthDate } = request.body;

            const adminService = new AdministratorsService();

            const admin = await adminService.create(employeeNumber, name, email, new Date(birthDate))

            return response.json(admin);

        } catch (error) {
            console.log(error);

            return response.status(500).json({
                message: error.message,
            });
        }
    }

    async showAdmin(request: Request, response: Response) {

        try {
            const { employeeNumber } = request.params;

            const adminService = new AdministratorsService();

            const admin = await adminService.getAdminByEmployeeNbr(parseInt(employeeNumber));

            return response.json(admin);

        } catch (error) {
            return response.status(500).json({
                message: error.message,
            });
        }
    }

    async deleteAdmin(request: Request, response: Response) {
        try {
            const { employeeNumber } = request.params;

            const adminService = new AdministratorsService();

            const admin = await adminService.deleteAdminByEmployeeNbr(parseInt(employeeNumber));

            return response.json(admin.value);

        } catch (error) {
            return response.status(500).json({
                message: error.message,
            });
        }
    }
}

export { AdministratorsController };