import React from 'react';
import Table from '../../components/Table/Table';

import styles from './styles.module.css';

const AcademicCoefficient = () => {
  const rows = [
    { semestre: '2020/2', crs: 93.77, cre: 84.05, mediana: 88.0 },
    { semestre: '2020/1', crs: 95.0, cre: 81.94, mediana: 83.0 },
    { semestre: '2019/1', crs: 86.84, cre: 79.33, mediana: 80.0 },
    { semestre: '2018/2', crs: 79.1, cre: 77.57, mediana: 77.0 },
    { semestre: '2018/1', crs: 77.41, cre: 77.03, mediana: 75.0 },
    { semestre: '2017/2', crs: 75.1, cre: 76.82, mediana: 75.0 },
    { semestre: '2017/1', crs: 78.72, cre: 78.72, mediana: 75.0 },
  ];

  const header = ['Semestre', 'CRS', 'CRE', 'Mediana'];

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
        <Table header={header} data={rows} />
      </div>
    </div>
  );
};

export default AcademicCoefficient;
