'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

interface TestRow {
    col1:string,
    col2:string,
    col3:string,
    col4:string,
    col5:string,
    col6:string,
    col7:string,
    align:"right",
}

const columns: readonly Column[] = [
  { label: 'Username', minWidth: 170 },
  { label: 'Transporter Id', minWidth: 120 },
  {
    label: 'SystemRole Id',
    minWidth: 170,
    align: 'right',
  },
  {
    label: 'Created By',
    minWidth: 170,
    align: 'right',
  },
  {
    label: 'Created On',
    minWidth: 170,
    align: 'right',
  },
  {
    label: 'Modified By',
    minWidth: 170,
    align: 'right',
  },
  {
    label: 'Modified On',
    minWidth: 170,
    align: 'right',
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number,
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

const rows2:TestRow[] = [
    {col1:"OLAOLA", col2:"OLEOLE", col3:"OLUOLU", col4:"BOGABOGA", col5:"EIEIEIEI", col6:"POLPOL", col7:"OKOKOKOK", align: 'right',},
    {col1:"OLAOLA", col2:"OLEOLE", col3:"OLUOLU", col4:"BOGABOGA", col5:"EIEIEIEI", col6:"POLPOL", col7:"OKOKOKOK", align: 'right',},
    {col1:"OLAOLA", col2:"OLEOLE", col3:"OLUOLU", col4:"BOGABOGA", col5:"EIEIEIEI", col6:"POLPOL", col7:"OKOKOKOK", align: 'right',},
    {col1:"OLAOLA", col2:"OLEOLE", col3:"OLUOLU", col4:"BOGABOGA", col5:"EIEIEIEI", col6:"POLPOL", col7:"OKOKOKOK", align: 'right',},
    {col1:"OLAOLA", col2:"OLEOLE", col3:"OLUOLU", col4:"BOGABOGA", col5:"EIEIEIEI", col6:"POLPOL", col7:"OKOKOKOK", align: 'right',}
  ];

export default function UsersTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontSize: 16 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows2
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column, index) => {
                      return (
                        <TableCell key={index} align={column.align}>
                          {row.col1}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}