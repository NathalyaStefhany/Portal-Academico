import React, { Children } from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import styles from './styles.module.css';

const Layout = ({ children, isAuthenticated }) => {
  return (
    <>
      {isAuthenticated ? (
        <div className={styles.container}>
          <Header />

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
};

export default Layout;
