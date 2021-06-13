import React, { useEffect, useState } from 'react';

import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';

import useFetch from '../../hooks/useFetch';
import {
  GET_ALL_SUBJECTS,
  POST_CREATE_REPLACEMENT,
  GET_CLASS,
} from '../../service/api';

import styles from './styles.module.css';

const Replacement = () => {
  const [subject, setSubject] = useState();
  const [classParam, setClassParam] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [place, setPlace] = useState();
  const [classId, setClassId] = useState();

  const [allSubjects, setAllSubjects] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [allClassId, setAllClassId] = useState();

  const allLocal = ['I-1', 'I-2', 'I-3', 'I-4', 'I-5', 'I-6', 'I-7'];

  const [create, setCreate] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const { request } = useFetch();

  useEffect(() => {
    const getAllSubjects = async () => {
      const { url: url, config: config } = GET_ALL_SUBJECTS();

      const { json, error } = await request(url, config);

      if (json?.length) {
        const subjects = [];

        json.forEach((sub) => {
          subjects.push(sub.Acronym);
        });

        setAllSubjects(subjects);
        setAllClassId(json);

        setSubject(subjects[0]);
      }
    };

    getAllSubjects();
  }, []);

  useEffect(async () => {
    if (subject) {
      const getClass = async (id) => {
        const { url: url, config: config } = GET_CLASS(id);

        const { json, error } = await request(url, config);

        if (json?.acronym) {
          return json.classParam;
        }

        return null;
      };

      const classesId = allClassId.filter((sub) => subject === sub.Acronym)[0]
        .Classes;

      const classes = await Promise.all(
        classesId.map(async (value) => {
          return {
            classId: value.ClassId,
            classParam: await getClass(value.ClassId),
          };
        })
      );

      setClassParam(classes[0]?.classParam);
      setClassId(
        classes.filter(
          (value) => classes[0]?.classParam === value.classParam
        )[0]?.classId
      );
      setAllClasses(classes);
    }
  }, [subject]);

  useEffect(() => {
    if (create) {
      if (subject && classParam && date && time && place && classId) {
        const bodyData = {
          classId: classId,
          acronym: subject,
          classParam: classParam,
          date: date,
          hour: time,
          room: place,
        };

        const createReplacement = async () => {
          const { url: url, config: config } =
            POST_CREATE_REPLACEMENT(bodyData);

          const { json, error } = await request(url, config);

          if (!error) {
            setMessage(0);
            setShowModal(true);
          } else {
            setMessage(1);
            setShowModal(true);
          }
        };
        createReplacement();
      } else {
        setMessage(2);
        setShowModal(true);
      }
      setCreate(false);
    }
  }, [create]);

  return (
    <div className={styles.registrationContainer} style={{ height: '380px' }}>
      <p className={styles.registrationTitle}>Reposição de Aula</p>
      <table style={{ height: '100%' }}>
        <tr>
          <td>Matéria:</td>
          <td>
            <select onChange={(value) => setSubject(value.target.value)}>
              {allSubjects.map((sub) => (
                <option value={sub}>{sub}</option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td>Turma:</td>
          <td>
            <select
              onChange={(value) => {
                setClassParam(value.target.value);
                setClassId(
                  allClasses.filter(
                    (value) => value.target.value === value.classParam
                  )[0].classId
                );
              }}
            >
              {allClasses.map((param) => (
                <option value={param.classParam}>{param.classParam}</option>
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
            <select onChange={(value) => setPlace(value.target.value)}>
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
              <p className={styles.created}>Reposição criada com sucesso!</p>
            ) : message === 1 ? (
              <p className={styles.error}>
                Não foi possível criar a reposição!
              </p>
            ) : (
              <p className={styles.errorInfo}>Preencha todas as informações!</p>
            )}

            <Button title="FECHAR" onClick={() => setShowModal(false)} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Replacement;
