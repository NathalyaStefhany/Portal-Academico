import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

const Footer = ({ studentInfo }) => {
  const date = new Date();

  const semester = date.getMonth() < 5 ? '1º' : '1º';
  const year = date.getFullYear();

  return (
    <div className={styles.footer}>
      <p>
        {semester} Semestre de {year} - {studentInfo.name} (
        {studentInfo.matriculationNumber}) - {studentInfo.course}
      </p>
    </div>
  );
};

Footer.propTypes = {
  studentInfo: PropTypes.object,
};

export default Footer;
