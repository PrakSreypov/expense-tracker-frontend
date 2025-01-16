import { useEffect, useState } from 'react';

import { Typography } from '@mui/material';

import { Expense } from '../../types/expense';
import {
  expenseDelete,
  expenseList,
  expensePost,
  expenseUpdate,
  
} from '../../api/expenseApi';

import ExpenseView from './view';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await expenseList();
        setExpenses(data);
      } catch (error) {
        setError('Failed to fetch expenses');
        console.log('Error occured: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleCreateExpense = async (createdExpense: Expense) => {
    try {
      const response = await expensePost(createdExpense);
      setExpenses([...expenses, response]);
    } catch (error) {
      setError('Failed to create expense');
      console.log('Error occurred: ', error);
    }
  };

  const handleUpdateExpense = async (id: string, updatedExpense: Expense) => {
    try {
      const response = await expenseUpdate(id, updatedExpense);
      setExpenses(expenses.map((exp) => (exp._id === id ? response : exp)));
    } catch (error) {
      setError('Failed to update expense');
      console.log('Error occurred: ', error);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await expenseDelete(id);
      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (error) {
      setError('Failed to delete expense');
      console.log('Error occured: ', error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error...</Typography>;
  
  return (
    <ExpenseView
      expenses={expenses}
      onCreate={handleCreateExpense}
      onUpdate={handleUpdateExpense}
      onDelete={handleDeleteExpense}
    />
  );
}
