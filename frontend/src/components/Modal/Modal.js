import React from 'react';

import styles from './styles.module.css';

const Modal = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.content}>{children}</div>
  </div>
);

export default Modal;
