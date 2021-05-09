import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Select from '@material-ui/core/Select';
import { FormControl, TextField } from '@material-ui/core';

import styles from './styles.module.css';

const TeacherLogin = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const login = () => {
    if (email === 'renzo@inatel.br' && password === '12345') {
      setIsAuthenticated({ student: false, teacher: true, employee: false });
      navigate('/professor');
    }
  };

  return (
    <FormControl variant="outlined" className={styles.select}>
      <TextField
        id="outlined-uncontrolled"
        label="Usuário"
        variant="outlined"
        onChange={(value) => setEmail(value.target.value)}
      />

      <TextField
        id="outlined-uncontrolled"
        label="Senha"
        type="password"
        variant="outlined"
        onChange={(value) => setPassword(value.target.value)}
        style={{ marginTop: '45px' }}
      />

      <button className={styles.enterButton} onClick={login}>
        ENTRAR
      </button>
    </FormControl>
  );
};

TeacherLogin.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default TeacherLogin;