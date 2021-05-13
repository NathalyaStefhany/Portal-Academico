import {
  withStyles,
  Table as TableComp,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

import styles from './styles.module.css';

const Table = ({ header, data }) => {
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

  const keys = Object.keys(data[0]);

  return (
    <TableContainer component={Paper} className={styles.table}>
      <TableComp aria-label="customized table">
        <TableHead>
          <TableRow>
            {header.map((value) => (
              <StyledTableCell align="center">{value}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow key={index}>
              {keys.map((key) => (
                <StyledTableCell align="center">{row[key]}</StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </TableComp>
    </TableContainer>
  );
};

export default Table;
