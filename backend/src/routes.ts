import { Router } from "express";
import { AdministratorsController } from "./controllers/AdministratorsController";

const routes = Router();

const adminController = new AdministratorsController();

routes.post("/admin", adminController.create);
routes.get("/admin/:employeeNumber", adminController.showAdmin);
routes.delete("/admin/delete/:employeeNumber", adminController.deleteAdmin);

export { routes };