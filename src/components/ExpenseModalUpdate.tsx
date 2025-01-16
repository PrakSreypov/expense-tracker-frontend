import { useEffect, useState } from 'react';

import { Box, Button, Modal, TextField, Typography } from '@mui/material';

import { Expense } from '../types/expense';

interface ExpenseModalUpdateProps {
  open: boolean;
  onClose: () => void;
  expense: Expense | null;
  onUpdate: (id: string, expense: Expense) => Promise<void>;
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const formatDateForInput = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

export default function ExpenseModalUpdate({
  open,
  onClose,
  expense,
  onUpdate,
}: ExpenseModalUpdateProps) {
  const [formData, setFormData] = useState<Expense | null>(expense);

  useEffect(() => {
    setFormData(expense);
  }, [expense]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    if (formData && formData._id) {
      await onUpdate(formData._id, formData);
      onClose();
    }
  };

  useEffect(() => {
    if (expense) {
      setFormData({
        ...expense,
        date: formatDateForInput(expense.date),
      });
    }
  }, [expense]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" mb={2}>
          Edit Expense
        </Typography>
        {formData && (
          <>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Amount"
              name="amount"
              value={formData.amount}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                mt: 2,
              }}
            >
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}
