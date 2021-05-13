import React, { useEffect, useState } from 'react';

import {
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  withStyles,
} from '@material-ui/core';

import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';

import research from '../../assets/icons/research.svg';

import styles from './styles.module.css';
import Info from './Info/Info';

const TeacherFrequency = () => {
  const [subject, setSubject] = useState('C317');
  const [month, setMonth] = useState('Fevereiro');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newFrequency, setNewFrequency] = useState(false);
  const [date, setDate] = useState();
  const [numClasses, setNumClasses] = useState();
  const [topic, setTopic] = useState();
  const [frequency, setFrequency] = useState([
    {
      dia: '19/02/2021',
      numAulas: 2,
      assunto: 'Apresentação das ferramentas e revisão de Python.',
    },
  ]);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#0054a6',
      color: theme.palette.common.white,
      fontSize: 16,
      fontWeight: 500,
    },
    body: {
      fontSize: 14,
      color: '#333333',
    },
  }))(TableCell);

  const StyledTableRow = withStyles(() => ({
    root: {
      '&:nth-of-type(even)': {
        backgroundColor: 'rgba(0, 83, 166, 0.03)',
      },
    },
  }))(TableRow);

  const students = [
    {
      matricula: '1376',
      nome: 'João Gustavo Rangel de Oliveira',
      faltasDia: 0,
      justificativas: 0,
      totalFaltas: 0,
    },
    {
      matricula: '1369',
      nome: 'Nathalya Stefhany Pereira',
      faltasDia: 0,
      justificativas: 0,
      totalFaltas: 0,
    },
  ];

  const dates = {
    Fevereiro: ['2021-02-01', '2021-02-28'],
    Marco: ['2021-03-01', '2021-03-31'],
    Abril: ['2021-04-01', '2021-04-30'],
    Maio: ['2021-05-01', '2021-05-31'],
    Junho: ['2021-06-01', '2021-06-30'],
  };

  function addNewFrequency() {
    const freq = frequency;

    freq.push({
      dia:
        date.substr(8, 2) + '/' + date.substr(5, 2) + '/' + date.substr(0, 4),
      numAulas: numClasses,
      assunto: topic,
    });

    setFrequency(freq);
    setNewFrequency(true);
    setModalIsOpen(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Publicação de Notas</h1>
        <div />
      </div>

      <div style={{ display: 'flex' }}>
        <div className={styles.leftContainer}>
          <FormControl variant="outlined" className={styles.select}>
            <InputLabel id="demo-simple-select-outlined-label">
              Turma
            </InputLabel>
            <Select
              native
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={subject}
              onChange={(value) => setSubject(value.target.value)}
              label="Disciplina"
            >
              <option value="C317">C317</option>
            </Select>
          </FormControl>

          <FormControl variant="outlined" className={styles.select}>
            <InputLabel id="demo-simple-select-outlined-label">Mês</InputLabel>
            <Select
              native
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={month}
              onChange={(value) => setMonth(value.target.value)}
              label="Disciplina"
            >
              <option value="Fevereiro">Fevereiro</option>
              <option value="Marco">Março</option>
              <option value="Abril">Abril</option>
              <option value="Maio">Maio</option>
              <option value="Junho">Junho</option>
            </Select>
          </FormControl>

          <div
            className={styles.table}
            style={{ width: '350px', marginBottom: '80px' }}
          >
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center" width={50}>
                      Faltas
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Registro da Aula
                    </StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {frequency.map((row) => (
                    <StyledTableRow key={row.dia}>
                      <StyledTableCell align="center">
                        <img src={research} />
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <div style={{ display: 'flex' }}>
                          <p>
                            <b>Dia: </b>
                            {row.dia}
                          </p>
                          <p style={{ marginLeft: '30px' }}>
                            <b>Nº de Aulas: </b>
                            {row.numAulas}
                          </p>
                        </div>

                        <p style={{ textAlign: 'start', marginTop: '5px' }}>
                          <b>Assunto: </b>
                          {row.assunto}
                        </p>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                  <StyledTableRow>
                    <StyledTableCell
                      colSpan={2}
                      className={styles.buttonAdd}
                      onClick={() => setModalIsOpen(true)}
                    >
                      Adicionar nova aula
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <div
          style={{
            margin: '20px 100px 0px 200px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Info />

          {newFrequency && (
            <>
              <p style={{ marginTop: '30px', marginBottom: '15px' }}>
                <b>
                  Registro de faltas do dia{' '}
                  {date.substr(8, 2) +
                    '/' +
                    date.substr(5, 2) +
                    '/' +
                    date.substr(0, 4)}
                </b>
              </p>

              <TableContainer
                component={Paper}
                className={styles.table}
                style={{ width: '100%', marginBottom: '20px' }}
              >
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center" width="50px">
                        Faltas
                      </StyledTableCell>
                      <StyledTableCell align="center">Aluno</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {students.map((row) => (
                      <StyledTableRow key={row.matricula}>
                        <StyledTableCell>
                          <input type="checkbox" className={styles.checkbox} />
                        </StyledTableCell>
                        <StyledTableCell>
                          <p style={{ textAlign: 'start' }}>
                            {row.matricula} - {row.nome}
                          </p>
                          <div style={{ display: 'flex', marginTop: '5px' }}>
                            <p style={{ marginRight: '30px' }}>
                              <b>Faltas do dia: </b>
                              {row.faltasDia}
                            </p>
                            <p style={{ marginRight: '30px' }}>
                              <b>Jus: </b>
                              {row.justificativas}
                            </p>
                            <p>
                              <b>Total: </b>
                              {row.totalFaltas}
                            </p>
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <div style={{ marginBottom: '80px' }}>
                <Button title="SALVAR" onClick={() => setNewFrequency(false)} />
              </div>
            </>
          )}
        </div>
      </div>

      {modalIsOpen && (
        <Modal height={'230px'}>
          <div className={styles.modal}>
            <p>Registro de Aula</p>
            <div />

            <div style={{ display: 'flex', marginBottom: '5px' }}>
              <b>Data da Aula:</b>
              <input
                type="date"
                style={{ marginLeft: '5px', width: '218px' }}
                min={dates[month][0]}
                max={dates[month][1]}
                onChange={(value) => setDate(value.target.value)}
              />
            </div>

            <div style={{ display: 'flex', marginBottom: '5px' }}>
              <b>Nº de aulas:</b>
              <input
                style={{ marginLeft: '12px', width: '262px' }}
                onChange={(value) => setNumClasses(value.target.value)}
              />
            </div>

            <div style={{ display: 'flex' }}>
              <b>Assunto:</b>
              <textarea
                style={{ marginLeft: '36px', fontSize: '14px', width: '262px' }}
                onChange={(value) => setTopic(value.target.value)}
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
              }}
            >
              <Button title="CONFIRMAR" onClick={() => addNewFrequency()} />
              <Button title="CANCELAR" onClick={() => setModalIsOpen(false)} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TeacherFrequency;
