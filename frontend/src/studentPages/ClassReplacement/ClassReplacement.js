import React from 'react';
import Table from '../../components/Table/Table';

import styles from './styles.module.css';

const ClassReplacement = () => {
  const rows = [
    {
      turma: 'C213 - L1',
      data: '10/04/2021',
      horario: '15:30 - 17:10',
      local: 'Lab. de Tratamento da Informação 1.4',
    },
    {
      turma: 'C213 - L1',
      data: '17/04/2021',
      horario: '15:30 - 17:10',
      local: 'Lab. de Tratamento da Informação 1.4',
    },
  ];

  const header = ['Turma', 'Data', 'Horário', 'Local'];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Reposição de Aula</h1>
        <div />
      </div>

      <div className={styles.table}>
        <Table header={header} data={rows} />
      </div>
    </div>
  );
};

export default ClassReplacement;
