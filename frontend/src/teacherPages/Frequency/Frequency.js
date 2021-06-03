import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

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
import useFetch from '../../hooks/useFetch';
import GetSubjects from './GetSubjects';
import FormatDateToShow from '../../utils/FormatDateToShow';
import {
  GET_STUDENT,
  GET_STUDENT_FREQUENCY,
  PUT_INSERT_FREQUENCY,
} from '../../service/api';

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

const TeacherFrequency = ({ teacherInfo }) => {
  const [subject, setSubject] = useState('');
  const [month, setMonth] = useState('Fevereiro');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newFrequency, setNewFrequency] = useState(false);
  const [date, setDate] = useState();
  const [numClasses, setNumClasses] = useState();
  const [topic, setTopic] = useState();

  const currentDate = new Date();
  const dates =
    currentDate.getMonth() < 6
      ? {
          Fevereiro: ['2021-02-01', '2021-02-28'],
          Março: ['2021-03-01', '2021-03-31'],
          Abril: ['2021-04-01', '2021-04-30'],
          Maio: ['2021-05-01', '2021-05-31'],
          Junho: ['2021-06-01', '2021-06-30'],
        }
      : {
          Agosto: ['2021-08-01', '2021-08-31'],
          Setembro: ['2021-09-01', '2021-09-30'],
          Outubro: ['2021-10-01', '2021-10-31'],
          Novembro: ['2021-11-01', '2021-11-30'],
          Dezembro: ['2021-12-01', '2021-12-31'],
        };

  const months = Object.keys(dates);

  const { request } = useFetch();

  const [allSubjects, setAllSubjects] = useState([]);
  const [allFrequency, setAllFrequency] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [classesTaught, setClassesTaught] = useState('-');
  const [studentsInfo, setStudentsInfo] = useState([]);
  const [allAbsences, setAllAbsences] = useState([]);

  const getMonth = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  useEffect(() => {
    if (!newFrequency)
      GetSubjects(teacherInfo.employeeNumber, request, setAllSubjects);
  }, [newFrequency]);

  useEffect(() => {
    if (allSubjects.length) {
      setSubject(allSubjects[0].subject);
    }
  }, [allSubjects]);

  useEffect(() => {
    if (subject) {
      const frequency = allSubjects.filter((sub) => sub.subject === subject)[0]
        ?.frequency;

      setAllFrequency(
        frequency.filter(
          (freq) =>
            getMonth[FormatDateToShow(freq.ClassDate).substr(3, 2) - 1] ===
            month
        )
      );

      setAllStudents(
        allSubjects.filter((sub) => sub.subject === subject)[0]?.students
      );
    }
  }, [subject, month]);

  useEffect(() => {
    if (subject) {
      const allFreq = allSubjects.filter((sub) => sub.subject === subject)[0]
        ?.frequency;

      let classesNumber = 0;

      for (let i = 0; i < allFreq.length; i++)
        classesNumber += allFreq[i].ClassesTaught;

      setClassesTaught(classesNumber);
    }
  }, [subject]);

  useEffect(async () => {
    const getAbsence = async (mat) => {
      const { url, config } = GET_STUDENT_FREQUENCY(mat);

      const { json, error } = await request(url, config);

      if (!error) {
        const sub = subject.split(' ');
        const acronym = sub[0];
        const classParam = sub.length > 1 ? sub[2] : '';

        return json?.filter(
          (freq) => freq.Acronym === acronym && freq.Class === classParam
        )[0].Absences;
      }
    };

    const getStudentInfo = async (mat) => {
      const { url, config } = GET_STUDENT(mat);

      const { json, error } = await request(url, config);

      if (!error) {
        const absence = await getAbsence(mat);

        return {
          matricula: mat,
          nome: json.Name,
          faltas: absence,
        };
      }
    };

    setStudentsInfo(
      await Promise.all(
        allStudents.map((student) =>
          getStudentInfo(student.matriculationNumber)
        )
      )
    );

    const check = [];

    for (let i = 0; i < allStudents.length; i++)
      check.push({ mat: allStudents[i].matriculationNumber, absence: 0 });

    setAllAbsences(check);
  }, [allStudents]);

  const processingAbsence = (isChecked, mat) => {
    if (isChecked) {
      setAllAbsences(
        allAbsences.map((item) =>
          item.mat === mat ? { ...item, absence: parseInt(numClasses) } : item
        )
      );
    } else {
      setAllAbsences(
        allAbsences.map((item) =>
          item.mat === mat ? { ...item, absence: 0 } : item
        )
      );
    }
  };

  function addNewFrequency() {
    if (date && numClasses && topic) {
      const freq = allFrequency;

      freq.push({
        ClassDate: date,
        ClassesTaught: numClasses,
        SubjectMatter: topic,
      });

      setAllFrequency(freq);
      setNewFrequency(true);
      setModalIsOpen(false);
    }
  }

  useEffect(() => {
    if (!newFrequency && topic && date && numClasses) {
      const insertFrequency = async (students) => {
        const sub = subject.split(' ');
        const acronym = sub[0];
        const classParam = sub.length > 1 ? sub[2] : '';

        const body = {
          acronym: acronym,
          classParam: classParam,
          frequency: {
            classDate: date,
            subjectMatter: topic,
            classesTaught: parseInt(numClasses),
            missingStudents: students,
          },
        };

        console.log(body);

        const { url, config } = PUT_INSERT_FREQUENCY(body);

        const { json, erorr } = await request(url, config);

        setTopic();
        setDate();
        setNumClasses();
      };

      const students = [];

      allAbsences.map((abs) => {
        if (abs.absence !== 0) students.push(abs.mat);
      });

      insertFrequency(students);
    }
  }, [newFrequency]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Publicação da Frequência</h1>
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
              {allSubjects?.map((sub) => (
                <option value={sub.subject}>{sub.subject}</option>
              ))}
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
              {months.map((month) => (
                <option value={month}>{month}</option>
              ))}
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
                  {allFrequency?.map((row) => (
                    <StyledTableRow key={row.dia}>
                      <StyledTableCell align="center">
                        <img src={research} />
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <div style={{ display: 'flex' }}>
                          <p>
                            <b>Dia: </b>
                            {FormatDateToShow(row.ClassDate)}
                          </p>
                          <p style={{ marginLeft: '30px' }}>
                            <b>Nº de Aulas: </b>
                            {row.ClassesTaught}
                          </p>
                        </div>

                        <p style={{ textAlign: 'start', marginTop: '5px' }}>
                          <b>Assunto: </b>
                          {row.SubjectMatter}
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
          <Info classesTaught={classesTaught} />

          {newFrequency && (
            <>
              <p style={{ marginTop: '30px', marginBottom: '15px' }}>
                <b>Registro de faltas do dia {FormatDateToShow(date)}</b>
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
                    {studentsInfo.map((row, index) => (
                      <StyledTableRow key={row.matricula}>
                        <StyledTableCell>
                          <input
                            type="checkbox"
                            className={styles.checkbox}
                            onChange={(value) =>
                              processingAbsence(
                                value.target.checked,
                                row.matricula
                              )
                            }
                            checked={
                              allAbsences[index].absence ===
                              parseInt(numClasses)
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <p style={{ textAlign: 'start' }}>
                            {row.matricula} - {row.nome}
                          </p>
                          <div style={{ display: 'flex', marginTop: '5px' }}>
                            <p style={{ marginRight: '30px' }}>
                              <b>Faltas do dia: </b>
                              {allAbsences[index].absence}
                            </p>
                            <p>
                              <b>Total: </b>
                              {row.faltas}
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

TeacherFrequency.propTypes = {
  teacherInfo: PropTypes.object,
};

export default TeacherFrequency;
