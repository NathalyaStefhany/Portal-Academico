import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useFetch from '../../hooks/useFetch';
import { GET_STUDENT_TIME_TABLE } from '../../service/api';

import CreateTimeTable from '../../utils/CreateTimeTable';

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

const ClassSchedule = ({ studentInfo }) => {
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

  const [timeTable, setTimeTable] = useState(CreateTimeTable([]));

  useEffect(() => {
    const makeRequest = async () => {
      const { url: url, config: config } = GET_STUDENT_TIME_TABLE(
        studentInfo.matriculationNumber
      );

      const { json, error } = await request(url, config);

      if (!error) setTimeTable(CreateTimeTable(json));
      else console.log('Erro!');
    };

    makeRequest();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Horário das Aulas</h1>
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
              {timeTable.map((row) => (
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

ClassSchedule.propTypes = {
  studentInfo: PropTypes.object,
};

export default ClassSchedule;
