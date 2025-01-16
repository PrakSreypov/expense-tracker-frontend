import { Container, Typography } from '@mui/material';

import Expense from './pages/home';

function App() {
  return (
    <Container>
      <Typography variant="h3" align="center" mt={4}>
        Expense Tracker
      </Typography>
      <Expense />
    </Container>
  );
}

export default App;
