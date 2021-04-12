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

const ClassReplacement = () => {
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
      turma: 'C213 - L1',
      data: '10/04/2021',
      horario: '15:30 - 17:10',
      local: 'Lab. de Tratamento da Informação 1.4',
    },
    {
      turma: 'C213 - L1',
      data: '17/04/2021',
      horario: '15:30 - 17:10',
      local: 'Lab. de Tratamento da Informação 1.4',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Reposição de Aula</h1>
        <div />
      </div>

      <div className={styles.table}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" width="150px">
                  Turma
                </StyledTableCell>
                <StyledTableCell align="center">Data</StyledTableCell>
                <StyledTableCell align="center">Horário</StyledTableCell>
                <StyledTableCell align="center">Local</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.turma}>
                  <StyledTableCell align="center">{row.turma}</StyledTableCell>

                  <StyledTableCell align="center">{row.data}</StyledTableCell>

                  <StyledTableCell align="center">
                    {row.horario}
                  </StyledTableCell>

                  <StyledTableCell align="center">{row.local}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ClassReplacement;
