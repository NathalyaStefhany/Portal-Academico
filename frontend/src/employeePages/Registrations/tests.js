import React, { useEffect, useState } from 'react';

import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';

import useFetch from '../../hooks/useFetch';
import {
  GET_ALL_SUBJECTS,
  GET_CLASS,
  PUT_CREATE_TEST,
} from '../../service/api';

import styles from './styles.module.css';

const Tests = () => {
  const [acronym, setAcronym] = useState();
  const [classParam, setClassParam] = useState();
  const [testName, setTestName] = useState('NP1');
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [local, setLocal] = useState('I-1');

  const [create, setCreate] = useState(false);

  const allTestsName = ['NP1', 'NP2', 'NP3', 'NL1', 'NL2', 'NL3'];
  const allLocal = ['I-1', 'I-2', 'I-3', 'I-4', 'I-5', 'I-6', 'I-7'];

  const { request } = useFetch();

  const [allSubjects, setAllSubjects] = useState([]);
  const [allClasses, setAllClasses] = useState([]);

  let firstClass = '';

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const sendRequest = async () => {
      const { url: url, config: config } = GET_ALL_SUBJECTS();

      const { json, error } = await request(url, config);

      if (!error) {
        const allSub = json.filter((subject) => subject.Classes.length);

        setAllSubjects(allSub);

        setAcronym(json.length ? allSub[0].Acronym : null);
      }
    };

    sendRequest();
  }, []);

  useEffect(() => {
    if (acronym) {
      firstClass = '';

      const sendRequest = async () => {
        const classes = allSubjects.filter(
          (value) => value.Acronym === acronym
        )[0].Classes;

        setAllClasses(
          await Promise.all(
            classes.map(async (classId, index) => {
              const { url: url, config: config } = GET_CLASS(classId.ClassId);

              const { json, error } = await request(url, config);

              if (index === 0) firstClass = json.classParam;

              if (!error) {
                return json.classParam;
              } else return null;
            })
          )
        );

        if (!classes.length) setAllClasses(['']);

        setClassParam(firstClass);
      };

      sendRequest();
    }
  }, [acronym]);

  useEffect(() => {
    if (create) {
      if (acronym && testName && date && time && local) {
        const bodyData = {
          acronym: acronym,
          classParam: classParam,
          testName: testName,
          date: date,
          time: time,
          local: local,
        };

        const createTest = async () => {
          const { url: url, config: config } = PUT_CREATE_TEST(bodyData);

          const { json, error } = await request(url, config);

          if (!error) {
            setMessage(0);
            setShowModal(true);
          } else {
            setMessage(1);
            setShowModal(true);
          }
        };

        createTest();
      } else {
        setMessage(2);
        setShowModal(true);
      }
      setCreate(false);
    }
  }, [create]);

  return (
    <div className={styles.registrationContainer} style={{ height: '380px' }}>
      <p className={styles.registrationTitle}>Provas</p>
      <table style={{ height: '100%' }}>
        <tr>
          <td>Matéria:</td>
          <td>
            <select onChange={(value) => setAcronym(value.target.value)}>
              {allSubjects?.length &&
                allSubjects.map((subject) => (
                  <option value={subject.Acronym}>{subject.Acronym}</option>
                ))}
            </select>
          </td>
        </tr>
        <tr>
          <td>Turma:</td>
          <td>
            <select disabled={allClasses[0] === ''}>
              {allClasses?.length &&
                allClasses.map((value) => (
                  <option value={value}>{value}</option>
                ))}
            </select>
          </td>
        </tr>
        <tr>
          <td>Prova:</td>
          <td>
            <select onChange={(value) => setTestName(value.target.value)}>
              {allTestsName.map((test) => (
                <option value={test}>{test}</option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td>Data:</td>
          <td>
            <input
              type="date"
              onChange={(value) => setDate(value.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>Horário:</td>
          <td>
            <input
              type="time"
              onChange={(value) => setTime(value.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>Local:</td>
          <td>
            <select onChange={(value) => setLocal(value.target.value)}>
              {allLocal.map((loc) => (
                <option value={loc}>{loc}</option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td></td>
          <td style={{ height: '100%', paddingBottom: '50px' }}>
            <Button title="CONFIRMAR" onClick={() => setCreate(true)} />
          </td>
        </tr>
      </table>

      {showModal && (
        <Modal height="150px">
          <div className={styles.modal}>
            {message === 0 ? (
              <p className={styles.created}>Prova criada com sucesso!</p>
            ) : message === 1 ? (
              <p className={styles.error}>
                Não foi possível criar a prova. Prova já existe!
              </p>
            ) : (
              <p className={styles.errorInfo}>
                Preencha todas as informações da prova!
              </p>
            )}

            <Button title="FECHAR" onClick={() => setShowModal(false)} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Tests;
