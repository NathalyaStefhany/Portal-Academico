import React from 'react';

import styles from './styles.module.css';

const Modal = ({ children, height }) => (
  <div className={styles.container}>
    <div className={styles.content} style={{ height: `${height}` }}>
      {children}
    </div>
  </div>
);

export default Modal;
