import React, { useState } from 'react';

import Select from '@material-ui/core/Select';
import { FormControl, InputLabel, TextField } from '@material-ui/core';

import styles from './styles.module.css';

const EmployeeLogin = () => {
  return (
    <FormControl variant="outlined" className={styles.select}>
      <TextField
        id="outlined-uncontrolled"
        label="Usuário"
        variant="outlined"
      />

      <TextField
        id="outlined-uncontrolled"
        label="Senha"
        type="password"
        variant="outlined"
        style={{ marginTop: '45px' }}
      />

      <button className={styles.enterButton}>ENTRAR</button>
    </FormControl>
  );
};

export default EmployeeLogin;
