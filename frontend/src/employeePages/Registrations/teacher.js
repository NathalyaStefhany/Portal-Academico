import React, { useEffect, useState } from 'react';

import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';

import useFetch from '../../hooks/useFetch';
import { POST_CREATE_TEACHER } from '../../service/api';

import styles from './styles.module.css';

const Teacher = () => {
  const [name, setName] = useState();
  const [birthDate, setBirthDate] = useState();
  const [number, setNumber] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [create, setCreate] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const { request } = useFetch();

  useEffect(() => {
    if (create) {
      if (name && birthDate && number && email && password) {
        const bodyData = {
          employeeNumber: parseInt(number),
          name: name,
          email: email,
          birthDate: birthDate,
          password: password,
        };

        const createTeacher = async () => {
          const { url: url, config: config } = POST_CREATE_TEACHER(bodyData);

          const { json, error } = await request(url, config);

          if (!error) {
            setMessage(0);
            setShowModal(true);
          } else {
            setMessage(1);
            setShowModal(true);
          }
        };

        createTeacher();
      } else {
        setMessage(2);
        setShowModal(true);
      }
      setCreate(false);
    }
  }, [create]);

  return (
    <div className={styles.registrationContainer}>
      <p className={styles.registrationTitle}>Professores</p>
      <table style={{ height: '100%' }}>
        <tr>
          <td>Nome:</td>
          <td>
            <input
              type="text"
              onChange={(value) => setName(value.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>Data de Nascimento:</td>
          <td>
            <input
              type="date"
              onChange={(value) => setBirthDate(value.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>Número de id.:</td>
          <td>
            <input
              type="text"
              onChange={(value) => setNumber(value.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>E-mail:</td>
          <td>
            <input
              type="text"
              onChange={(value) => setEmail(value.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>Senha:</td>
          <td>
            <input
              type="password"
              autoComplete="new-password"
              onChange={(value) => setPassword(value.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td
            style={{
              height: '100%',
              paddingTop: '30px',
            }}
          >
            <Button title="CONFIRMAR" onClick={() => setCreate(true)} />
          </td>
        </tr>
      </table>

      {showModal && (
        <Modal height="150px">
          <div className={styles.modal}>
            {message === 0 ? (
              <p className={styles.created}>Professor criado com sucesso!</p>
            ) : message === 1 ? (
              <p className={styles.error}>
                Não foi possível criar o professor. Número de id. já existe!
              </p>
            ) : (
              <p className={styles.errorInfo}>
                Preencha todas as informações do professor!
              </p>
            )}

            <Button title="FECHAR" onClick={() => setShowModal(false)} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Teacher;
