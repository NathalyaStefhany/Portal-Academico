import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';

import Home from './pages/Home/Home';
import ClassSchedule from './pages/ClassSchedule/ClassSchedule';
import OpeningHours from './pages/OpeningHours/OpeningHours';
import ClassReplacement from './pages/ClassReplacement/ClassReplacement';
import TestsCalendar from './pages/TestsCalendar/TestsCalendar';
import Historic from './pages/Historic/Historic';
import Matriculation from './pages/Matriculation/Matriculation';
import AcademicCoefficient from './pages/AcademicCoefficient/AcademicCoefficient';
import Grades from './pages/Grades/Grades';
import PullDiscipline from './pages/PullDiscipline/PullDiscipline';

import styles from './styles/global.css';
import Perfil from './pages/Perfil/Perfil';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/horarioAula">
            <ClassSchedule />
          </Route>

          <Route path="/horarioAtendimento">
            <OpeningHours />
          </Route>

          <Route path="/reposicao">
            <ClassReplacement />
          </Route>

          <Route path="/provas">
            <TestsCalendar />
          </Route>

          <Route path="/historico">
            <Historic />
          </Route>

          <Route path="/matricula">
            <Matriculation />
          </Route>

          <Route path="/coeficiente">
            <AcademicCoefficient />
          </Route>

          <Route path="/notas">
            <Grades />
          </Route>

          <Route path="/materia">
            <PullDiscipline />
          </Route>

          <Route path="/perfil">
            <Perfil />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
