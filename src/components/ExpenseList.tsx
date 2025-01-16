import { useState } from 'react';

import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Expense } from '../types/expense';
import ExpenseModalDelete from './ExpenseModalDelete';
import ExpenseModalUpdate from './ExpenseModalUpdate';

interface ExpenseListProps {
  expenses: Expense[];
  onUpdate: (id: string, expense: Expense) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.primary,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default function ExpenseList({
  expenses,
  onUpdate,
  onDelete,
}: ExpenseListProps) {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const handleOpenDelete = (expense: Expense) => {
    setSelectedExpense(expense);
    setOpenDelete(true);
  };

  const handleOpenEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setOpenEdit(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <StyledTableRow key={expense.title}>
                <StyledTableCell component="th" scope="expense">
                  {expense.title}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {expense.amount}$
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(expense.date)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {expense.description}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <EditOutlined
                    fontSize="small"
                    onClick={() => handleOpenEdit(expense)}
                  />
                  <DeleteOutline
                    fontSize="small"
                    onClick={() => handleOpenDelete(expense)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Modal */}
      <ExpenseModalDelete
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        expense={selectedExpense}
        onDelete={onDelete}
      />

      {/* Edit Modal */}
      <ExpenseModalUpdate
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        expense={selectedExpense}
        onUpdate={onUpdate}
      />
    </>
  );
}
