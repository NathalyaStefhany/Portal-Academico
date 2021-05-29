import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

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

import useFetch from '../../hooks/useFetch';
import { GET_STUDENT_HISTORIC } from '../../service/api';

import styles from './styles.module.css';

const Historic = ({ studentInfo }) => {
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
  const [historic, setHistoric] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const { url: url, config: config } = GET_STUDENT_HISTORIC(
        studentInfo.matriculationNumber
      );

      const { json, error } = await request(url, config);

      if (!error && json) setHistoric(json.Subjects);
    };

    sendRequest();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Histórico</h1>
        <div />
      </div>

      <div className={styles.table}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" width="150px">
                  Sigla
                </StyledTableCell>
                <StyledTableCell align="center">
                  Descrição da Disciplina
                </StyledTableCell>
                <StyledTableCell align="center">Nota</StyledTableCell>
                <StyledTableCell align="center">Ano / Semestre</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {historic.length
                ? historic.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        <p className={styles.classAcronyme}>{row.Acronym}</p>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.SubjectName}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.GradeValue}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.SemesterYear}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

Historic.propTypes = {
  studentInfo: PropTypes.object,
};

export default Historic;
