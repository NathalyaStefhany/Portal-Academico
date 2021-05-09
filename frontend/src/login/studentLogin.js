import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Select from '@material-ui/core/Select';
import { FormControl, InputLabel, TextField } from '@material-ui/core';

import styles from './styles.module.css';

const StudentLogin = ({ setIsAuthenticated }) => {
  const [course, setCourse] = useState('gec');
  const [enrollment, setEnrollment] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const login = () => {
    if (course === 'gec' && enrollment === '1369' && password === '1369') {
      setIsAuthenticated({ student: true, teacher: false, employee: false });
      navigate('/aluno');
    }
  };

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
      />

      <button className={styles.enterButton} onClick={login}>
        ENTRAR
      </button>
    </FormControl>
  );
};

StudentLogin.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default StudentLogin;
