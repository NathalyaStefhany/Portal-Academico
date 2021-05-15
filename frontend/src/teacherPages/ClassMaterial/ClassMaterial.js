import React, { useEffect, useState } from 'react';

import {
  List,
  ListSubheader,
  Collapse,
  ListItem,
  ListItemText,
} from '@material-ui/core';

import selectOpen from '../../assets/icons/selectOpen.svg';
import selectClose from '../../assets/icons/selectClose.svg';

import styles from './styles.module.css';
import Upload from './Upload/Upload';
import MaterialInfo from './MaterialInfo/MaterialInfo';

const ClassMaterial = () => {
  const [isOpen, setIsOpen] = useState({});
  const [newMaterial, setNewMaterial] = useState(false);
  const [materialInfo, setMaterialInfo] = useState(false);
  const [subject, setSubject] = useState({});
  const [idMaterial, setIdMaterial] = useState();

  const allMaterials = [
    {
      subject: 'C210',
      materials: [
        { title: 'Aula 1 - Apresentação.pdf' },
        { title: 'Aula 2 - Introdução.pdf' },
      ],
    },
    { subject: 'S201', materials: [] },
  ];

  useEffect(() => {
    allMaterials.map((value) =>
      setIsOpen((element) => ({ ...element, [value.subject]: false }))
    );
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Publicar Material de Aula</h1>
        <div />
      </div>

      <div style={{ display: 'flex' }}>
        <div className={styles.list}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" className={styles.listTitle}>
                Minhas Disciplinas
              </ListSubheader>
            }
          >
            {allMaterials.map((value) => (
              <>
                <ListItem
                  button
                  onClick={() =>
                    setIsOpen((e) => ({
                      ...e,
                      [value.subject]: !isOpen[value.subject],
                    }))
                  }
                >
                  <ListItemText className={styles.listSubject}>
                    {value.subject}
                  </ListItemText>

                  {isOpen[value.subject] ? (
                    <img src={selectOpen} />
                  ) : (
                    <img src={selectClose} />
                  )}
                </ListItem>

                <Collapse
                  in={isOpen[value.subject]}
                  timeout="auto"
                  unmountOnExit
                >
                  {value.materials.map((item, index) => (
                    <List component="div" disablePadding>
                      <ListItem
                        button
                        onClick={() => {
                          setMaterialInfo(true);
                          setIdMaterial(index);
                          setSubject(value.subject);
                          setNewMaterial(false);
                        }}
                      >
                        <ListItemText className={styles.listText}>
                          {item.title}
                        </ListItemText>
                      </ListItem>
                    </List>
                  ))}

                  <List component="div" disablePadding>
                    <ListItem
                      button
                      onClick={() => {
                        setNewMaterial(true);
                        setSubject(value.subject);
                        setMaterialInfo(false);
                      }}
                    >
                      <ListItemText className={styles.listNewMaterial}>
                        + Adicionar novo material
                      </ListItemText>
                    </ListItem>
                  </List>
                </Collapse>
              </>
            ))}
          </List>
        </div>

        {newMaterial && (
          <Upload subject={subject} setNewMaterial={setNewMaterial} />
        )}

        {materialInfo && (
          <MaterialInfo
            subject={subject}
            idMaterial={idMaterial}
            setMaterialInfo={setMaterialInfo}
          />
        )}
      </div>
    </div>
  );
};

export default ClassMaterial;
