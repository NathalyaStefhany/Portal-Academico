import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import logoInatel from '../../assets/images/Inatel Branco.png';
import logout from '../../assets/icons/logout.svg';

import styles from './styles.module.css';

const Navbar = () => {
  const [fontColor, setFontColor] = useState('home');
  const [classIsOpen, setClassIsOpen] = useState(false);
  const [matIsOpen, setMatIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <img src={logoInatel} alt="Logo branco do Inatel" />

      <ul className={styles.nav}>
        <li className={styles.item}>
          <Link
            to="/aluno"
            onClick={() => {
              setFontColor('home');
              setClassIsOpen(false);
              setMatIsOpen(false);
            }}
            style={{ color: fontColor === 'home' ? '#ff961a' : '#ffffff' }}
          >
            Home
          </Link>
        </li>

        <li className={styles.item}>
          <Link
            to=""
            onClick={() => {
              setFontColor('aulas');
              setClassIsOpen(!classIsOpen);
              setMatIsOpen(false);
            }}
            style={{ color: fontColor === 'aulas' ? '#ff961a' : '#ffffff' }}
          >
            Aulas
          </Link>

          {classIsOpen && (
            <>
              <div className={styles.arrow} />
              <div className={styles.dropdown}>
                <Link
                  to="/aluno/material"
                  className={styles.menuItem}
                  onClick={() => setClassIsOpen(false)}
                >
                  Material de Aula
                </Link>

                <Link
                  to="/aluno/horarioAula"
                  className={styles.menuItem}
                  onClick={() => setClassIsOpen(false)}
                >
                  Horário das Aulas
                </Link>

                <Link
                  to="/aluno/horarioAtendimento"
                  className={styles.menuItem}
                  onClick={() => setClassIsOpen(false)}
                >
                  Horário de Atendimento
                </Link>

                <Link
                  to="/aluno/reposicao"
                  className={styles.menuItem}
                  onClick={() => setClassIsOpen(false)}
                >
                  Reposição de Aula
                </Link>

                <Link
                  to="/aluno/provas"
                  className={styles.menuItem}
                  onClick={() => setClassIsOpen(false)}
                >
                  Calendário de Provas
                </Link>

                <Link
                  to="/aluno/notas"
                  className={styles.menuItem}
                  onClick={() => setClassIsOpen(false)}
                >
                  Notas
                </Link>

                <Link
                  to="/aluno/frequencia"
                  className={styles.menuItem}
                  onClick={() => setClassIsOpen(false)}
                >
                  Frequência
                </Link>
              </div>
            </>
          )}
        </li>

        <li className={styles.item}>
          <Link
            to=""
            onClick={() => {
              setFontColor('matricula');
              setClassIsOpen(false);
              setMatIsOpen(!matIsOpen);
            }}
            style={{ color: fontColor === 'matricula' ? '#ff961a' : '#ffffff' }}
          >
            Matrícula
          </Link>

          {matIsOpen && (
            <>
              <div className={styles.arrow} />
              <div className={styles.dropdown}>
                <Link
                  to="/aluno/matricula"
                  className={styles.menuItem}
                  onClick={() => setClassIsOpen(false)}
                >
                  Matrícula
                </Link>

                <Link
                  to="/aluno/requisitos"
                  className={styles.menuItem}
                  onClick={() => setClassIsOpen(false)}
                >
                  Quadro de Pré/Co-Requisitos
                </Link>

                <Link
                  to="/aluno/historico"
                  className={styles.menuItem}
                  onClick={() => setClassIsOpen(false)}
                >
                  Histórico
                </Link>

                <Link
                  to="/aluno/coeficiente"
                  className={styles.menuItem}
                  onClick={() => setClassIsOpen(false)}
                >
                  Coeficiente Acadêmico
                </Link>
              </div>
            </>
          )}
        </li>

        <li className={styles.item}>
          <Link
            to="/aluno/perfil"
            onClick={() => {
              setFontColor('perfil');
              setClassIsOpen(false);
              setMatIsOpen(false);
            }}
            style={{ color: fontColor === 'perfil' ? '#ff961a' : '#ffffff' }}
          >
            Perfil
          </Link>
        </li>

        <li className={styles.logout}>
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
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
