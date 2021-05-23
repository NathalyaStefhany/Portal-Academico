import React from 'react';

import Button from '../../components/Button/Button';

import styles from './styles.module.css';

const Registrations = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Cadastros</h1>
        <div />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '50px',
        }}
      >
        <div style={{ display: 'flex' }}>
          <div className={styles.registrationContainer}>
            <p className={styles.registrationTitle}>Alunos</p>
            <table style={{ height: '100%' }}>
              <tr>
                <td>Nome:</td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>E-mail:</td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>Matrícula:</td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>Senha:</td>
                <td>
                  <input type="password" autoComplete="new-password" />
                </td>
              </tr>
              <tr>
                <td></td>
                <td style={{ height: '100%', paddingBottom: '50px' }}>
                  <Button title="CONFIRMAR" />
                </td>
              </tr>
            </table>
          </div>

          <div className={styles.registrationContainer}>
            <p className={styles.registrationTitle}>Professores</p>
            <table style={{ height: '100%' }}>
              <tr>
                <td>Nome:</td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>E-mail:</td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>Senha:</td>
                <td>
                  <input type="password" autoComplete="new-password" />
                </td>
              </tr>
              <tr>
                <td></td>
                <td style={{ height: '100%', paddingBottom: '10px' }}>
                  <Button title="CONFIRMAR" />
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div
            className={styles.registrationContainer}
            style={{ height: '380px' }}
          >
            <p className={styles.registrationTitle}>Provas</p>
            <table style={{ height: '100%' }}>
              <tr>
                <td>Matéria:</td>
                <td>
                  <select>
                    <option value="L1">C210</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Turma:</td>
                <td>
                  <select>
                    <option value="L1">L1</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Prova:</td>
                <td>
                  <select>
                    <option value="NP1">NP1</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Data:</td>
                <td>
                  <input type="date" />
                </td>
              </tr>
              <tr>
                <td>Horário:</td>
                <td>
                  <input type="time" />
                </td>
              </tr>
              <tr>
                <td>Local:</td>
                <td>
                  <select>
                    <option value="I-17">I-17</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td></td>
                <td style={{ height: '100%', paddingBottom: '50px' }}>
                  <Button title="CONFIRMAR" />
                </td>
              </tr>
            </table>
          </div>

          <div
            className={styles.registrationContainer}
            style={{ height: '380px' }}
          >
            <p className={styles.registrationTitle}>Reposição de Aula</p>
            <table style={{ height: '100%' }}>
              <tr>
                <td>Matéria:</td>
                <td>
                  <select>
                    <option value="L1">C210</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Turma:</td>
                <td>
                  <select>
                    <option value="L1">L1</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Professor:</td>
                <td>
                  <select>
                    <option value="Renzo">Renzo</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Data:</td>
                <td>
                  <input type="date" />
                </td>
              </tr>
              <tr>
                <td>Horário:</td>
                <td>
                  <input type="time" />
                </td>
              </tr>
              <tr>
                <td>Local:</td>
                <td>
                  <select>
                    <option value="I-17">I-17</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td></td>
                <td style={{ height: '100%', paddingBottom: '50px' }}>
                  <Button title="CONFIRMAR" />
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div
            className={styles.registrationContainer}
            style={{ height: '380px' }}
          >
            <p className={styles.registrationTitle}>Horário de Aula</p>
            <table style={{ height: '100%' }}>
              <tr>
                <td>Matéria:</td>
                <td>
                  <select>
                    <option value="L1">C210</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Turma:</td>
                <td>
                  <select>
                    <option value="L1">L1</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Professor:</td>
                <td>
                  <select>
                    <option value="NP1">NP1</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Dia:</td>
                <td>
                  <select>
                    <option>Segunda</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Horário:</td>
                <td>
                  <input type="time" />
                </td>
              </tr>
              <tr>
                <td>Local:</td>
                <td>
                  <select>
                    <option value="I-17">I-17</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td></td>
                <td style={{ height: '100%', paddingBottom: '50px' }}>
                  <Button title="CONFIRMAR" />
                </td>
              </tr>
            </table>
          </div>

          <div
            className={styles.registrationContainer}
            style={{ height: '380px' }}
          >
            <p className={styles.registrationTitle}>Horário de Atendimento</p>
            <table style={{ height: '100%' }}>
              <tr>
                <td>Matéria:</td>
                <td>
                  <select>
                    <option value="L1">C210</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Turma:</td>
                <td>
                  <select>
                    <option value="L1">L1</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Professor:</td>
                <td>
                  <select>
                    <option value="Renzo">Renzo</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Dia:</td>
                <td>
                  <select>
                    <option value="Segunda">Segunda</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Horário:</td>
                <td>
                  <input type="time" />
                </td>
              </tr>
              <tr>
                <td>Local:</td>
                <td>
                  <select>
                    <option value="I-17">I-17</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td></td>
                <td style={{ height: '100%', paddingBottom: '50px' }}>
                  <Button title="CONFIRMAR" />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registrations;