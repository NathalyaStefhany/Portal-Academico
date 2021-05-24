import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Select from '@material-ui/core/Select';
import { FormControl, InputLabel, TextField } from '@material-ui/core';

import useFetch from '../hooks/useFetch';
import { POST_STUDENT_LOGIN } from '../service/api';

import styles from './styles.module.css';

const StudentLogin = ({ setIsAuthenticated, setStudentInfo }) => {
  const [course, setCourse] = useState('gec');
  const [enrollment, setEnrollment] = useState('');
  const [password, setPassword] = useState('');

  const [login, setLogin] = useState(false);

  const [hasError, setHasError] = useState(false);

  const { request } = useFetch();

  const navigate = useNavigate();

  useEffect(() => {
    if (login) {
      const sendLogin = async () => {
        const bodyData = {
          matriculationNumber: parseInt(enrollment),
          password: password,
        };

        const { url: url, config: config } = POST_STUDENT_LOGIN(bodyData);

        const { json, error } = await request(url, config);

        if (!error) {
          setStudentInfo(json);

          setIsAuthenticated({
            student: true,
            teacher: false,
            employee: false,
          });

          navigate('/aluno');
        } else {
          setHasError(true);
        }
      };

      sendLogin();
      setLogin(false);
    }
  }, [login]);

  return (
    <FormControl variant="outlined" className={styles.select}>
      <InputLabel id="demo-simple-select-outlined-label">Curso</InputLabel>

      <Select
        native
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={course}
        onChange={(value) => setCourse(value.target.value)}
        label="Curso"
      >
        <option value="gec">Engenharia da Computação</option>
        <option value="gea">Engenharia de Controle e Automação</option>
        <option value="geb">Engenharia Biomédica</option>
      </Select>

      <TextField
        id="outlined-uncontrolled"
        label="Matrícula"
        variant="outlined"
        onChange={(value) => setEnrollment(value.target.value)}
        style={{ marginTop: '45px' }}
      />

      <TextField
        id="outlined-uncontrolled"
        label="Senha"
        type="password"
        variant="outlined"
        onChange={(value) => setPassword(value.target.value)}
        style={{ marginTop: '45px' }}
        autoComplete="new-password"
      />

      {hasError && (
        <p className={styles.error}>Usuário e/ou senha incorretos!</p>
      )}

      <button className={styles.enterButton} onClick={() => setLogin(true)}>
        ENTRAR
      </button>
    </FormControl>
  );
};

StudentLogin.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  setStudentInfo: PropTypes.func.isRequired,
};

export default StudentLogin;
