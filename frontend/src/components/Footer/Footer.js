import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

const Footer = ({ studentInfo, teacherInfo, employeeInfo }) => {
  const date = new Date();

  const semester = date.getMonth() < 5 ? '1º' : '1º';
  const year = date.getFullYear();

  return (
    <div className={styles.footer}>
      {studentInfo && (
        <p>
          {semester} Semestre de {year} - {studentInfo.name} (
          {studentInfo.matriculationNumber}) - {studentInfo.course}
        </p>
      )}

      {teacherInfo && (
        <p>
          {semester} Semestre de {year} - Prof. {teacherInfo.name} (
          {teacherInfo.employeeNumber})
        </p>
      )}

      {employeeInfo && (
        <p>
          {semester} Semestre de {year} - {employeeInfo.name} (
          {employeeInfo.employeeNumber})
        </p>
      )}
    </div>
  );
};

Footer.propTypes = {
  studentInfo: PropTypes.object,
  teacherInfo: PropTypes.object,
  employeeInfo: PropTypes.object,
};

export default Footer;
