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

      if (!error) setHistoric(json.Subjects);
    };

    sendRequest();
  }, []);

  /*
  const subject = [
    { sigla: 'AC1', descricao: 'Atividades Complementares' },
    { sigla: 'C201', descricao: 'Introdução à Engenharia' },
    { sigla: 'C202', descricao: 'Algoritmos e Estruturas de Dados I' },
    { sigla: 'E201', descricao: 'Circuitos Elétricos I' },
    { sigla: 'M001', descricao: 'Matemática' },
    { sigla: 'M002', descricao: 'Álgebra e Geometria Analítica' },
    { sigla: 'AC2', descricao: 'Atividades Complementares' },
    { sigla: 'C103', descricao: 'Algoritmos e Estruturas de Dados II' },
    { sigla: 'E110', descricao: 'Desenho' },
    { sigla: 'E202', descricao: 'Circuitos Elétricos II' },
    { sigla: 'E204', descricao: 'Eletrônica Analógica I' },
    { sigla: 'F201', descricao: 'Física I' },
    { sigla: 'M003', descricao: 'Cálculo I' },
    { sigla: 'Q201', descricao: 'Química e Ciências dos Materiais' },
    { sigla: 'AC3', descricao: 'Atividades Complementares' },
    { sigla: 'C204', descricao: 'Algoritmos e Estruturas de Dados III' },
    { sigla: 'E205', descricao: 'Eletrônica Analógica II' },
    { sigla: 'E207', descricao: 'Eletrônica Digital I' },
    {
      sigla: 'F005',
      descricao: 'Mecânica dos Sólidos e Resistência dos Materiais',
    },
    { sigla: 'F202', descricao: 'Física II' },
    { sigla: 'M004', descricao: 'Cálculo II' },
    { sigla: 'AC4', descricao: 'Atividades Complementares' },
    { sigla: 'C005', descricao: 'Linguagens de Programação e Compiladores' },
    { sigla: 'E206', descricao: 'Eletrônica Analógica III' },
    { sigla: 'E208', descricao: 'Eletrônica Digital II' },
    { sigla: 'F203', descricao: 'Física III' },
    { sigla: 'M005', descricao: 'Cálculo III' },
    { sigla: 'M007', descricao: 'Sinais e Sistemas' },
    { sigla: 'AC5', descricao: 'Atividades Complementares' },
    { sigla: 'C206', descricao: 'Programação Orientada a Objetos' },
    { sigla: 'C207', descricao: 'Banco de Dados' },
    {
      sigla: 'E209',
      descricao: 'Sistemas Microcontrolados e Microprocessados',
    },
    { sigla: 'G304', descricao: 'Gestão de Projetos I' },
    { sigla: 'M008', descricao: 'Probabilidade e Processos Estocásticos' },
    { sigla: 'AC6', descricao: 'Atividades Complementares' },
    { sigla: 'C208', descricao: 'Arquiteturas de Computadores' },
    { sigla: 'C209', descricao: 'Computação Gráfica e Multimídia' },
    { sigla: 'F004', descricao: 'Física IV' },
    { sigla: 'M106', descricao: 'Cálculo Numérico' },
    { sigla: 'M109', descricao: 'Estatística' },
    { sigla: 'M210', descricao: 'Otimização I' },
    { sigla: 'AC7', descricao: 'Atividades Complementares' },
    { sigla: 'C012', descricao: 'Sistemas Operacionais' },
    { sigla: 'C111', descricao: 'Análise de Dados' },
    { sigla: 'C210', descricao: 'Inteligência Computacional' },
    { sigla: 'C319', descricao: 'Disciplina Eletiva I' },
    { sigla: 'H001', descricao: 'Administração' },
    { sigla: 'T202', descricao: 'Redes de Computadores' },
    { sigla: 'AC8', descricao: 'Atividades Complementares' },
    {
      sigla: 'C115',
      descricao: 'Conceitos e Tecnologias para Dispositivos Conectados',
    },
    { sigla: 'C213', descricao: 'Sistemas Embarcados' },
    { sigla: 'C214', descricao: 'Engenharia de Software' },
    { sigla: 'C320', descricao: 'Disciplina Eletiva II' },
    { sigla: 'H002', descricao: 'Economia' },
    { sigla: 'T106', descricao: 'Gerência,QoS e Segurança em Redes' },
    { sigla: 'C317', descricao: 'Tópicos Especiais I' },
    { sigla: 'EST1', descricao: 'Estágio Supervisionado' },
    { sigla: 'H003', descricao: 'Humanidades, Ciências Sociais e Cidadania' },
    { sigla: 'H004', descricao: 'Ciências do Ambiente' },
    { sigla: 'C216', descricao: 'Sistemas Distribuídos' },
    { sigla: 'C318', descricao: 'Tópicos Especiais II' },
    { sigla: 'TCC1', descricao: 'Trabalho de Conclusão de Curso I' },
  ];

  const rows = [
    { nota: 'APR', ano: '2017/1' },
    { nota: '91', ano: '2017/1' },
    { nota: '92', ano: '2017/1' },
    { nota: '74', ano: '2017/1' },
    { nota: '75', ano: '2017/1' },
    { nota: '63', ano: '2017/1' },
    { nota: 'APR', ano: '2017/2' },
    { nota: '79', ano: '2017/2' },
    { nota: '72', ano: '2017/2' },
    { nota: '74', ano: '2017/2' },
    { nota: '75', ano: '2017/2' },
    { nota: '83', ano: '2017/2' },
    { nota: '60', ano: '2017/2' },
    { nota: '83', ano: '2017/2' },
    { nota: 'APR', ano: '2018/1' },
    { nota: '81', ano: '2018/1' },
    { nota: '83', ano: '2018/1' },
    { nota: '90', ano: '2018/1' },
    { nota: '60', ano: '2018/1' },
    { nota: '73', ano: '2018/1' },
    { nota: '75', ano: '2018/1' },
    { nota: 'APR', ano: '2018/2' },
    { nota: '88', ano: '2018/2' },
    { nota: '87', ano: '2018/2' },
    { nota: '80', ano: '2018/2' },
    { nota: '66', ano: '2018/2' },
    { nota: '64', ano: '2018/2' },
    { nota: '88', ano: '2018/2' },
    { nota: 'APR', ano: '2019/1' },
    { nota: '91', ano: '2019/1' },
    { nota: '91', ano: '2019/1' },
    { nota: '83', ano: '2019/1' },
    { nota: '92', ano: '2019/1' },
    { nota: '79', ano: '2019/1' },
    { nota: 'APR', ano: '2020/1' },
    { nota: '93', ano: '2020/1' },
    { nota: '96', ano: '2020/1' },
    { nota: '90', ano: '2020/1' },
    { nota: '100', ano: '2020/1' },
    { nota: '88', ano: '2020/1' },
    { nota: '94', ano: '2020/1' },
    { nota: 'APR', ano: '2020/1' },
    { nota: '95', ano: '2020/2' },
    { nota: '98', ano: '2020/2' },
    { nota: '93', ano: '2020/2' },
    { nota: '94', ano: '2020/2' },
    { nota: '98', ano: '2020/1' },
    { nota: '90', ano: '2020/2' },
    { nota: null, ano: null },
    { nota: null, ano: null },
    { nota: null, ano: null },
    { nota: '98', ano: '2020/2' },
    { nota: null, ano: null },
    { nota: '82', ano: '2020/2' },
    { nota: null, ano: null },
    { nota: null, ano: null },
    { nota: null, ano: null },
    { nota: '95', ano: '2020/1' },
    { nota: '95', ano: '2020/2' },
    { nota: null, ano: null },
    { nota: null, ano: null },
    { nota: null, ano: null },
  ]; */

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
              {historic.length &&
                historic.map((row, index) => (
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
                ))}
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
