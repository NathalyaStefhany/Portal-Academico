import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import useFetch from '../hooks/useFetch';
import { POST_TEACHER_LOGIN } from '../service/api';

import { FormControl, TextField } from '@material-ui/core';

import styles from './styles.module.css';

const TeacherLogin = ({ setIsAuthenticated, setTeacherInfo }) => {
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  const [login, setLogin] = useState(false);

  const [hasError, setHasError] = useState(false);

  const { request } = useFetch();

  const navigate = useNavigate();

  useEffect(() => {
    if (login) {
      const sendLogin = async () => {
        const bodyData = {
          employeeNumber: parseInt(number),
          password: password,
        };

        const { url: url, config: config } = POST_TEACHER_LOGIN(bodyData);

        const { json, error } = await request(url, config);

        if (!error) {
          setTeacherInfo(json);

          setIsAuthenticated({
            student: false,
            teacher: true,
            employee: false,
          });

          navigate('/professor');
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
      <TextField
        id="outlined-uncontrolled"
        label="Número do usuário"
        variant="outlined"
        onChange={(value) => setNumber(value.target.value)}
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

TeacherLogin.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  setTeacherInfo: PropTypes.func.isRequired,
};

export default TeacherLogin;
