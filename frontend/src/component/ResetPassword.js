import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Box, Typography, Grid, TextField, Button } from '@mui/material';
import useAlert from '../hook/useAlert';

const ResetPassword = () => {
  const { resetCode } = useParams();
  const { handleAlertChange, AlertComponent } = useAlert();
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
      if (response.ok) {
        handleAlertChange("Password reset successful. Try logging in now.", "info");
        return;
      }
      handleAlertChange(`${responseData.error}`, "error");
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
          variant="h5"
          align="center"
          sx={{
            fontFamily: 'Inter',
            fontSize: '22px',
            fontWeight: 700,
            lineHeight: '28px',
            letterSpacing: '0.35px',
            textAlign: 'center',
            color: 'white',
            marginTop: '20px',
          }}
        >
          New password
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={8} sm={2}>
            <TextField
              label="New Password"
              type='password'
              margin="normal"
              value={password}
              onChange={handlePasswordChange}
            />
          </Grid>
        </Grid>
          <Button variant="contained" color="primary" onClick={handleResetPassword} mt={2} sx={{
            width: '241px',
            height: '53px',
            marginTop: '15px',
            padding: '16px 32px 16px 32px',
            borderRadius: '100px',
            gap: '20px',
            textTransform: 'none',
          }}>
            Save
          </Button>
      </Box>
      { AlertComponent }
    </Container>
  );
};

export default ResetPassword;