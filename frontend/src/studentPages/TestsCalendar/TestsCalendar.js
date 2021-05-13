import React from 'react';
import Table from '../../components/Table/Table';

import styles from './styles.module.css';

const TestsCalendar = () => {
  const rows = [
    {
      turma: 'G008',
      prova: 'Prova 1',
      data: '22/04/2021',
      horario: '17:30 - 19:10',
      local: 'I-9',
    },
    {
      turma: 'C213',
      prova: 'Trabalho 1',
      data: '03/05/2021',
      horario: '19:30 - 21:10',
      local: 'I-17',
    },
    {
      turma: 'T106 - L1',
      prova: 'Prova 1',
      data: '08/05/2021',
      horario: '15:30 - 17:10',
      local: 'I-22',
    },
  ];

  const header = ['Turma', 'Prova', 'Data', 'Horário', 'Local'];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Calendário de Provas</h1>
        <div />
      </div>

      <div className={styles.table}>
        <Table header={header} data={rows} />
      </div>
    </div>
  );
};

export default TestsCalendar;
