import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Box, Typography, Grid, TextField, Button } from '@mui/material';

const ResetPassword = () => {
  const { resetCode } = useParams();
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleResetPassword = async () => {
    // check that user typed a password
    try {
      if (!password) throw new Error('Please fill in the password');
      const resetData = {
        password
      };
      console.log(JSON.stringify(resetData));
      const response = await fetch(`http://localhost:4200/auth/reset-password/${resetCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resetData)
      });
      const responseData = await response.json();
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
          New password
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={8} sm={2}>
            <TextField
              label="New Password"
              margin="normal"
              value={password}
              onChange={handlePasswordChange}
            />
          </Grid>          
          <Button variant="contained" color="primary" onClick={handleResetPassword} mt={2}>
            Save
          </Button>
        </Grid>        
      </Box>
    </Container>
  );
};

export default ResetPassword;