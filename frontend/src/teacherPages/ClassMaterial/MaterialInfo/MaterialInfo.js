import React from 'react';

import styles from './styles.module.css';

const MaterialInfo = ({ subject, title, setMaterialInfo }) => {
  return (
    <div className={styles.upload}>
      <div className={styles.uploadTitle}>
        <p>Informações do Material</p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px',
        }}
      >
        <b>Disciplina:</b>{' '}
        <p style={{ color: '#0054A6', marginLeft: '5px' }}>{subject}</p>
      </div>

      <div
        style={{
          display: 'flex',
          marginTop: '24px',
          marginLeft: '24px',
        }}
      >
        <b style={{ marginRight: '8px' }}>Arquivo: </b>
        <p>{title}</p>
      </div>

      <div
        style={{
          display: 'flex',
          marginTop: '24px',
          marginLeft: '24px',
          alignItems: 'center',
        }}
      >
        <b style={{ marginRight: '10px' }}>Turmas: </b>
        <input
          type="checkbox"
          checked
          style={{ width: '18px', height: '18px' }}
        />
        <label style={{ marginLeft: '5px', marginRight: '20px' }}>A</label>

        <input type="checkbox" style={{ width: '18px', height: '18px' }} />
        <label style={{ marginLeft: '5px', marginRight: '20px' }}>B</label>
      </div>

      <div
        style={{
          margin: '24px 0px',
          justifyContent: 'center',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <button>SALVAR ALTERAÇÕES</button>
        <button onClick={() => setMaterialInfo(false)}>
          CANCELAR ALTERAÇÕES
        </button>
        <button>REMOVER MATERIAL</button>
      </div>
    </div>
  );
};

export default MaterialInfo;
