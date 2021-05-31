import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';

import Login from './login/login';
import Home from './studentPages/Home/Home';
import ClassSchedule from './studentPages/ClassSchedule/ClassSchedule';
import OpeningHours from './studentPages/OpeningHours/OpeningHours';
import ClassReplacement from './studentPages/ClassReplacement/ClassReplacement';
import TestsCalendar from './studentPages/TestsCalendar/TestsCalendar';
import Historic from './studentPages/Historic/Historic';
import Matriculation from './studentPages/Matriculation/Matriculation';
import AcademicCoefficient from './studentPages/AcademicCoefficient/AcademicCoefficient';
import Grades from './studentPages/Grades/Grades';
import PullDiscipline from './studentPages/PullDiscipline/PullDiscipline';
import Perfil from './studentPages/Perfil/Perfil';
import ClassMaterial from './studentPages/ClassMaterial/ClassMaterial';
import Frequency from './studentPages/Frequency/Frequency';
import Requirements from './studentPages/Requirements/Requirements';

import TeacherHome from './teacherPages/Home/Home';
import TeacherPerfil from './teacherPages/Perfil/Perfil';
import TeacherGrades from './teacherPages/Grades/Grades';
import TeacherFrequency from './teacherPages/Frequency/Frequency';
import TeacherClassMaterial from './teacherPages/ClassMaterial/ClassMaterial';

import Registrations from './employeePages/Registrations/registrations';
import EmployeePerfil from './employeePages/Perfil/Perfil';

import styles from './styles/global.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState({
    student: false,
    teacher: false,
    employee: false,
  });

  const [studentInfo, setStudentInfo] = useState();
  const [employeeInfo, setEmployeeInfo] = useState();
  const [teacherInfo, setTeacherInfo] = useState();

  return (
    <Router>
      <Layout
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        studentInfo={studentInfo}
        teacherInfo={teacherInfo}
        employeeInfo={employeeInfo}
        setStudentInfo={setStudentInfo}
        setTeacherInfo={setTeacherInfo}
        setEmployeeInfo={setEmployeeInfo}
      >
        <Routes>
          <Route exact path="/">
            <Login
              setIsAuthenticated={setIsAuthenticated}
              setStudentInfo={setStudentInfo}
              setTeacherInfo={setTeacherInfo}
              setEmployeeInfo={setEmployeeInfo}
            />
          </Route>

          <Route path="/aluno">
            <Home />
          </Route>

          <Route path="/aluno/horarioAula">
            <ClassSchedule studentInfo={studentInfo} />
          </Route>

          <Route path="/aluno/horarioAtendimento">
            <OpeningHours />
          </Route>

          <Route path="/aluno/reposicao">
            <ClassReplacement studentInfo={studentInfo} />
          </Route>

          <Route path="/aluno/provas">
            <TestsCalendar studentInfo={studentInfo} />
          </Route>

          <Route path="/aluno/historico">
            <Historic studentInfo={studentInfo} />
          </Route>

          <Route path="/aluno/matricula">
            <Matriculation />
          </Route>

          <Route path="/aluno/coeficiente">
            <AcademicCoefficient studentInfo={studentInfo} />
          </Route>

          <Route path="/aluno/notas">
            <Grades studentInfo={studentInfo} />
          </Route>

          <Route path="/aluno/materia">
            <PullDiscipline />
          </Route>

          <Route path="/aluno/perfil">
            <Perfil studentInfo={studentInfo} />
          </Route>

          <Route path="/aluno/material">
            <ClassMaterial />
          </Route>

          <Route path="/aluno/frequencia">
            <Frequency />
          </Route>

          <Route path="/aluno/requisitos">
            <Requirements studentInfo={studentInfo} />
          </Route>

          <Route path="/professor">
            <TeacherHome teacherInfo={teacherInfo} />
          </Route>

          <Route path="/professor/perfil">
            <TeacherPerfil teacherInfo={teacherInfo} />
          </Route>

          <Route path="/professor/notas">
            <TeacherGrades teacherInfo={teacherInfo} />
          </Route>

          <Route path="/professor/frequencia">
            <TeacherFrequency />
          </Route>

          <Route path="/professor/material">
            <TeacherClassMaterial />
          </Route>

          <Route path="/funcionario/">
            <Registrations />
          </Route>

          <Route path="/funcionario/perfil">
            <EmployeePerfil employeeInfo={employeeInfo} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
