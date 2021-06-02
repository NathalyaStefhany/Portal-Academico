import { busboy } from "busboy-express";
import { Router } from "express";
import { AcademicCoefficientController } from "./controllers/AcademicCoefficientController";
import { AdministratorsController } from "./controllers/AdministratorsController";
import { AuthController } from "./controllers/AuthController";
import { ClassController } from "./controllers/ClassController";
import { ClassReplacementController } from "./controllers/ClassReplacementController";
import { HistoricController } from "./controllers/HistoricController";
import { StudentController } from "./controllers/StudentController";
import { SubjectController } from "./controllers/SubjectController";
import { TeacherController } from "./controllers/TeacherController";

const routes = Router();

//Controllers
const authController = new AuthController();
const adminController = new AdministratorsController();
const coefficientController = new AcademicCoefficientController();
const historicController = new HistoricController();
const studentController = new StudentController();
const teacherController = new TeacherController();
const subjectController = new SubjectController();
const replacementController = new ClassReplacementController();
const classController = new ClassController();

//Login
routes.post("/login/admin", authController.authAdmin);
routes.post("/login/student", authController.authStudent);
routes.post("/login/teacher", authController.authTeacher);

//Rotas abaixo do verify necessitam do token
//routes.use(authController.verifyUser);

//Administrator routes
routes.post("/admin", adminController.create);
routes.get("/admin/:employeeNumber", adminController.getAdmin);
routes.delete("/admin/delete/:employeeNumber", adminController.deleteAdmin);
routes.post("/admin/updatePass", adminController.updatePassword);

//Student routes
routes.post("/student", studentController.create);
routes.get("/student/:matriculationNumber", studentController.getStudent);
routes.delete(
  "/student/delete/:matriculationNumber",
  studentController.deleteStudent
);
routes.post("/student/updatePass", studentController.updatePassword);
routes.put("/student/insertClasses", studentController.insertClass);
routes.get(
  "/student/timeTable/:matriculationNumber",
  studentController.getTimeTable
);
routes.get("/student/tests/:matriculationNumber", studentController.getTests);
routes.put("/student/insertGrade", studentController.insertGrade);
routes.get(
  "/student/replacements/:matriculationNumber",
  studentController.getReplacements
);
routes.get("/student/grades/:matriculationNumber", studentController.getGrades);
routes.get(
  "/student/frequency/:matriculationNumber",
  studentController.getFrequencies
);
routes.get("/student/openingHours/:matriculationNumber", studentController.getOpeningHours);

//Teacher routes
routes.post("/teacher", teacherController.create);
routes.get("/teacher/:employeeNumber", teacherController.getTeacher);
routes.post("/teacher/updatePass", teacherController.updatePassword);
routes.put("/teacher/insertTimeTable", teacherController.insertTimeTable);
routes.get("/teacher/timeTable/:employeeNumber", teacherController.getTimeTable);

//Academic Coefficient routes
routes.post("/coefficient", coefficientController.create);
routes.get(
  "/coefficient/:matriculationNumber",
  coefficientController.getCoefficient
);
routes.delete(
  "/coefficient/delete/:matriculationNumber",
  coefficientController.deleteCoefficient
);

//Historic routes
routes.post("/historic", historicController.create);
routes.get("/historic/:matriculationNumber", historicController.getHistoric);
routes.delete(
  "/historic/delete/:matriculationNumber",
  historicController.deleteHistoric
);

//Subject routes
routes.post("/subject", subjectController.create);
routes.get("/subjects", subjectController.getAllSubjects);
routes.get("/subject/:acronym", subjectController.getSubject);
routes.get(
  "/subject/requirementsTable/:matriculationNumber",
  subjectController.getRequiremtsTable
);

//Class routes
routes.post("/class", classController.create);
routes.put("/class/insertTest", classController.insertTest);
routes.get("/class/:_id", classController.getClass);
routes.put("/class/insertFrequency", classController.insertFrequency);
routes.get("/class/getTeacher/:acronym/:classParam", classController.getTeacher);
routes.post(
  "/class/upload/:acronym/:classParam",
  busboy({fields: ["uploadedFile"], files: ["uploadedFile"]}), 
  classController.uploadFile
);

//ClassReplacement routes
routes.post("/replacement", replacementController.create);

export { routes };
