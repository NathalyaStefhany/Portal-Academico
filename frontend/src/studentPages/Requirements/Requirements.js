import React from 'react';

import check from '../../assets/icons/check.svg';

import styles from './styles.module.css';

const Requirements = () => {
  const totalCredits = 167;
  const credits = 14;

  const p1 = [
    { disciplina: 'M001', creditos: 4, situacao: 'aprovado', requisitos: [] },
    { disciplina: 'M002', creditos: 4, situacao: 'aprovado', requisitos: [] },
    { disciplina: 'C201', creditos: 1, situacao: 'aprovado', requisitos: [] },
    { disciplina: 'AC1', creditos: 3, situacao: 'aprovado', requisitos: [] },
    { disciplina: 'C202', creditos: 6, situacao: 'aprovado', requisitos: [] },
    { disciplina: 'E201', creditos: 3, situacao: 'aprovado', requisitos: [] },
  ];

  const p2 = [
    {
      disciplina: 'C103',
      creditos: 3,
      situacao: 'aprovado',
      requisitos: [{ disciplina: 'C202', requisito: 'Pré I', situacao: 'ok' }],
    },
    {
      disciplina: 'F201',
      creditos: 5,
      situacao: 'aprovado',
      requisitos: [
        { disciplina: 'M001', requisito: 'Pré II', situacao: 'ok' },
        { disciplina: 'M003', requisito: 'Co', situacao: 'ok' },
      ],
    },
  ];

  const p3 = [
    {
      disciplina: 'C115',
      creditos: 1,
      situacao: 'em curso',
      requisitos: [{ disciplina: 'T202', requisito: 'Pré II', situacao: 'ok' }],
    },
    {
      disciplina: 'C320',
      creditos: 4,
      situacao: 'sem restrição',
      requisitos: [],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Quadro de Pré/Co-Requisitos</h1>
        <div />
      </div>

      <div className={styles.credits}>
        <b>Total de Créditos Aprovados:</b> {totalCredits}
        <b style={{ marginLeft: '350px' }}>
          Total de Créditos Matriculados:
        </b>{' '}
        {credits}
      </div>

      <table className={styles.table}>
        <tr>
          <td width={100}>
            <b>P1</b>
            <p>(21 crd)</p>
          </td>
          <td>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {p1.map((value) => (
                <div
                  key={value.disciplina}
                  className={styles.disciplina}
                  style={{
                    backgroundColor:
                      value.situacao === 'aprovado'
                        ? '#c0ffaa'
                        : value.situacao === 'em curso'
                        ? '#fdff97'
                        : value.situacao === 'sem restrição'
                        ? '#abd6ff'
                        : '#c4c4c4',
                  }}
                >
                  <p>{value.disciplina}</p>
                  <p>({value.creditos} crd)</p>
                </div>
              ))}
            </div>
          </td>
        </tr>

        <tr>
          <td width={100}>
            <b>P2</b>
            <p>(23 crd)</p>
          </td>
          <td>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {p2.map((value) => (
                <div>
                  <div
                    key={value.disciplina}
                    className={styles.disciplina}
                    style={{
                      backgroundColor:
                        value.situacao === 'aprovado'
                          ? '#c0ffaa'
                          : value.situacao === 'em curso'
                          ? '#fdff97'
                          : value.situacao === 'sem restrição'
                          ? '#abd6ff'
                          : '#c4c4c4',
                      marginBottom: value.requisitos.length > 0 && '0px',
                      borderBottomRightRadius:
                        value.requisitos.length > 0 && '0px',
                      borderBottomLeftRadius:
                        value.requisitos.length > 0 && '0px',
                      borderBottom: value.requisitos.length > 0 && 'none',
                    }}
                  >
                    <p>{value.disciplina}</p>
                    <p>({value.creditos} crd)</p>
                  </div>

                  {value.requisitos.length > 0 && (
                    <div
                      style={{
                        border: '1px solid #666666',
                        borderBottomRightRadius: '5px',
                        borderBottomLeftRadius: '5px',
                        margin: '15px',
                        marginTop: '0px',
                        width: '167px',
                      }}
                    >
                      {value.requisitos.map((requisito) => (
                        <div className={styles.requisitos}>
                          {requisito.situacao === 'ok' && (
                            <img src={check} alt="Icone representado Ok!" />
                          )}
                          <p>{requisito.disciplina}</p>
                          <p>({requisito.requisito} )</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </td>
        </tr>

        <tr>
          <td width={100}>
            <b>P3</b>
            <p>(25 crd)</p>
          </td>
          <td>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {p3.map((value) => (
                <div>
                  <div
                    key={value.disciplina}
                    className={styles.disciplina}
                    style={{
                      backgroundColor:
                        value.situacao === 'aprovado'
                          ? '#c0ffaa'
                          : value.situacao === 'em curso'
                          ? '#fdff97'
                          : value.situacao === 'sem restrição'
                          ? '#abd6ff'
                          : '#c4c4c4',
                      marginBottom: value.requisitos.length > 0 && '0px',
                      borderBottomRightRadius:
                        value.requisitos.length > 0 && '0px',
                      borderBottomLeftRadius:
                        value.requisitos.length > 0 && '0px',
                      borderBottom: value.requisitos.length > 0 && 'none',
                    }}
                  >
                    <p>{value.disciplina}</p>
                    <p>({value.creditos} crd)</p>
                  </div>

                  {value.requisitos.length > 0 && (
                    <div
                      style={{
                        border: '1px solid #666666',
                        borderBottomRightRadius: '5px',
                        borderBottomLeftRadius: '5px',
                        margin: '15px',
                        marginTop: '0px',
                        width: '167px',
                      }}
                    >
                      {value.requisitos.map((requisito) => (
                        <div className={styles.requisitos}>
                          {requisito.situacao === 'ok' && (
                            <img src={check} alt="Icone representado Ok!" />
                          )}
                          <p>{requisito.disciplina}</p>
                          <p>({requisito.requisito} )</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </td>
        </tr>
      </table>

      <div className={styles.subtitle}>
        <h2>Legenda de Pré/Co-Requisitos</h2>
        <div className={styles.line} />

        <p>
          <b>Pré I - </b>Disciplinas que são definidas como pré-requisitos nível
          I de outra disciplina deverão ter sido cursadas anteriormente pelo
          estudante, com aproveitamento de frequência e nota.
        </p>

        <p>
          <b>Pré II - </b>Disciplinas que são definidas como pré-requisitos
          nível II de outra disciplina deverão ter sido cursadas anteriormente
          pelo estudante, com aproveitamento de frequência.
        </p>

        <p>
          <b>Co - </b>Disciplinas que são co-requisitos de outra disciplina
          deverão ter sido cursadas anteriormente pelo estudante, com
          aproveitamento de frequência e nota, ou concomitantemente.
        </p>

        <h2 style={{ marginTop: '20px' }}>Legenda de Cores</h2>
        <div className={styles.line} />

        <div style={{ display: 'flex' }}>
          <div
            className={styles.colors}
            style={{ backgroundColor: '#c0ffaa' }}
          ></div>
          <p>Disciplina aprovada</p>

          <div
            className={styles.colors}
            style={{ backgroundColor: '#fdff97' }}
          ></div>
          <p>Disciplina em curso no semestre</p>

          <div
            className={styles.colors}
            style={{ backgroundColor: '#abd6ff' }}
          ></div>
          <p>Disciplina não possui restrição de Pré-Requisitos I ou II</p>

          <div
            className={styles.colors}
            style={{ backgroundColor: '#c4c4c4' }}
          ></div>
          <p>Disciplina possui restrição de Pré-Requisitos I ou II</p>
        </div>
      </div>
    </div>
  );
};

export default Requirements;
