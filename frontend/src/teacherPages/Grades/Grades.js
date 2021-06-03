import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  withStyles,
} from '@material-ui/core';

import AddNewTestType from './AddNewTestType/AddNewTestType';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';

import add from '../../assets/icons/add.svg';
import elaboration from '../../assets/icons/elaboration.svg';
import checkFilled from '../../assets/icons/check-filled.svg';

import useFetch from '../../hooks/useFetch';
import { GET_STUDENT, PUT_INSERT_GRADE } from '../../service/api';

import styles from './styles.module.css';
import SelectClass from './SelectClass';

const TeacherGrades = ({ teacherInfo }) => {
  const [subject, setSubject] = useState('');

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [testType, setTestType] = useState('');
  const [testTypeOptions, setTestTypeOptions] = useState([
    'NP1',
    'NP2',
    'NP3',
    'NL1',
    'NL2',
    'NL3',
  ]);

  const [allTestsCreated, setAllTestsCreated] = useState([]);

  const [saveModalIsOpen, setSaveModalIsOpen] = useState(false);

  const [grades, setGrades] = useState([]);

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

  const { request } = useFetch();

  const [allClasses, setAllClasses] = useState();
  const [allStudents, setAllStudents] = useState();

  useEffect(async () => {
    const sendRequest = async (student, id) => {
      const { url: url, config: config } = GET_STUDENT(student);

      const { json, error } = await request(url, config);

      if (!error) {
        const studentGrades = json?.Classes?.filter(
          (classParam) => classParam.classId === id
        )[0]?.Grades;

        return {
          curso: json.Course,
          per: json.Period,
          mat: student,
          nome: json.Name,
          grades: studentGrades,
        };
      }
    };

    if (subject && allClasses) {
      setAllStudents([]);
      const classParam = allClasses?.filter(
        (value) => value.subject === subject
      )[0];

      const students = classParam?.students;

      const id = classParam?.id;

      if (students)
        setAllStudents(
          await Promise.all(
            students.map((student) =>
              sendRequest(student.matriculationNumber, id)
            )
          )
        );
    }
  }, [subject, allClasses]);

  useEffect(() => {
    if (allStudents && allStudents.length) {
      const student = allStudents[0];

      if (student.grades.length) {
        setAllTestsCreated(
          student.grades.map((grade) => ({
            type: grade.Description,
            state: 'saved',
          }))
        );
      }
    } else setAllTestsCreated([]);
  }, [allStudents]);

  function addGrade(mat, grade) {
    let allGrades = grades;

    for (var i = 0; i < grades.length; i++) {
      if (grades[i].matricula === mat) {
        allGrades.splice(i, 1);
      }
    }
    allGrades.push({ matricula: mat, nota: grade });

    setGrades(allGrades);
  }

  const insertGrade = async (typeTest) => {
    allStudents.map((student) => {
      const subjectArray = subject.split(' ');

      const acronym = subjectArray[0];
      let classParam = '';

      if (subjectArray.length > 0) classParam = subjectArray[2];

      const gradeValue = grades.filter(
        (grade) => grade.matricula === student.mat
      )[0]?.nota;

      let newStudent = student;
      let newGrades = [].concat(student.grades, [
        {
          Description: typeTest,
          Percentage: 0.5,
          Value: gradeValue ? parseInt(gradeValue) : 0,
        },
      ]);

      newStudent.grades = newGrades;

      const body = {
        matriculationNumber: student.mat,
        acronym: acronym,
        classParam: classParam,
        description: typeTest,
        percentage: 0.5,
        value: gradeValue ? parseInt(gradeValue) : 0,
      };

      const { url: url, config: config } = PUT_INSERT_GRADE(body);

      const { json, error } = request(url, config);

      setTestType('');
    });
  };

  useEffect(() => {
    if (allTestsCreated && allTestsCreated.length) {
      const testTypeOpt = testTypeOptions;

      allTestsCreated.map((test) => {
        for (let i = 0; i < testTypeOptions.length; i++) {
          if (testTypeOptions[i] === test.type) testTypeOpt.splice(i, 1);
        }
      });

      setTestTypeOptions(testTypeOpt);
    }
  }, [allTestsCreated]);

  function saveGrades() {
    let tests = allTestsCreated;

    for (var i = 0; i < allTestsCreated.length; i++) {
      if (allTestsCreated[i].type === testType) {
        tests.splice(i, 1);
      }
    }

    tests.push({ type: `${testType}`, state: 'saved' });

    setAllTestsCreated(tests);

    insertGrade(testType);

    setGrades([]);
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Publicação de Notas</h1>
        <div />
      </div>

      <div style={{ display: 'flex' }}>
        <SelectClass
          teacherInfo={teacherInfo}
          subject={subject}
          setSubject={setSubject}
          allClasses={allClasses}
          setAllClasses={setAllClasses}
        />

        <div className={styles.table}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Curso</StyledTableCell>
                  <StyledTableCell align="center">Per.</StyledTableCell>
                  <StyledTableCell align="center">Mat.</StyledTableCell>
                  <StyledTableCell align="center">Nome</StyledTableCell>

                  {allTestsCreated.map((value) => (
                    <StyledTableCell align="center">
                      <button disabled style={{ cursor: 'auto' }}>
                        <img
                          src={
                            value.state === 'elaboration'
                              ? elaboration
                              : checkFilled
                          }
                        />
                      </button>{' '}
                      {value.type}
                    </StyledTableCell>
                  ))}

                  <StyledTableCell align="center">
                    <button onClick={() => setModalIsOpen(true)}>
                      <img src={add} />
                    </button>
                  </StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {allStudents?.map((row) => (
                  <StyledTableRow key={row.mat}>
                    <StyledTableCell align="center">
                      {row.curso}
                    </StyledTableCell>

                    <StyledTableCell align="center">{row.per}</StyledTableCell>

                    <StyledTableCell align="center">{row.mat}</StyledTableCell>

                    <StyledTableCell align="center">{row.nome}</StyledTableCell>

                    {allTestsCreated.map((value) => (
                      <StyledTableCell align="center">
                        {value.state === 'elaboration' ? (
                          <input
                            className={styles.inputGrade}
                            onChange={(gradeInput) =>
                              addGrade(row.mat, gradeInput.target.value)
                            }
                            value={
                              grades.filter(
                                (grade) => grade.matricula === row.mat
                              )[0]?.nota
                            }
                          />
                        ) : (
                          <p>
                            {
                              row.grades.filter(
                                (grade) => grade?.Description === value.type
                              )[0]?.Value
                            }
                          </p>
                        )}
                      </StyledTableCell>
                    ))}

                    <StyledTableCell align="center"></StyledTableCell>
                  </StyledTableRow>
                ))}

                {allTestsCreated.length > 0 && (
                  <StyledTableRow key="save">
                    <StyledTableCell align="center"></StyledTableCell>

                    <StyledTableCell align="center"></StyledTableCell>

                    <StyledTableCell align="center"></StyledTableCell>

                    <StyledTableCell align="center"></StyledTableCell>

                    {allTestsCreated.map((value) => (
                      <StyledTableCell align="center">
                        <button
                          className={styles.saveGrades}
                          disabled={value.state === 'saved'}
                          onClick={() => setSaveModalIsOpen(true)}
                          style={{
                            backgroundColor: `${
                              value.state === 'saved' ? '#666666' : '#0054a6'
                            }`,
                          }}
                        >
                          Salvar
                        </button>
                      </StyledTableCell>
                    ))}
                    <StyledTableCell align="center"></StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {modalIsOpen && (
          <AddNewTestType
            testType={testType}
            setTestType={setTestType}
            testTypeOptions={testTypeOptions}
            setTestTypeOptions={setTestTypeOptions}
            setModalIsOpen={setModalIsOpen}
            allTestsCreated={allTestsCreated}
            setAllTestsCreated={setAllTestsCreated}
            subject={subject}
          />
        )}

        {saveModalIsOpen && (
          <Modal>
            <div className={styles.modal}>
              <p
                style={{
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: '18px',
                  marginTop: '25px',
                }}
              >
                Deseja mesmo salvar as notas?
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '80px',
                }}
              >
                <Button
                  title="SIM"
                  onClick={() => {
                    saveGrades();
                    setSaveModalIsOpen(false);
                  }}
                />
                <Button title="NÃO" onClick={() => setSaveModalIsOpen(false)} />
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

TeacherGrades.propTypes = {
  teacherInfo: PropTypes.object,
};

export default TeacherGrades;
