import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';

import download from '../../assets/icons/download.svg';

import useFetch from '../../hooks/useFetch';
import {
  GET_STUDENT_CLASSES,
  GET_STUDENT_DOWNLOAD_MATERIAL,
  GET_STUDENT_MATERIALS,
} from '../../service/api';

import FormatDateToShow from '../../utils/FormatDateToShow';

import styles from './styles.module.css';

const ClassMaterial = ({ studentInfo }) => {
  const [subject, setSubject] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 6;

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#0054a6',
      color: theme.palette.common.white,
      fontSize: 16,
      fontWeight: 500,
    },
    body: {
      fontSize: 14,
      color: '#333333',
    },
  }))(TableCell);

  const StyledTableRow = withStyles(() => ({
    root: {
      '&:nth-of-type(even)': {
        backgroundColor: 'rgba(0, 83, 166, 0.03)',
      },
    },
  }))(TableRow);

  const [allSubjects, setAllSubjects] = useState([]);
  const [allMaterials, setAllMaterials] = useState([]);
  const [downloadId, setDownloadId] = useState();

  const { request } = useFetch();

  useEffect(() => {
    const sendRequest = async () => {
      const { url: url, config: config } = GET_STUDENT_CLASSES(
        studentInfo.matriculationNumber
      );

      const { json, error } = await request(url, config);

      if (!error && json.length) {
        setSubject(json[0]?.Acronym);
        setAllSubjects(json);
      }
    };

    sendRequest();
  }, []);

  useEffect(() => {
    if (subject !== '') {
      setAllMaterials([]);

      const sendRequest = async () => {
        const subjectSplit = subject.split('-');

        const acronym = subjectSplit[0];
        const classParam = subjectSplit.length > 1 ? subjectSplit[1] : '""';

        const { url: url, config: config } = GET_STUDENT_MATERIALS(
          acronym,
          classParam
        );

        const { json, error } = await request(url, config);

        if (!error && json.length) {
          setAllMaterials(json);
        }
      };

      sendRequest();
    }
  }, [subject]);

  useEffect(() => {
    if (downloadId) {
      const sendRequest = async () => {
        const subjectSplit = subject.split('-');

        const acronym = subjectSplit[0];
        const classParam = subjectSplit.length > 1 ? subjectSplit[1] : '""';

        const { url: url, config: config } = GET_STUDENT_DOWNLOAD_MATERIAL(
          acronym,
          classParam,
          downloadId
        );

        const { json, error } = await request(url, config);

        if (!error && json.length) {
          var byteCharacters = atob(json[0]?.Content);
          var byteNumbers = new Array(byteCharacters.length);

          for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }

          var byteArray = new Uint8Array(byteNumbers);
          var file = new Blob([byteArray], { type: 'application/pdf;base64' });
          var fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        }

        setDownloadId();
      };

      sendRequest();
    }
  }, [downloadId]);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, allMaterials.length - page * rowsPerPage);

  const arr = [1, 1, 1, 1, 1, 1];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Material Acadêmico do Semestre</h1>
        <div />
      </div>

      <div style={{ display: 'flex' }}>
        <FormControl variant="outlined" className={styles.select}>
          <InputLabel id="demo-simple-select-outlined-label">
            Disciplina
          </InputLabel>
          <Select
            native
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={subject}
            onChange={(value) => setSubject(value.target.value)}
            label="Disciplina"
          >
            {allSubjects.map((sub) => (
              <option value={sub.Acronym}>{sub.Acronym}</option>
            ))}
          </Select>
        </FormControl>

        <div className={styles.table}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" width="150px">
                    Sigla
                  </StyledTableCell>
                  <StyledTableCell align="left">Título</StyledTableCell>
                  <StyledTableCell align="center">Data</StyledTableCell>
                  <StyledTableCell align="center">Arquivo</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {allMaterials
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell align="center">
                        {subject}
                      </StyledTableCell>

                      <StyledTableCell align="left">
                        {row.Description}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {FormatDateToShow(row.CreationDate)}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <button onClick={() => setDownloadId(row._id)}>
                          <img src={download} />
                        </button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}

                {arr.map((element, index) => {
                  return (
                    <>
                      {index < emptyRows && (
                        <StyledTableRow key={index} style={{ height: '53px' }}>
                          <TableCell colSpan={4} />
                        </StyledTableRow>
                      )}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={allSubjects.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={(value, newPage) => setPage(newPage)}
            rowsPerPageOptions={[]}
          />
        </div>
      </div>
    </div>
  );
};

ClassMaterial.propTypes = {
  studentInfo: PropTypes.object,
};

export default ClassMaterial;
