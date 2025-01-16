import { Expense } from '../types/expense';
import axiosInstance from './instance';

// Fetch all expenses
export const expenseList = async (): Promise<Expense[]> => {
  try {
    const response = await axiosInstance.get('/expenses');

    const expenses = response.data.data;

    return expenses;
  } catch (error) {
    console.error('Failed to fetch expenses:', error);
    throw error;
  }
};

// Create a new expense
export const expensePost = async (expense: Expense): Promise<Expense> => {
  try {
    const response = await axiosInstance.post('/expenses', expense);
    const newExpense = response.data.data;

    return newExpense;
  } catch (error) {
    console.error('Failed to create expense:', error);
    throw error;
  }
};

// Update an expense
export const expenseUpdate = async (
  expenseId: string,
  updates: Partial<Expense>
): Promise<Expense> => {
  try {
    const response = await axiosInstance.put(`/expenses/${expenseId}`, updates);
    const updatedExpense = response.data.data;

    return updatedExpense;
  } catch (error) {
    console.error('Failed to update expense:', error);
    throw error;
  }
};

// Delete an expense
export const expenseDelete = async (expenseId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/expenses/${expenseId}`);
  } catch (error) {
    console.error('Failed to delete expense:', error);
    throw error;
  }
};
