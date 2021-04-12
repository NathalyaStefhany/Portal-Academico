import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.service}>
        <h1>Serviços Acadêmicos</h1>

        <Link to="material">Material de Aula</Link>
        <p>Apresenta o material de aula publicado pelo docente</p>

        <Link to="notas">Notas</Link>
        <p>Apresenta as notas do semestre</p>

        <Link to="frequencia">Frequência</Link>
        <p>Apresenta a frequência do semestre</p>

        <Link to="historico">Histórico</Link>
        <p>Apresenta o histórico escolar do aluno</p>

        <Link to="coeficiente">Coeficiente Acadêmico</Link>
        <p>Apresenta os coeficientes de todos os semestres</p>
      </div>

      <div className={styles.calendar}>
        <h1>Calendários e Horários</h1>

        <Link to="horarioAula">Quadro de Horários do Semestre</Link>
        <p>Apresenta o horário de aula do aluno no semestre</p>

        <Link to="horarioAtendimento">Horário de Atendimento</Link>
        <p>Apresenta o horário de atendimento dos professores e monitores</p>

        <Link to="provas">Provas</Link>
        <p>Apresenta o calendário de provas</p>

        <Link to="reposicao">Reposição de Aula</Link>
        <p>Apresenta o calendário de reposição de aulas</p>
      </div>

      <div className={styles.matriculation}>
        <h1>Matrícula</h1>

        <Link to="matricula">Matrícula</Link>
        <p>Acessa o módulo da matrícula</p>

        <Link to="requisitos">Quadro de Pré/Co-Requisitos</Link>
        <p>Acessa o quadro de Pré/Co-Requisitos das disciplinas do aluno</p>
      </div>
    </div>
  );
};

export default Home;
