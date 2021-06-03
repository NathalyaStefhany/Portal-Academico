import React from 'react';

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

import styles from './styles.module.css';

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
  root: {},
}))(TableRow);

const Info = ({ classesTaught }) => {
  return (
    <TableContainer
      component={Paper}
      className={styles.table}
      style={{ width: '100%' }}
    >
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">
              Informações sobre a turma
            </StyledTableCell>
            <StyledTableCell align="center">Obrigatória</StyledTableCell>
            <StyledTableCell align="center">Ministrada</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <StyledTableRow>
            <StyledTableCell style={{ fontWeight: 600 }}>
              Carga Horária
            </StyledTableCell>
            <StyledTableCell align="center">40</StyledTableCell>
            <StyledTableCell align="center">{classesTaught}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell style={{ fontWeight: 600 }}>
              Nº de Reposições Pendentes
            </StyledTableCell>
            <StyledTableCell colSpan={2} align="center">
              0
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell style={{ fontWeight: 600 }}>
              Nº de Aulas em Feriados
            </StyledTableCell>
            <StyledTableCell colSpan={2} align="center">
              0
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Info;
