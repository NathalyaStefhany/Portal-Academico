import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useFetch from '../../hooks/useFetch';

import {
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

import styles from './styles.module.css';
import { GET_STUDENT_FREQUENCY } from '../../service/api';

const Frequency = ({ studentInfo }) => {
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

  const { request } = useFetch();

  const [frequency, setFrequency] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const { url: url, config: config } = GET_STUDENT_FREQUENCY(
        studentInfo.matriculationNumber
      );

      const { json, error } = await request(url, config);

      if (!error) {
        setFrequency(json);
      }
    };

    sendRequest();
  }, []);

  const regex = /[0-9]/;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Frequência</h1>
        <div />
      </div>

      <div className={styles.table}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" className={styles.oneRowBorder}>
                  Turma
                </StyledTableCell>
                <StyledTableCell align="center">Teo</StyledTableCell>
                <StyledTableCell align="center">Lab</StyledTableCell>
                <StyledTableCell align="center">Aulas Minis.</StyledTableCell>
                <StyledTableCell align="center">Limite</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {frequency.map((row) => (
                <StyledTableRow key={row.turma}>
                  <StyledTableCell align="center">
                    {row.Acronym}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {!regex.test(row.Class) ? row.Absences : '-'}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {regex.test(row.Class) ? row.Absences : '-'}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.ClassesTaught}
                  </StyledTableCell>

                  <StyledTableCell align="center">{row.Limit}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

Frequency.propTypes = {
  studentInfo: PropTypes.object,
};

export default Frequency;
