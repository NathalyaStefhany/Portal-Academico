import { Router } from "express";
import { AcademicCoefficientController } from "./controllers/AcademicCoefficientController";
import { AdministratorsController } from "./controllers/AdministratorsController";
import { HistoricController } from "./controllers/HistoricController";

const routes = Router();
//Controllers
const adminController = new AdministratorsController();
const coefficientController = new AcademicCoefficientController();
const historicController = new HistoricController();

//Administrator routes
routes.post("/admin", adminController.create);
routes.get("/admin/:employeeNumber", adminController.getAdmin);
routes.delete("/admin/delete/:employeeNumber", adminController.deleteAdmin);

//Academic Coefficient routes
routes.post("/coefficient", coefficientController.create);
routes.get("/coefficient/:matriculationNumber", coefficientController.getCoefficient);
routes.delete("/coefficient/delete/:matriculationNumber", coefficientController.deleteCoefficient);


//Historic routes
routes.post("/historic", historicController.create);
routes.get("/historic/:matriculationNumber", historicController.getHistoric);
routes.delete("/historic/delete/:matriculationNumber", historicController.deleteHistoric);

export { routes };