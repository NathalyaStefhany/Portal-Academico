import React, { useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import download from '../../assets/icons/download.svg';

import styles from './styles.module.css';

const ClassMaterial = () => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 6;

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const rows = [
    {
      sigla: 'C317',
      titulo: 'Milestone III - Relatório de Design de Projeto.pdf',
      data: '19/03/2021',
    },
    {
      sigla: 'C213',
      titulo: 'Aula 1 - Introducao aos Sistemas de Controle.pdf',
      data: '15/03/2021',
    },
    {
      sigla: 'C213',
      titulo: 'Aula 2 - Modelagem e Identificacao de Sistemas.pdf',
      data: '08/03/2021',
    },
    {
      sigla: 'C317',
      titulo: 'Milestone III - Relatório de Design de Projeto.pdf',
      data: '19/03/2021',
    },
    {
      sigla: 'C213',
      titulo: 'Aula 1 - Introducao aos Sistemas de Controle.pdf',
      data: '15/03/2021',
    },
    {
      sigla: 'C213',
      titulo: 'Aula 2 - Modelagem e Identificacao de Sistemas.pdf',
      data: '08/03/2021',
    },
    {
      sigla: 'C213',
      titulo: 'Aula 2 - Modelagem e Identificacao de Sistemas.pdf',
      data: '08/03/2021',
    },
  ];

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const arr = [1, 1, 1, 1, 1, 1];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Material Acadêmico do Semestre</h1>
        <div />
      </div>

      <div className={styles.table}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" width="150px">
                  sigla
                </StyledTableCell>
                <StyledTableCell align="left">Título</StyledTableCell>
                <StyledTableCell align="center">Data</StyledTableCell>
                <StyledTableCell align="center">Arquivo</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <StyledTableRow key={row.turma}>
                    <StyledTableCell align="center">
                      {row.sigla}
                    </StyledTableCell>

                    <StyledTableCell align="left">{row.titulo}</StyledTableCell>

                    <StyledTableCell align="center">{row.data}</StyledTableCell>

                    <StyledTableCell align="center">
                      <button>
                        <img src={download} />
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}

              {arr.map((element, index) => {
                return (
                  <>
                    {index < emptyRows && (
                      <StyledTableRow key={index} style={{ height: '53px' }}>
                        <TableCell colSpan={4} />
                      </StyledTableRow>
                    )}
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPageOptions={[]}
        />
      </div>
    </div>
  );
};

export default ClassMaterial;
