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

const Frequency = () => {
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
      turma: 'C317',
      fev: { teo: 0, lab: '-', jus: 0 },
      mar: { teo: 0, lab: '-', jus: 0 },
      abr: { teo: 0, lab: '-', jus: 0 },
      mai: { teo: '-', lab: '-', jus: '-' },
      jun: { teo: '-', lab: '-', jus: '-' },
      jul: { teo: '-', lab: '-', jus: '-' },
      aulasMin: 24,
      limPrev: 0,
      total: 0,
      sit: '-',
    },
    {
      turma: 'G008',
      fev: { teo: 0, lab: '-', jus: 0 },
      mar: { teo: 0, lab: '-', jus: 0 },
      abr: { teo: 0, lab: '-', jus: 0 },
      mai: { teo: '-', lab: '-', jus: '-' },
      jun: { teo: '-', lab: '-', jus: '-' },
      jul: { teo: '-', lab: '-', jus: '-' },
      aulasMin: 16,
      limPrev: 20,
      total: 0,
      sit: '-',
    },
  ];

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
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center">Fev</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell
                  align="center"
                  className={styles.monthsBorder}
                ></StyledTableCell>
                <StyledTableCell align="center">Mar</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell
                  align="center"
                  className={styles.monthsBorder}
                ></StyledTableCell>
                <StyledTableCell align="center">Abr</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell
                  align="center"
                  className={styles.monthsBorder}
                ></StyledTableCell>
                <StyledTableCell align="center">Mai</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell
                  align="center"
                  className={styles.monthsBorder}
                ></StyledTableCell>
                <StyledTableCell align="center">Jun</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell
                  align="center"
                  className={styles.monthsBorder}
                ></StyledTableCell>
                <StyledTableCell align="center">Jul</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center" className={styles.oneRowBorder}>
                  Aulas
                </StyledTableCell>
                <StyledTableCell align="center" className={styles.oneRowBorder}>
                  Lim.
                </StyledTableCell>
                <StyledTableCell align="center" className={styles.oneRowBorder}>
                  Total
                </StyledTableCell>
                <StyledTableCell align="center" className={styles.oneRowBorder}>
                  Sit.
                </StyledTableCell>
              </TableRow>
              <TableRow style={{ padding: '10px' }}>
                <StyledTableCell align="center" width="30px"></StyledTableCell>
                <StyledTableCell align="center">Teo</StyledTableCell>
                <StyledTableCell align="center">Lab</StyledTableCell>
                <StyledTableCell align="center">Jus</StyledTableCell>
                <StyledTableCell align="center">Teo</StyledTableCell>
                <StyledTableCell align="center">Lab</StyledTableCell>
                <StyledTableCell align="center">Jus</StyledTableCell>
                <StyledTableCell align="center">Teo</StyledTableCell>
                <StyledTableCell align="center">Lab</StyledTableCell>
                <StyledTableCell align="center">Jus</StyledTableCell>
                <StyledTableCell align="center">Teo</StyledTableCell>
                <StyledTableCell align="center">Lab</StyledTableCell>
                <StyledTableCell align="center">Jus</StyledTableCell>
                <StyledTableCell align="center">Teo</StyledTableCell>
                <StyledTableCell align="center">Lab</StyledTableCell>
                <StyledTableCell align="center">Jus</StyledTableCell>
                <StyledTableCell align="center">Teo</StyledTableCell>
                <StyledTableCell align="center">Lab</StyledTableCell>
                <StyledTableCell align="center">Jus</StyledTableCell>
                <StyledTableCell align="center">Minist.</StyledTableCell>
                <StyledTableCell align="center">Prev.</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.turma}>
                  <StyledTableCell align="center">{row.turma}</StyledTableCell>

                  <StyledTableCell align="center">
                    {row.fev.teo}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.fev.lab}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.fev.jus}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.mar.teo}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.mar.lab}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.mar.jus}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.abr.teo}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.abr.lab}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.abr.jus}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.mai.teo}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.mai.lab}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.mai.jus}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.jun.teo}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.jun.lab}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.jun.jus}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.jul.teo}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.jul.lab}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.jul.jus}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.aulasMin}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.limPrev}
                  </StyledTableCell>

                  <StyledTableCell align="center">{row.total}</StyledTableCell>

                  <StyledTableCell align="center">{row.sit}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <p className={styles.info}>
        O número máximo de faltas justificadas não poderá ultrapassar o limite
        de <b>10%</b> da carga horária <b>prevista</b> para cada disciplina.
      </p>
    </div>
  );
};

export default Frequency;
