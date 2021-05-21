import React, { useState } from 'react';
import PropTypes from 'prop-types';

import logo from '../assets/images/Inatel Branco.png';

import StudentLogin from './studentLogin';
import TeacherLogin from './teacherLogin';
import EmployeeLogin from './employeeLogin';

import styles from './styles.module.css';

const Login = ({ setIsAuthenticated, setStudentInfo }) => {
  const [login, setLogin] = useState('student');

  return (
    <div className={styles.background}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo branco do Inatel" />
        <p>Portal Acadêmico</p>
      </div>

      <div className={styles.login}>
        <div className={styles.loginButton}>
          <button
            className={
              login === 'student' ? styles.selected : styles.unselected
            }
            onClick={() => setLogin('student')}
          >
            Aluno
          </button>
          <button
            className={
              login === 'teacher' ? styles.selected : styles.unselected
            }
            onClick={() => setLogin('teacher')}
          >
            Docente
          </button>
          <button
            className={
              login === 'employee' ? styles.selected : styles.unselected
            }
            onClick={() => setLogin('employee')}
          >
            Funcionário
          </button>
        </div>

        {login === 'student' && (
          <StudentLogin
            setIsAuthenticated={setIsAuthenticated}
            setStudentInfo={setStudentInfo}
          />
        )}
        {login === 'teacher' && (
          <TeacherLogin setIsAuthenticated={setIsAuthenticated} />
        )}
        {login === 'employee' && (
          <EmployeeLogin setIsAuthenticated={setIsAuthenticated} />
        )}
      </div>
    </div>
  );
};

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  setStudentInfo: PropTypes.func.isRequired,
};

export default Login;
