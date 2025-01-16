import { Box, Button, Modal, Typography } from '@mui/material';

import { Expense } from '../types/expense';

interface ExpenseModalDeleteProps {
  open: boolean;
  onClose: () => void;
  expense: Expense | null;
  onDelete: (id: string) => Promise<void>;
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

export default function ExpenseModalDelete({
  open,
  onClose,
  expense,
  onDelete,
}: ExpenseModalDeleteProps) {
  const handleDelete = async () => {
    if (expense?._id) {
      await onDelete(expense._id);
      onClose();
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" mb={2}>
          Confirm Delete
        </Typography>
        <Typography mb={3}>
          Are you sure you want to delete {expense?.title}?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
