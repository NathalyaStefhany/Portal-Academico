import React, { useEffect, useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { FormControl, InputLabel } from '@material-ui/core';

import add from '../../assets/icons/add.svg';
import elaboration from '../../assets/icons/elaboration.svg';
import checkFilled from '../../assets/icons/check-filled.svg';

import styles from './styles.module.css';
import AddNewTestType from './AddNewTestType/AddNewTestType';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';

const TeacherGrades = () => {
  const [subject, setSubject] = useState('C317');

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [testTypeOptions, setTestTypeOptions] = useState(['NP1', 'NP2', 'NP3']);

  const [allTestsCreated, setAllTestsCreated] = useState([]);

  const [typeTestToSave, setTypeTestToSave] = useState('');
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

  const rows = [
    {
      curso: 'C317',
      per: '9',
      mat: '1370',
      nome: 'André Fillipi',
    },
    {
      curso: 'C317',
      per: '9',
      mat: '1376',
      nome: 'João Gustavo Rangel de Oliveira',
    },
    {
      curso: 'C317',
      per: '9',
      mat: '1369',
      nome: 'Nathalya Stefhany Pereira',
    },
  ];

  function addGrade(mat, grade, type) {
    let allGrades = grades;

    for (var i = 0; i < grades.length; i++) {
      if (grades[i].matricula === mat) {
        allGrades.splice(i, 1);
      }
    }
    allGrades.push({ matricula: `${mat}`, nota: grade });

    setGrades(allGrades);
  }

  function saveGrades() {
    let tests = allTestsCreated;

    for (var i = 0; i < allTestsCreated.length; i++) {
      if (allTestsCreated[i].type === typeTestToSave) {
        tests.splice(i, 1);
      }
    }

    tests.push({ type: `${typeTestToSave}`, state: 'saved' });

    setTypeTestToSave('');
    setAllTestsCreated(tests);
  }

  useEffect(() => {
    if (typeTestToSave !== '') setSaveModalIsOpen(true);
  }, [typeTestToSave]);

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
            <img
              src={elaboration}
              alt="Icone de alerta de elaboração de nota"
            />
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
                {rows.map((row) => (
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
                              addGrade(
                                row.mat,
                                gradeInput.target.value,
                                value.type
                              )
                            }
                          ></input>
                        ) : (
                          grades.map((value) => {
                            if (value.matricula === row.mat)
                              return <p>{value.nota}</p>;
                          })
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
                          onClick={() => setTypeTestToSave(value.type)}
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
            testTypeOptions={testTypeOptions}
            setTestTypeOptions={setTestTypeOptions}
            setModalIsOpen={setModalIsOpen}
            allTestsCreated={allTestsCreated}
            setAllTestsCreated={setAllTestsCreated}
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

export default TeacherGrades;
