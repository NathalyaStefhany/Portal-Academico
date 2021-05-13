import React from 'react';

import {
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from '@material-ui/core';

import rightArrow from '../../assets/icons/right-arrow.svg';
import xMark from '../../assets/icons/x-mark.svg';
import change from '../../assets/icons/exchange.svg';
import trash from '../../assets/icons/trash.svg';

import styles from './styles.module.css';

const Matriculation = () => {
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

  const rows1 = [
    {
      disciplina: 'C320',
      credito: 4,
      puxa: true,
    },
    {
      disciplina: 'C216',
      credito: 3,
      puxa: true,
    },
    {
      disciplina: 'C318',
      credito: 4,
      puxa: false,
    },
    {
      disciplina: 'TCC1',
      credito: 2,
      puxa: true,
    },
  ];

  const rows2 = [
    {
      disciplina: 'AC8',
      tt: 'I',
      tp: null,
      cr: 3,
    },
    {
      disciplina: 'C115',
      tt: 'L1',
      tp: null,
      cr: 1,
    },
    {
      disciplina: 'C213',
      tt: '-',
      tp: null,
      cr: 4,
    },
    {
      disciplina: 'C213',
      tt: null,
      tp: 'L1',
      cr: 3,
    },
    {
      disciplina: 'T106',
      tt: 'L1',
      tp: null,
      cr: 2,
    },
    {
      disciplina: 'C317',
      tt: '-',
      tp: null,
      cr: 4,
    },
    {
      disciplina: 'EST1',
      tt: '-',
      tp: null,
      cr: '-',
    },
    {
      disciplina: 'G008',
      tt: '-',
      tp: null,
      cr: 4,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div style={{ display: 'flex' }}>
          <h1>Matrícula</h1>
          <p>(26/02/2021 - 09:00 até 27/02/2021 - 12:00)</p>
        </div>

        <div />
      </div>

      <div style={{ display: 'flex' }}>
        <div className={[styles.owe, styles.table].join(' ')}>
          <h2>Disciplinas Devedoras</h2>

          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Disciplinas</StyledTableCell>
                  <StyledTableCell align="center">Créditos</StyledTableCell>
                  <StyledTableCell
                    align="center"
                    width="50px"
                  ></StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows1.map((row) => (
                  <StyledTableRow key={row.disciplina}>
                    <StyledTableCell align="center">
                      {row.disciplina}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.credito}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <button>
                        {row.puxa ? (
                          <img src={rightArrow} />
                        ) : (
                          <img src={xMark} />
                        )}
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className={[styles.information, styles.table].join(' ')}>
          <h2>Informações</h2>

          <table>
            <tr>
              <td>Nº de Créditos</td>
              <td>27</td>
            </tr>
            <tr>
              <td>Max. de Créditos do Aluno</td>
              <td>18</td>
            </tr>
            <tr>
              <td>Nº de Créditos Matriculados</td>
              <td>18</td>
            </tr>
            <tr>
              <td>Nº de Semestres do Aluno</td>
              <td>9</td>
            </tr>
            <tr>
              <td>Período Matriculado</td>
              <td>9</td>
            </tr>
          </table>
        </div>

        <div className={[styles.matriculate, styles.table].join(' ')}>
          <h2>Disciplinas Matriculadas</h2>

          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    align="center"
                    width="50px"
                  ></StyledTableCell>
                  <StyledTableCell align="center" width="150px">
                    Disciplina
                  </StyledTableCell>
                  <StyledTableCell align="center">TT</StyledTableCell>
                  <StyledTableCell align="center">TP</StyledTableCell>
                  <StyledTableCell align="center">Cr.</StyledTableCell>
                  <StyledTableCell
                    align="center"
                    width="50px"
                  ></StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows2.map((row) => (
                  <StyledTableRow key={row.disciplina}>
                    <StyledTableCell align="center">
                      <button>
                        <img src={change} />
                      </button>
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.disciplina}
                    </StyledTableCell>

                    <StyledTableCell align="center">{row.tt}</StyledTableCell>

                    <StyledTableCell align="center">{row.tp}</StyledTableCell>

                    <StyledTableCell align="center">{row.cr}</StyledTableCell>

                    <StyledTableCell align="center">
                      <button>
                        <img src={trash} />
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <p className={styles.subtitle}>Legenda</p>

          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', marginRight: '20px' }}>
              <p style={{ fontWeight: '600' }}>TT -&nbsp;</p>
              <p>Turma Teórica</p>
            </div>

            <div style={{ display: 'flex' }}>
              <p style={{ fontWeight: '600' }}>TP -&nbsp;</p>
              <p>Turma Prática</p>
            </div>
          </div>

          <div style={{ display: 'flex', marginTop: '3px' }}>
            <p style={{ fontWeight: '600' }}>Cr. -&nbsp;</p>
            <p>Créditos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matriculation;
