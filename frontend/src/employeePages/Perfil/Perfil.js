import React from 'react';

import student from '../../assets/icons/reading-book.svg';

import styles from './styles.module.css';

const EmployeePerfil = () => {
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
                  <td style={{ fontWeight: '800' }}>Funcionário:</td>
                  <td>Lucas Silva</td>
                </tr>

                <tr>
                  <td style={{ fontWeight: '800' }}>E-mail:</td>
                  <td>lucas@inatel.br</td>
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
                <input />
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: '800' }}>Nova Senha:</td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: '800' }}>Confirmar Senha:</td>
              <td>
                <input />
              </td>
            </tr>
          </table>

          <div>
            <button>ALTERAR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePerfil;
