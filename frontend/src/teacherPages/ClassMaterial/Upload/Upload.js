import React, { useEffect, useState } from 'react';

import Modal from '../../../components/Modal/Modal';
import Button from '../../../components/Button/Button';

import useFetch from '../../../hooks/useFetch';
import { POST_INSERT_MATERIAL } from '../../../service/api';

import styles from './styles.module.css';

const Upload = ({ subject, setNewUpload }) => {
  const [newMaterial, setNewMaterial] = useState();
  const [upload, setUpload] = useState(false);
  const [modal, setModal] = useState(false);

  const { request } = useFetch();

  const uploadMaterial = async (data) => {
    const subjectSplit = subject.split(' ');

    const acronym = subjectSplit[0];
    const classParam = subjectSplit.length > 1 ? subjectSplit[2] : '""';

    const { url, config } = POST_INSERT_MATERIAL(acronym, classParam, data);

    const { json, error } = await request(url, config);
  };

  useEffect(() => {
    if (upload) {
      const data = new FormData();
      data.append('uploadedFile', newMaterial, newMaterial.name);

      uploadMaterial(data);

      setUpload(false);
      setModal(true);
    }
  }, [upload]);

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
        <input
          type="file"
          className={styles.inputFile}
          onChange={(value) => setNewMaterial(value.target.files[0])}
        />
      </div>

      <div
        style={{
          display: 'flex',
          marginTop: '24px',
          marginLeft: '24px',
          alignItems: 'center',
        }}
      ></div>

      <div
        style={{
          margin: '24px 0px',
          justifyContent: 'center',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <button onClick={() => setUpload(true)}>CONFIRMAR UPLOAD</button>
        <button onClick={() => setNewUpload(false)}>CANCELAR UPLOAD</button>
      </div>

      {modal && (
        <Modal height="150px">
          <div className={styles.modal}>
            <p className={styles.created}>Upload realizado com sucesso!</p>

            <Button
              title="FECHAR"
              onClick={() => {
                setModal(false);
                setNewUpload(false);
              }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Upload;
