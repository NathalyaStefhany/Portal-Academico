import React from 'react';

import styles from './styles.module.css';

const Button = ({ title, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={styles.button}
      disabled={disabled}
      style={{ backgroundColor: `${disabled ? '#666666' : '#0054a6'}` }}
    >
      {title}
    </button>
  );
};

export default Button;
