import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import check from '../../assets/icons/check.svg';

import useFetch from '../../hooks/useFetch';
import { GET_STUDENT_REQUIREMENTS } from '../../service/api';

import styles from './styles.module.css';

const Requirements = ({ studentInfo }) => {
  const [totalCredits, setTotalCredits] = useState(0);
  const [credits, setCredits] = useState(0);

  let totCred = 0;
  let cred = 0;

  const [periodCredit, setPeriodCredit] = useState([]);

  const [requirements, setRequirements] = useState([]);

  const { request } = useFetch();

  const { url: url, config: config } = GET_STUDENT_REQUIREMENTS(
    studentInfo.matriculationNumber
  );

  function HistoricFlag(requirements, allSubjects) {
    if (!requirements.length) return 2;
    else {
      let ok = 0;

      for (let i = 0; i < requirements.length; i++) {
        const subject = requirements[i].Acronym;

        for (let j = 0; j < allSubjects.length; j++) {
          if (allSubjects[j].Acronym === subject) {
            if (allSubjects[j].HistoricFlag === 0) ok = ok + 1;
            else if (allSubjects[j].HistoricFlag === 1)
              if (requirements[i].RequireFlag === 2) ok = ok + 1;
          }
        }
      }

      if (ok === requirements.length) return 2;
      else return 3;
    }
  }

  function ProcessRequirements(requirements, allSubjects) {
    const req = [];
    const flag = ['Pré I', 'Pré II', 'Co'];
    let situation;

    for (let i = 0; i < requirements.length; i++) {
      const subject = requirements[i].Acronym;
      situation = 'no';

      for (let j = 0; j < allSubjects.length; j++) {
        const histFlag = requirements[i].RequireFlag;

        if (allSubjects[j].Acronym === subject) {
          if (allSubjects[j].HistoricFlag === 0) situation = 'ok';
          else if (allSubjects[j].HistoricFlag === 1 && histFlag === 2)
            situation = 'ok';

          break;
        }
      }

      req.push({
        Acronym: subject,
        HistoricFlag: flag[requirements[i].RequireFlag],
        situation: situation,
      });
    }

    return req;
  }

  useEffect(() => {
    const sendRequest = async () => {
      const { json, error } = await request(url, config);

      if (!error && json.length) {
        setRequirements([]);

        const req = [[], [], [], [], [], [], [], [], [], []];
        let perCred = [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]];

        json.map((subject) => {
          const sub = {
            Acronym: subject.Acronym,
            Credits: subject.Credits,
            HistoricFlag:
              subject.HistoricFlag === 2
                ? HistoricFlag(subject.Requirements, json)
                : subject.HistoricFlag,
            Requirements: subject.Requirements.length
              ? ProcessRequirements(subject.Requirements, json)
              : [],
          };

          perCred[subject.Period - 1] =
            parseInt(perCred[subject.Period - 1]) + parseInt(subject.Credits);

          if (subject.HistoricFlag === 0) totCred = totCred + subject.Credits;
          if (subject.HistoricFlag === 1) cred = cred + subject.Credits;

          req[subject.Period - 1].push(sub);
        });
        setPeriodCredit(perCred);
        setRequirements(req);
      }

      setTotalCredits(totCred);
      setCredits(cred);
    };

    sendRequest();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Quadro de Pré/Co-Requisitos</h1>
        <div />
      </div>

      <div className={styles.credits}>
        <b>Total de Créditos Aprovados:</b> {totalCredits}
        <b style={{ marginLeft: '350px' }}>
          Total de Créditos Matriculados:
        </b>{' '}
        {credits}
      </div>

      <table className={styles.table}>
        {requirements.length &&
          requirements.map((subject, index) => {
            if (subject.length) {
              return (
                <tr key={index}>
                  <td width={100}>
                    <b>P{index + 1}</b>
                    <p>({periodCredit[index]} crd)</p>
                  </td>

                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {subject.map((value) => (
                        <div>
                          <div
                            key={value.disciplina}
                            className={styles.disciplina}
                            style={{
                              backgroundColor:
                                value.HistoricFlag === 0
                                  ? '#c0ffaa'
                                  : value.HistoricFlag === 1
                                  ? '#fdff97'
                                  : value.HistoricFlag === 2
                                  ? '#abd6ff'
                                  : '#c4c4c4',
                              marginBottom:
                                value.Requirements.length > 0 && '0px',
                              borderBottomRightRadius:
                                value.Requirements.length > 0 && '0px',
                              borderBottomLeftRadius:
                                value.Requirements.length > 0 && '0px',
                              borderBottom:
                                value.Requirements.length > 0 && 'none',
                            }}
                          >
                            <p>{value.Acronym}</p>
                            <p>({value.Credits} crd)</p>
                          </div>

                          {value.Requirements.length > 0 && (
                            <div
                              style={{
                                border: '1px solid #666666',
                                borderBottomRightRadius: '5px',
                                borderBottomLeftRadius: '5px',
                                margin: '15px',
                                marginTop: '0px',
                                width: '167px',
                              }}
                            >
                              {value.Requirements.map((requisito) => (
                                <div className={styles.requisitos}>
                                  {requisito.situation === 'ok' && (
                                    <img
                                      src={check}
                                      alt="Icone representado Ok!"
                                    />
                                  )}
                                  <p>{requisito.Acronym}</p>
                                  <p>({requisito.HistoricFlag} )</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            } else return null;
          })}
      </table>

      <div className={styles.subtitle}>
        <h2>Legenda de Pré/Co-Requisitos</h2>
        <div className={styles.line} />

        <p>
          <b>Pré I - </b>Disciplinas que são definidas como pré-requisitos nível
          I de outra disciplina deverão ter sido cursadas anteriormente pelo
          estudante, com aproveitamento de frequência e nota.
        </p>

        <p>
          <b>Pré II - </b>Disciplinas que são definidas como pré-requisitos
          nível II de outra disciplina deverão ter sido cursadas anteriormente
          pelo estudante, com aproveitamento de frequência.
        </p>

        <p>
          <b>Co - </b>Disciplinas que são co-requisitos de outra disciplina
          deverão ter sido cursadas anteriormente pelo estudante, com
          aproveitamento de frequência e nota, ou concomitantemente.
        </p>

        <h2 style={{ marginTop: '20px' }}>Legenda de Cores</h2>
        <div className={styles.line} />

        <div style={{ display: 'flex' }}>
          <div
            className={styles.colors}
            style={{ backgroundColor: '#c0ffaa' }}
          ></div>
          <p>Disciplina aprovada</p>

          <div
            className={styles.colors}
            style={{ backgroundColor: '#fdff97' }}
          ></div>
          <p>Disciplina em curso no semestre</p>

          <div
            className={styles.colors}
            style={{ backgroundColor: '#abd6ff' }}
          ></div>
          <p>Disciplina não possui restrição de Pré-Requisitos I ou II</p>

          <div
            className={styles.colors}
            style={{ backgroundColor: '#c4c4c4' }}
          ></div>
          <p>Disciplina possui restrição de Pré-Requisitos I ou II</p>
        </div>
      </div>
    </div>
  );
};

Requirements.propTypes = {
  studentInfo: PropTypes.object,
};

export default Requirements;
