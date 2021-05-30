import React, { useState } from 'react';

import Button from '../../components/Button/Button';

import styles from './styles.module.css';

const Tests = () => {
  const [acronym, setAcronym] = useState();
  const [classParam, setClassParam] = useState();
  const [testName, setTestName] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [local, setLocal] = useState();

  const allClassParam = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'L1',
    'L2',
    'L3',
    'L4',
    'L5',
    'L6',
    'L7',
    'L8',
  ];
  const allTestsName = ['NP1', 'NP2', 'NP3', 'NL1', 'NL2', 'NL3'];
  const allLocal = ['I-1', 'I-2', 'I-3', 'I-4', 'I-5', 'I-6', 'I-7'];
  const subjects = [
    'C103',
    'M003',
    'F201',
    'Q201',
    'M001',
    'M002',
    'C201',
    'C202',
    'E201',
  ];

  return (
    <div className={styles.registrationContainer} style={{ height: '380px' }}>
      <p className={styles.registrationTitle}>Provas</p>
      <table style={{ height: '100%' }}>
        <tr>
          <td>Matéria:</td>
          <td>
            <select>
              {subjects.map((sub) => (
                <option value={sub}>{sub}</option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td>Turma:</td>
          <td>
            <select>
              {allClassParam.map((value) => (
                <option value={value}>{value}</option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td>Prova:</td>
          <td>
            <select>
              {allTestsName.map((test) => (
                <option value={test}>{test}</option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td>Data:</td>
          <td>
            <input type="date" />
          </td>
        </tr>
        <tr>
          <td>Horário:</td>
          <td>
            <input type="time" />
          </td>
        </tr>
        <tr>
          <td>Local:</td>
          <td>
            <select>
              {allLocal.map((loc) => (
                <option value={loc}>{loc}</option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td></td>
          <td style={{ height: '100%', paddingBottom: '50px' }}>
            <Button title="CONFIRMAR" />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Tests;
