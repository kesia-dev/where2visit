import React, { useState } from 'react';
import { Container, Box, Typography, Grid, TextField, Button } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleForgotPassword = async () => {
    try {
      // check if user typed in an email
      if (!email) throw new Error('Please fill in an email');
      const emailInfo = {
        email
      };
      const response = await fetch('http://localhost:4200/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailInfo)
      });
      const responseData = await response.json();
      if (responseData.status === 200) alert('Password reset requested. Please check your email.');
    } catch (error) {
      console.log(error);
    }
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
          Password Recovery
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
          <Button variant="contained" color="primary" onClick={handleForgotPassword} mt={2}>
            Reset Password
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default ForgotPassword;