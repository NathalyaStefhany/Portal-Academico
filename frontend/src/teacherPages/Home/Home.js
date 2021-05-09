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

const TeacherHome = () => {
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

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(even)': {
        backgroundColor: 'rgba(0, 83, 166, 0.03)',
      },
    },
  }))(TableRow);

  const rows = [
    {
      hour: '08:00 - 08:50',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '08:50 - 09:40',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '10:00 - 10:50',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '10:50 - 11:40',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '13:30 - 14:20',
      monday: { acronyme: 'C317', classroom: '(Local: I-17)' },
      tuesday: { acronyme: 'C317', classroom: 'Atendimento' },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '14:20 - 15:10',
      monday: { acronyme: 'C317', classroom: '(Local: I-17)' },
      tuesday: { acronyme: 'C317', classroom: 'Atendimento' },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '15:30 - 16:20',
      monday: { acronyme: 'C317', classroom: '(Local: I-17)' },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '16:20 - 17:10',
      monday: { acronyme: 'C317', classroom: '(Local: I-17)' },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '17:30 - 18:20',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '18:20 - 19:10',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '19:30 - 20:20',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '20:20 - 21:10',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '21:30 - 22:20',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '22:10 - 23:10',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Horário das Aulas e Atendimentos</h1>
        <div />
      </div>

      <div className={styles.table}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" width="150px">
                  Horário
                </StyledTableCell>
                <StyledTableCell align="center">Segunda</StyledTableCell>
                <StyledTableCell align="center">Terça</StyledTableCell>
                <StyledTableCell align="center">Quarta</StyledTableCell>
                <StyledTableCell align="center">Quinta</StyledTableCell>
                <StyledTableCell align="center">Sexta</StyledTableCell>
                <StyledTableCell align="center">Sábado</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.hour}>
                  <StyledTableCell align="center">{row.hour}</StyledTableCell>

                  <StyledTableCell align="center">
                    <p className={styles.classAcronyme}>
                      {row.monday.acronyme}
                    </p>

                    {row.monday.classroom && (
                      <p className={styles.classroom}>{row.monday.classroom}</p>
                    )}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <p className={styles.classAcronyme}>
                      {row.tuesday.acronyme}
                    </p>

                    {row.tuesday.classroom && (
                      <p className={styles.classroom}>
                        {row.tuesday.classroom}
                      </p>
                    )}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <p className={styles.classAcronyme}>
                      {row.wednesday.acronyme}
                    </p>

                    {row.wednesday.classroom && (
                      <p className={styles.classroom}>
                        {row.wednesday.classroom}
                      </p>
                    )}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <p className={styles.classAcronyme}>
                      {row.thursday.acronyme}
                    </p>

                    {row.thursday.classroom && (
                      <p className={styles.classroom}>
                        {row.thursday.classroom}
                      </p>
                    )}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <p className={styles.classAcronyme}>
                      {row.friday.acronyme}
                    </p>

                    {row.friday.classroom && (
                      <p className={styles.classroom}>{row.friday.classroom}</p>
                    )}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <p className={styles.classAcronyme}>
                      {row.saturday.acronyme}
                    </p>

                    {row.saturday.classroom && (
                      <p className={styles.classroom}>
                        {row.saturday.classroom}
                      </p>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default TeacherHome;
