import React from 'react';

import styles from './styles.module.css';

const Upload = ({ subject, setNewMaterial }) => {
  const classes = [
    {
      subject: 'C210',
      class: ['L1', 'L2', 'L3'],
    },
    { subject: 'S201', class: ['A', 'B'] },
  ];

  return (
    <div className={styles.upload}>
      <div className={styles.uploadTitle}>
        <p>Upload do Material</p>
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
        <input type="file" className={styles.inputFile} />
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
        {classes
          .filter((value) => value.subject === subject)[0]
          .class.map((e) => (
            <>
              <input
                type="checkbox"
                style={{ width: '18px', height: '18px' }}
              />
              <label style={{ marginLeft: '5px', marginRight: '20px' }}>
                {e}
              </label>
            </>
          ))}
      </div>

      <div
        style={{
          margin: '24px 0px',
          justifyContent: 'center',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <button>CONFIRMAR UPLOAD</button>
        <button onClick={() => setNewMaterial(false)}>CANCELAR UPLOAD</button>
      </div>
    </div>
  );
};

export default Upload;
