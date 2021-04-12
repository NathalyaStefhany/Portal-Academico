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

const AcademicCoefficient = () => {
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
    { semestre: '2020/2', crs: 93.77, cre: 84.05, mediana: 88.0 },
    { semestre: '2020/1', crs: 95.0, cre: 81.94, mediana: 83.0 },
    { semestre: '2019/1', crs: 86.84, cre: 79.33, mediana: 80.0 },
    { semestre: '2018/2', crs: 79.1, cre: 77.57, mediana: 77.0 },
    { semestre: '2018/1', crs: 77.41, cre: 77.03, mediana: 75.0 },
    { semestre: '2017/2', crs: 75.1, cre: 76.82, mediana: 75.0 },
    { semestre: '2017/1', crs: 78.72, cre: 78.72, mediana: 75.0 },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Coeficiente Acadêmico</h1>
        <div />
      </div>

      <div
        style={{
          alignSelf: 'center',
        }}
      >
        <p className={styles.subtitle}>Legenda</p>

        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', marginRight: '20px' }}>
            <p style={{ fontWeight: '600' }}>CRS -&nbsp;</p>
            <p>Coeficiente de Rendimento no Semestre</p>
          </div>

          <div style={{ display: 'flex' }}>
            <p style={{ fontWeight: '600' }}>CRE -&nbsp;</p>
            <p>Coeficiente de Rendimento Escolar</p>
          </div>
        </div>
      </div>

      <div className={styles.table}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" width="150px">
                  Semestre
                </StyledTableCell>
                <StyledTableCell align="center">CRS</StyledTableCell>
                <StyledTableCell align="center">CRE</StyledTableCell>
                <StyledTableCell align="center">Mediana</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    {row.semestre}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.crs.toFixed(2)}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.cre.toFixed(2)}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.mediana.toFixed(2)}
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

export default AcademicCoefficient;
