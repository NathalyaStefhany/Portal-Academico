import React, { useEffect, useState } from 'react';

import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';

import useFetch from '../../hooks/useFetch';
import { POST_CREATE_STUDENT } from '../../service/api';

import styles from './styles.module.css';

const Student = () => {
  const [name, setName] = useState();
  const [matriculationNumber, setMatriculationNumber] = useState();
  const [course, setCourse] = useState('GEC');
  const [cpf, setCpf] = useState();
  const [birthDate, setBirthDate] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [create, setCreate] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const { request } = useFetch();

  useEffect(() => {
    if (create) {
      if (
        name &&
        matriculationNumber &&
        course &&
        cpf &&
        birthDate &&
        email &&
        password
      ) {
        const bodyData = {
          matriculationNumber: matriculationNumber,
          course: course,
          name: name,
          email: email,
          birthDate: birthDate,
          cpf: cpf,
          password: password,
        };

        const createStudent = async () => {
          const { url: url, config: config } = POST_CREATE_STUDENT(bodyData);

          const { json, error } = await request(url, config);

          if (!error) {
            setMessage(0);
            setShowModal(true);
          } else {
            setMessage(1);
            setShowModal(true);
          }
        };
        createStudent();
      } else {
        setMessage(2);
        setShowModal(true);
      }
      setCreate(false);
    }
  }, [create]);

  return (
    <div className={styles.registrationContainer}>
      <p className={styles.registrationTitle}>Alunos</p>
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
          <td>Matrícula:</td>
          <td>
            <input
              type="text"
              onChange={(value) =>
                setMatriculationNumber(parseInt(value.target.value))
              }
            />
          </td>
        </tr>
        <tr>
          <td>Curso:</td>
          <td>
            <select onChange={(value) => setCourse(value.target.value)}>
              <option value="GEC">Engenharia de Computação</option>
              <option value="GEA">Engenharia de Automação</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>CPF:</td>
          <td>
            <input
              type="text"
              onChange={(value) => setCpf(value.target.value)}
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
          <td style={{ height: '100%', paddingBottom: '50px' }}>
            <Button title="CONFIRMAR" onClick={() => setCreate(true)} />
          </td>
        </tr>
      </table>

      {showModal && (
        <Modal height="150px">
          <div className={styles.modal}>
            {message === 0 ? (
              <p className={styles.created}>Aluno criado com sucesso!</p>
            ) : message === 1 ? (
              <p className={styles.error}>
                Não foi possível criar o aluno. Matrícula já existe!
              </p>
            ) : (
              <p className={styles.errorInfo}>
                Preencha todas as informações do aluno!
              </p>
            )}

            <Button title="FECHAR" onClick={() => setShowModal(false)} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Student;
