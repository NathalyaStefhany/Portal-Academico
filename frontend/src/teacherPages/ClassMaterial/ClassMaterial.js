import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  List,
  ListSubheader,
  Collapse,
  ListItem,
  ListItemText,
} from '@material-ui/core';

import selectOpen from '../../assets/icons/selectOpen.svg';
import selectClose from '../../assets/icons/selectClose.svg';

import useFetch from '../../hooks/useFetch';

import styles from './styles.module.css';
import Upload from './Upload/Upload';
import MaterialInfo from './MaterialInfo/MaterialInfo';
import {
  GET_CLASS,
  GET_STUDENT_MATERIALS,
  GET_TEACHER,
} from '../../service/api';

const ClassMaterial = ({ teacherInfo }) => {
  const [isOpen, setIsOpen] = useState({});
  const [newMaterial, setNewMaterial] = useState(false);
  const [materialInfo, setMaterialInfo] = useState(false);
  const [subject, setSubject] = useState({});
  const [material, setMaterial] = useState();

  const [allClassesId, setAllClassesId] = useState([]);
  const [allMaterials, setAllMaterials] = useState([]);

  const { request } = useFetch();

  useEffect(() => {
    allMaterials.map((value) =>
      setIsOpen((element) => ({ ...element, [value.subject]: false }))
    );
  }, [allMaterials]);

  useEffect(() => {
    const sendRequest = async () => {
      const { url, config } = GET_TEACHER(teacherInfo.employeeNumber);

      const { json, error } = await request(url, config);

      if (!error && json) {
        setAllClassesId(json.Classes);
      }
    };

    sendRequest();
  }, []);

  const getClassInfo = async (id) => {
    const { url, config } = GET_CLASS(id);

    const { json, error } = await request(url, config);

    if (!error && json) {
      const classParam = json.classParam ? ` - ${json.classParam}` : '';
      const subject = json.acronym + classParam;

      return { subject: subject };
    }
  };

  const getAllMaterial = async (sub) => {
    const subjectSplit = sub.split(' ');

    const acronym = subjectSplit[0];
    const classParam = subjectSplit.length > 1 ? subjectSplit[2] : '""';

    const { url, config } = GET_STUDENT_MATERIALS(acronym, classParam);

    const { json, error } = await request(url, config);

    if (!error && json.length) {
      const materials = json.map((mat) => {
        return {
          title: mat.Description,
        };
      });

      return materials;
    }
  };

  useEffect(async () => {
    if (allClassesId.length && !newMaterial) {
      const subjectMaterial = await Promise.all(
        allClassesId.map((classId) => getClassInfo(classId))
      );

      subjectMaterial.forEach(async (element, index) => {
        subjectMaterial[index].materials = await getAllMaterial(
          element.subject
        );
      });

      setAllMaterials(subjectMaterial);
    }
  }, [allClassesId, newMaterial]);

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
                  {value.materials?.map((item, index) => (
                    <List component="div" disablePadding>
                      <ListItem
                        button
                        onClick={() => {
                          setMaterialInfo(true);
                          setSubject(value.subject);
                          setMaterial(item.title);
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
          <Upload subject={subject} setNewUpload={setNewMaterial} />
        )}

        {materialInfo && (
          <MaterialInfo
            subject={subject}
            title={material}
            setMaterialInfo={setMaterialInfo}
          />
        )}
      </div>
    </div>
  );
};

ClassMaterial.propTypes = {
  teacherInfo: PropTypes.object,
};

export default ClassMaterial;
