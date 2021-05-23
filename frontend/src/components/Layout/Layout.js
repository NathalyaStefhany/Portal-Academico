import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import styles from './styles.module.css';

const Layout = ({
  children,
  isAuthenticated,
  setIsAuthenticated,
  studentInfo,
  teacherInfo,
  employeeInfo,
  setStudentInfo,
  setTeacherInfo,
  setEmployeeInfo,
}) => {
  return (
    <>
      {isAuthenticated.student ||
      isAuthenticated.teacher ||
      isAuthenticated.employee ? (
        <div className={styles.container}>
          <Header
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            setStudentInfo={setStudentInfo}
            setTeacherInfo={setTeacherInfo}
            setEmployeeInfo={setEmployeeInfo}
          />

          {children}

          <Footer
            studentInfo={studentInfo}
            teacherInfo={teacherInfo}
            employeeInfo={employeeInfo}
          />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
  studentInfo: PropTypes.object,
  teacherInfo: PropTypes.object,
  employeeInfo: PropTypes.object,
  setStudentInfo: PropTypes.func.isRequired,
  setTeacherInfo: PropTypes.func.isRequired,
  setEmployeeInfo: PropTypes.func.isRequired,
};

export default Layout;
