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
};

export default Layout;
