import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import styles from './styles.module.css';

const Layout = ({ children, isAuthenticated, setIsAuthenticated }) => {
  return (
    <>
      {isAuthenticated.student ||
      isAuthenticated.teacher ||
      isAuthenticated.employee ? (
        <div className={styles.container}>
          <Header isAuthenticated={isAuthenticated} />

          {children}

          <Footer />
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
};

export default Layout;
