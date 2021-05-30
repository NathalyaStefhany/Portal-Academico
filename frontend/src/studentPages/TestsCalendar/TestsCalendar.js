import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Table from '../../components/Table/Table';

import { GET_STUDENT_TESTS } from '../../service/api';
import useFetch from '../../hooks/useFetch';

import styles from './styles.module.css';
import FormatDate from '../../utils/FormatDate';
import FormatDateToShow from '../../utils/FormatDateToShow';

const TestsCalendar = ({ studentInfo }) => {
  const { request } = useFetch();
  const [tests, setTests] = useState([
    { turma: null, prova: null, data: null, horario: null, local: null },
  ]);

  useEffect(() => {
    const sendRequest = async () => {
      const { url: url, config: config } = GET_STUDENT_TESTS(
        studentInfo.matriculationNumber
      );

      const { json, error } = await request(url, config);

      if (!error && json) {
        const testData = json.map((subject) => {
          if (subject.TestInf.length) {
            const turma = subject.Class ? ` - ${subject.Class}` : '';
            return subject.TestInf.map((test) => ({
              turma: subject.Acronym + turma,
              prova: test.TestName,
              data: FormatDateToShow(test.Date),
              horario: test.Time,
              local: test.Local,
            }));
          }
        });

        const filteredTest = testData.filter((n) => n);

        const allTests = [];

        for (let i = 0; i < filteredTest.length; i++) {
          for (let j = 0; j < filteredTest[i].length; j++)
            allTests.push(filteredTest[i][j]);
        }

        const sortedTests = allTests.sort((a, b) =>
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
        );

        if (sortedTests.length) setTests(sortedTests);
      }
    };

    sendRequest();
  }, []);

  const header = ['Turma', 'Prova', 'Data', 'Horário', 'Local'];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Calendário de Provas</h1>
        <div />
      </div>

      <div className={styles.table}>
        {tests.length && <Table header={header} data={tests} />}
      </div>
    </div>
  );
};

TestsCalendar.propTypes = {
  studentInfo: PropTypes.object,
};

export default TestsCalendar;
