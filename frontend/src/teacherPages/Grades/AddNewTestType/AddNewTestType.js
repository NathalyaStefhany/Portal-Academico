import React, { useState } from 'react';

import Button from '../../../components/Button/Button';
import Modal from '../../../components/Modal/Modal';

import styles from './styles.module.css';

const AddNewTestType = ({
  testTypeOptions,
  setTestTypeOptions,
  setModalIsOpen,
  allTestsCreated,
  setAllTestsCreated,
}) => {
  const [testType, setTestType] = useState('');

  const addNewTest = () => {
    let index;

    if (testType === '') {
      setTestType(testTypeOptions[0]);
      index = 0;
    } else index = testTypeOptions.indexOf(testType);

    let allTests = allTestsCreated;
    allTests.push({
      type: testType === '' ? testTypeOptions[0] : testType,
      state: 'elaboration',
    });

    setAllTestsCreated(allTests);

    const options = testTypeOptions;

    options.splice(index, 1);
    setTestTypeOptions(options);

    setTestType('');
    setModalIsOpen(false);
  };

  return (
    <Modal>
      <div className={styles.modal}>
        <p>Nova Avaliação</p>
        <div />

        <div style={{ display: 'flex' }}>
          <b>Turma: </b> <p style={{ marginLeft: '5px' }}>C213</p>
        </div>

        <div style={{ display: 'flex', marginTop: '10px' }}>
          <b style={{ alignSelf: 'center' }}>Avaliação:</b>
          <select onChange={(value) => setTestType(value.target.value)}>
            {testTypeOptions.map((value) => (
              <option value={value}>{value}</option>
            ))}
          </select>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
          }}
        >
          <Button
            title="CONFIRMAR"
            onClick={addNewTest}
            disabled={!testTypeOptions.length}
          />
          <Button title="CANCELAR" onClick={() => setModalIsOpen(false)} />
        </div>
      </div>
    </Modal>
  );
};

export default AddNewTestType;
