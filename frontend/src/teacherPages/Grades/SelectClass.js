import React, { useEffect } from 'react';

import add from '../../assets/icons/add.svg';
import elaboration from '../../assets/icons/elaboration.svg';
import checkFilled from '../../assets/icons/check-filled.svg';

import useFetch from '../../hooks/useFetch';
import { GET_CLASS, GET_TEACHER } from '../../service/api';

import { FormControl, InputLabel, Select } from '@material-ui/core';

import styles from './styles.module.css';

const SelectClass = ({
  teacherInfo,
  subject,
  setSubject,
  allClasses,
  setAllClasses,
}) => {
  const { request } = useFetch();

  const classRequest = async (id, index) => {
    const { url: url, config: config } = GET_CLASS(id);

    const { json, error } = await request(url, config);

    let classParam = '';
    let subject = '';

    if (!error && json) {
      classParam = json.classParam ? ` - ${json.classParam}` : '';
      subject = json.acronym + classParam;

      if (index === 0) setSubject(subject);
    }

    return { subject: subject, students: json.students, id: id };
  };

  useEffect(() => {
    const sendRequest = async () => {
      const { url: url, config: config } = GET_TEACHER(
        teacherInfo.employeeNumber
      );

      const { json, error } = await request(url, config);

      if (!error) {
        setAllClasses(
          await Promise.all(
            json?.Classes.map((id, index) => classRequest(id, index))
          )
        );
      }
    };

    sendRequest();
  }, []);

  return (
    <div className={styles.leftContainer}>
      <FormControl variant="outlined" className={styles.select}>
        <InputLabel id="demo-simple-select-outlined-label">Turma</InputLabel>
        <Select
          native
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={subject}
          onChange={(value) => setSubject(value.target.value)}
          label="Disciplina"
        >
          {allClasses?.map((value) => (
            <option value={value.subject}>{value.subject}</option>
          ))}
        </Select>
      </FormControl>

      <p>Legenda</p>

      <div style={{ display: 'flex' }} className={styles.subtitle}>
        <img
          src={add}
          alt="Icone do sinal de mais"
          style={{ marginLeft: '4px' }}
        />
        <p style={{ marginLeft: '15px' }}>Incluir Avaliação</p>
      </div>

      <div style={{ display: 'flex' }} className={styles.subtitle}>
        <img src={elaboration} alt="Icone de alerta de elaboração de nota" />
        <p>Avaliação em Elaboração</p>
      </div>

      <div style={{ display: 'flex' }} className={styles.subtitle}>
        <img
          src={checkFilled}
          alt="Icone de avaliação publicada"
          style={{ marginLeft: '4px' }}
        />
        <p style={{ marginLeft: '15px' }}>Avaliação Publicada</p>
      </div>
    </div>
  );
};

export default SelectClass;
