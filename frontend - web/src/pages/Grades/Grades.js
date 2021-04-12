import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import styles from './styles.module.css';

const Grades = () => {
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

  const grades = [
    {
      subject: 'T106 - L1',
      grades: [
        { test: 'Exercício 1', grade: 75 },
        { test: 'Exercício 2', grade: 100 },
      ],
    },
    {
      subject: 'G008',
      grades: [
        { test: 'Exercício 1', grade: 75 },
        { test: 'Exercício 2', grade: 100 },
      ],
    },
    {
      subject: 'C213',
      grades: [{ test: '-', grade: '-' }],
    },
    {
      subject: 'C115 - L1',
      grades: [
        { test: 'Exercício 1', grade: 75 },
        { test: 'Exercício 2', grade: 100 },
      ],
    },
    {
      subject: 'C317',
      grades: [{ test: '-', grade: '-' }],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Notas</h1>
        <div />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {grades.map((grade, index) => (
          <div className={styles.table} key={index}>
            <p className={styles.subject}>{grade.subject}</p>

            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Avaliações</StyledTableCell>
                    <StyledTableCell align="center">Notas</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {grade.grades.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        {row.test}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.grade}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grades;
