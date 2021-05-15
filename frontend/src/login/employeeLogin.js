import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FormControl, TextField } from '@material-ui/core';

import styles from './styles.module.css';

const EmployeeLogin = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const login = () => {
    if (email === 'lucas@inatel.br' && password === '12345') {
      setIsAuthenticated({ student: false, teacher: false, employee: true });
      navigate('/funcionario');
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
        autoComplete="new-password"
      />

      <button className={styles.enterButton} onClick={login}>
        ENTRAR
      </button>
    </FormControl>
  );
};

EmployeeLogin.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default EmployeeLogin;
