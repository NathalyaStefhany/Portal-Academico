import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Table from '../../components/Table/Table';

import useFetch from '../../hooks/useFetch';
import { GET_STUDENT_GRADES } from '../../service/api';

import styles from './styles.module.css';

const Grades = ({ studentInfo }) => {
  const { request } = useFetch();

  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const { url: url, config: config } = GET_STUDENT_GRADES(
        studentInfo.matriculationNumber
      );

      const { json, error } = await request(url, config);

      if (!error) {
        const allGrades = [];
        let subject = '';
        let subjectGrade = [];

        for (let i = 0; i < json.length; i++) {
          for (let j = 0; j < json[i].length; j++) {
            if (j === 0) {
              const aux = json[i][j].Class ? ` - ${json[i][j].Class}` : ' ';

              subject = json[i][j].Acronym + aux;
            }

            subjectGrade.push({
              test: json[i][j].Test,
              grade: json[i][j].Grade,
            });
          }
          if (subjectGrade.length)
            allGrades.push({ subject: subject, grades: subjectGrade });

          subjectGrade = [];
        }

        setGrades(allGrades);
      }
    };

    sendRequest();
  }, []);

  const header = ['Avaliação', 'Nota'];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Notas</h1>
        <div />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {grades.length ? (
          <>
            {grades.map((grade, index) => (
              <div className={styles.table} key={index}>
                <p className={styles.subject}>{grade.subject}</p>

                <Table header={header} data={grade.grades} />
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

Grades.propTypes = {
  studentInfo: PropTypes.object,
};

export default Grades;
