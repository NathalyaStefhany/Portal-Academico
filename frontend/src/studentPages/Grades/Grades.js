import React from 'react';
import Table from '../../components/Table/Table';

import styles from './styles.module.css';

const Grades = () => {
  const grades = [
    {
      subject: 'T106 - L1',
      grades: [
        { test: 'Exercício 1', grade: 75 },
        { test: 'Exercício 2', grade: 100 },
      ],
    },
    {
      subject: 'G008',
      grades: [
        { test: 'Exercício 1', grade: 75 },
        { test: 'Exercício 2', grade: 100 },
      ],
    },
    {
      subject: 'C213',
      grades: [{ test: '-', grade: '-' }],
    },
    {
      subject: 'C115 - L1',
      grades: [
        { test: 'Exercício 1', grade: 75 },
        { test: 'Exercício 2', grade: 100 },
      ],
    },
    {
      subject: 'C317',
      grades: [{ test: '-', grade: '-' }],
    },
  ];

  const header = ['Avaliação', 'Nota'];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Notas</h1>
        <div />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {grades.map((grade, index) => (
          <div className={styles.table} key={index}>
            <p className={styles.subject}>{grade.subject}</p>

            <Table header={header} data={grade.grades} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grades;
