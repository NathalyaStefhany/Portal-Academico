import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Table from '../../components/Table/Table';
import FormatDateToShow from '../../utils/FormatDateToShow';

import useFetch from '../../hooks/useFetch';

import styles from './styles.module.css';
import { GET_STUDENT_REPLACEMENT } from '../../service/api';
import FormatDate from '../../utils/FormatDate';

const ClassReplacement = ({ studentInfo }) => {
  const { request } = useFetch();

  const [replacements, setReplacements] = useState([
    { turma: '', data: '', horario: '', local: '' },
  ]);

  useEffect(() => {
    const sendRequest = async () => {
      const { url: url, config: config } = GET_STUDENT_REPLACEMENT(
        studentInfo.matriculationNumber
      );

      const { json, error } = await request(url, config);

      if (!error && json.length) {
        setReplacements(
          json
            .map((rep) => {
              const classParam = rep.Class ? ` - ${rep.Class}` : '';

              const replacement = {
                turma: rep.Acronym + classParam,
                data: FormatDateToShow(rep.Date),
                horario: rep.Hour,
                local: rep.Local,
              };

              return replacement;
            })
            .sort((a, b) =>
              Number(new Date(FormatDate(a.data))) -
                Number(new Date(FormatDate(b.data))) <
              0
                ? -1
                : Number(new Date(FormatDate(a.data))) -
                    Number(new Date(FormatDate(b.data))) >
                  0
                ? 1
                : a.horario < b.horario
                ? -1
                : 1
            )
        );
      }
    };

    sendRequest();
  }, []);

  const header = ['Turma', 'Data', 'Horário', 'Local'];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Reposição de Aula</h1>
        <div />
      </div>

      <div className={styles.table}>
        {replacements.length && <Table header={header} data={replacements} />}
      </div>
    </div>
  );
};

ClassReplacement.propTypes = {
  studentInfo: PropTypes.object,
};

export default ClassReplacement;
