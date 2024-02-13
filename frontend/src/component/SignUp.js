import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Grid, TextField, Button } from '@mui/material';
const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginAttempt = () => {
    console.log(`Attempting SignUp on Username ${userName}, Email ${email}, and password ${password}`);
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
          Sign-Up
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={8} sm={2}>
            <TextField
              label="Username"
              margin="normal"
              value={email}
              onChange={handleUserNameChange}
            />
          </Grid>
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
              label="Password"
              margin="normal"
              value={password}
              type='password'
              onChange={handlePasswordChange}
            />
          </Grid>
          <Button variant="contained" color="primary" onClick={handleLoginAttempt} mt={2}>
            Login!
          </Button>
        </Grid>
        <Button
          component={Link}
          to="/login"
          variant="text"
          align="center"
          className="login"
          sx={{
            fontFamily: 'Inter',
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '21px',
            letterSpacing: '-0.32px',
            textAlign: 'center',
            color: '#3492C7',
            textTransform: 'none'
          }}
        >
          Already a member? Log-in instead!
        </Button>
      </Box>
    </Container>
  );
};

export default SignUp;