import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSearchParam } from '../../../app';

export default function AuthComponent({onSubmit, title, authTitle, redirectTitle, redirectTo, isLoading, isSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      const from = getSearchParam(location.search, 'from') || '/';
      navigate(from);
    }
  }, [isSuccess, navigate]);

  const handleSubmit = () => {
    onSubmit({ email, password });
  };

  const handleRedirect = () => {
    navigate(redirectTo);
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 10 }}>
        <Typography variant="h3" sx={{ textAlign: 'left', marginBottom: 2 }}>
          {title}
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Stack direction={'row'} spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {authTitle}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleRedirect}
            disabled={isLoading}
          >
            {redirectTitle}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}