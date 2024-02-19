import React, { useState } from 'react';
import { Container, Box, Typography, Grid, TextField, Button } from '@mui/material';
import useAlert from '../hook/useAlert';
import StyledTextField from './StyledTextField';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { handleAlertChange, AlertComponent } = useAlert();

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
      if (response.ok) {
        handleAlertChange("Password recovery requested. An email will be sent if the user is found.", "info");
      }
    } catch (error) {
      handleAlertChange(`${error}`, "error");
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
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontFamily: 'Inter',
            fontWeight: 700,
            letterSpacing: '0.35px',
            textAlign: 'center',
            color: 'white',
            marginTop: '20px',
            marginBottom: '0px'
          }}
        >
          Password Recovery
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={8} sm={2}>
            <StyledTextField
              label="Email"
              margin="normal"
              variant='filled'
              value={email}
              onChange={handleEmailChange}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleForgotPassword} mt={2} sx={{
          width: '241px',
          height: '53px',
          marginTop: '15px',
          padding: '16px 32px 16px 32px',
          borderRadius: '100px',
          gap: '20px',
          textTransform: 'none',
        }}>
          Reset Password
        </Button>
        {AlertComponent}
      </Box>
    </Container>
  );
};

export default ForgotPassword;