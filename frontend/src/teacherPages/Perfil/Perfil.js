import React, { useState } from 'react';
import PropTypes from 'prop-types';

import student from '../../assets/icons/reading-book.svg';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';

import useFetch from '../../hooks/useFetch';
import { POST_TEACHER_UPDATE_PASSWORD } from '../../service/api';

import styles from './styles.module.css';

const TeacherPerfil = ({ teacherInfo }) => {
  const [password, setPassword] = useState();
  const [newPassword1, setNewPassword1] = useState();
  const [newPassword2, setNewPassword2] = useState();

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const { request } = useFetch();

  const changePassword = () => {
    if (newPassword1 === newPassword2) {
      const update = async () => {
        const bodyData = {
          employeeNumber: teacherInfo.employeeNumber,
          password: password,
          passwordUpdated: newPassword1,
        };

        const { url: url, config: config } =
          POST_TEACHER_UPDATE_PASSWORD(bodyData);

        const { json, error } = await request(url, config);

        if (!error && !json.Error) {
          setMessage(0);
          setShowModal(true);
        } else {
          setMessage(1);
          setShowModal(true);
        }
      };

      update();
    } else {
      setMessage(2);
      setShowModal(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Perfil</h1>
        <div />
      </div>

      <div style={{ display: 'flex' }}>
        <div className={styles.infos}>
          <table>
            <tr>
              <td>
                <img src={student} alt="Estudante lendo um livro" />
              </td>

              <td>
                <tr>
                  <td style={{ fontWeight: '800' }}>Professor:</td>
                  <td>{teacherInfo.name}</td>
                </tr>

                <tr>
                  <td style={{ fontWeight: '800' }}>E-mail:</td>
                  <td>{teacherInfo.email}</td>
                </tr>
              </td>
            </tr>
          </table>
        </div>

        <div className={styles.password}>
          <h1>Alterar Senha</h1>

          <table>
            <tr>
              <td style={{ fontWeight: '800' }}>Senha Antiga:</td>
              <td>
                <input
                  type="password"
                  onChange={(value) => setPassword(value.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: '800' }}>Nova Senha:</td>
              <td>
                <input
                  type="password"
                  onChange={(value) => setNewPassword1(value.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: '800' }}>Confirmar Senha:</td>
              <td>
                <input
                  type="password"
                  onChange={(value) => setNewPassword2(value.target.value)}
                />
              </td>
            </tr>
          </table>

          <div>
            <button onClick={changePassword}>ALTERAR</button>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal height="150px">
          <div className={styles.modal}>
            {message === 0 ? (
              <p className={styles.created}>Senha atualizada com sucesso!</p>
            ) : message === 1 ? (
              <p className={styles.error}>
                Não foi possível atualizar a senha!
              </p>
            ) : (
              <p className={styles.errorInfo}>Senhas diferentes!</p>
            )}

            <Button title="FECHAR" onClick={() => setShowModal(false)} />
          </div>
        </Modal>
      )}
    </div>
  );
};

TeacherPerfil.PropTypes = {
  teacherInfo: PropTypes.object,
};

export default TeacherPerfil;
