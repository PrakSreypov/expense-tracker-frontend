import { useState } from 'react';

import { Box, Button, TextField } from '@mui/material';

interface ExpenseFormData {
  title: string;
  amount: number;
  date: string;
  description: string;
}

interface ExpenseFormState {
  title: string;
  amount: string;
  date: string;
  description: string;
}

interface ExpenseFormCreateProps {
  onCreate: (expense: ExpenseFormData) => Promise<void>;
}

export default function ExpenseFormCreate({
  onCreate,
}: ExpenseFormCreateProps) {
  const [formData, setFormData] = useState<ExpenseFormState>({
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const expenseData: ExpenseFormData = {
        ...formData,
        amount: Number(formData.amount),
      };
      await onCreate(expenseData);
      setFormData({
        title: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
      });
    } catch (error) {
      console.error('Failed to create expense:', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        // maxWidth: 600,
        mx: 'auto',
        py: 3,
      }}
    >
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Amount"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        required
        fullWidth
        InputProps={{
          startAdornment: '$',
        }}
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ minWidth: 120 }}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
}
