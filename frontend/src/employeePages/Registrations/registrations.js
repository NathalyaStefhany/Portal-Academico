import React from 'react';

import Button from '../../components/Button/Button';
import Student from './student';
import Teacher from './teacher';
import Tests from './tests';
import Replacement from './replacement';

import styles from './styles.module.css';

const Registrations = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Cadastros</h1>
        <div />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '50px',
        }}
      >
        <div style={{ display: 'flex' }}>
          <Student />

          <Teacher />
        </div>

        <div style={{ display: 'flex' }}>
          <Tests />

          <Replacement />
        </div>
      </div>
    </div>
  );
};

export default Registrations;
