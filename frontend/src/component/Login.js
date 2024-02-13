import React, { useState } from 'react';
import { Container, Box, Typography, Grid, TextField, Button } from '@mui/material';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginAttempt = () => {
    console.log(`Attempting Login on Email ${email} and password ${password}`);
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="90vh" // Set the height of the container to full viewport height
      >
        <Typography variant="h4" align="center" mt={3}>
          Sign-In
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={8} sm={2}>
            <TextField
              label="Email"
              margin="normal"
              value={email}
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid item xs={8} sm={2}>
            <TextField
              label="Room Code"
              margin="normal"
              value={password}
              type='password'
              onChange={handlePasswordChange}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleLoginAttempt} mt={2}>
          Login!
        </Button>
      </Box>
    </Container>
  );
};

export default Login;