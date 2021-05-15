import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import logoInatel from '../../assets/images/Inatel Branco.png';
import logout from '../../assets/icons/logout.svg';

import styles from './styles.module.css';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const [fontColor, setFontColor] = useState('home');

  return (
    <div className={styles.header}>
      <img src={logoInatel} alt="Logo branco do Inatel" />

      {isAuthenticated.student && (
        <>
          <Link
            to="/aluno"
            className={styles.navbar}
            onClick={() => setFontColor('home')}
            style={{ color: fontColor === 'home' ? '#ff961a' : '#ffffff' }}
          >
            Home
          </Link>
          <Link
            to="/aulas"
            className={styles.navbar}
            onClick={() => setFontColor('aulas')}
            style={{ color: fontColor === 'aulas' ? '#ff961a' : '#ffffff' }}
          >
            Aulas
          </Link>
          <Link
            to="/matricula"
            className={styles.navbar}
            onClick={() => setFontColor('matricula')}
            style={{ color: fontColor === 'matricula' ? '#ff961a' : '#ffffff' }}
          >
            Matrícula
          </Link>

          <Link
            to="/aluno/perfil"
            className={styles.navbar}
            onClick={() => setFontColor('perfil')}
            style={{ color: fontColor === 'perfil' ? '#ff961a' : '#ffffff' }}
          >
            Perfil
          </Link>
        </>
      )}

      {isAuthenticated.teacher && (
        <>
          <Link
            to="/professor"
            className={styles.navbar}
            onClick={() => setFontColor('home')}
            style={{ color: fontColor === 'home' ? '#ff961a' : '#ffffff' }}
          >
            Horário
          </Link>
          <Link
            to="/professor/material"
            className={styles.navbar}
            onClick={() => setFontColor('material')}
            style={{ color: fontColor === 'material' ? '#ff961a' : '#ffffff' }}
          >
            Material de Aula
          </Link>
          <Link
            to="/professor/notas"
            className={styles.navbar}
            onClick={() => setFontColor('notas')}
            style={{ color: fontColor === 'notas' ? '#ff961a' : '#ffffff' }}
          >
            Notas
          </Link>

          <Link
            to="/professor/frequencia"
            className={styles.navbar}
            onClick={() => setFontColor('frequencia')}
            style={{
              color: fontColor === 'frequencia' ? '#ff961a' : '#ffffff',
            }}
          >
            Frequência
          </Link>

          <Link
            to="/professor/perfil"
            className={styles.navbar}
            onClick={() => setFontColor('perfil')}
            style={{ color: fontColor === 'perfil' ? '#ff961a' : '#ffffff' }}
          >
            Perfil
          </Link>
        </>
      )}

      {isAuthenticated.employee && (
        <>
          <Link
            to="/funcionario"
            className={styles.navbar}
            onClick={() => setFontColor('home')}
            style={{ color: fontColor === 'home' ? '#ff961a' : '#ffffff' }}
          >
            Casdastros
          </Link>

          <Link
            to="/funcionario/perfil"
            className={styles.navbar}
            onClick={() => setFontColor('perfil')}
            style={{ color: fontColor === 'perfil' ? '#ff961a' : '#ffffff' }}
          >
            Perfil
          </Link>
        </>
      )}

      <div className={styles.logout}>
        <img src={logout} alt="Icone de logout" />
        <Link
          to="/"
          onClick={() =>
            setIsAuthenticated({
              student: false,
              teacher: false,
              employee: false,
            })
          }
        >
          Sair
        </Link>
      </div>
    </div>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Header;
