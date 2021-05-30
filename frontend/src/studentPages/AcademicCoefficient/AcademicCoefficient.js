import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Table from '../../components/Table/Table';

import useFetch from '../../hooks/useFetch';
import { GET_STUDENT_COEFFICIENT } from '../../service/api';

import styles from './styles.module.css';

const AcademicCoefficient = ({ studentInfo }) => {
  const { request } = useFetch();
  const [coefficient, setCoefficient] = useState([
    { semestre: '', crs: '', cre: '', mediana: '' },
  ]);

  useEffect(() => {
    const sendRequest = async () => {
      const { url: url, config: config } = GET_STUDENT_COEFFICIENT(
        studentInfo.matriculationNumber
      );

      const { json, error } = await request(url, config);

      if (!error && json) setCoefficient(json.Values);
    };

    sendRequest();
  }, []);

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
      {coefficient.length && (
        <div className={styles.table}>
          <Table header={header} data={coefficient} />
        </div>
      )}
    </div>
  );
};

AcademicCoefficient.propTypes = {
  studentInfo: PropTypes.object,
};

export default AcademicCoefficient;
