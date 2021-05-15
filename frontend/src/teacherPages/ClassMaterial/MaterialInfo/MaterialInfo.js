import React from 'react';

import styles from './styles.module.css';

const MaterialInfo = ({ subject, idMaterial, setMaterialInfo }) => {
  const infos = [
    {
      subject: 'C210',
      idMaterial: 0,
      title: 'Aula 1 - Apresentação.pdf',
      selectedClass: ['L1', 'L2'],
    },
    {
      subject: 'C210',
      idMaterial: 1,
      title: 'Aula 2 - Introdução.pdf',
      selectedClass: ['L1'],
    },
  ];

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
        <p>{infos.filter((info) => info.idMaterial === idMaterial)[0].title}</p>
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
                checked={
                  infos
                    .filter((info) => info.idMaterial === idMaterial)[0]
                    .selectedClass.indexOf(e) !== -1
                }
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
