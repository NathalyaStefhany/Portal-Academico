import React from 'react';
import { Link } from 'react-router-dom';

import logoInatel from '../../assets/images/Inatel Branco.png';
import logout from '../../assets/icons/logout.svg';

import styles from './styles.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <img src={logoInatel} alt="Logo branco do Inatel" />

      <Link to="/aluno">Home</Link>
      <Link to="/aulas">Aulas</Link>
      <Link to="/matricula">Matrícula</Link>
      <Link to="/perfil">Perfil</Link>

      <div className={styles.logout}>
        <img src={logout} alt="Icone de logout" />
        <Link to="/">Sair</Link>
      </div>
    </div>
  );
};

export default Header;
