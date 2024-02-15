import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Grid, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
const Login = () => {
  const alertInfoInitialState = { open: false, variant: "", info: "" }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertInfo, setAlertInfo] = useState(alertInfoInitialState);
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAlertChange = (info, variant) => {
    if (!info && !variant) return setAlertInfo(alertInfoInitialState);
    setAlertInfo({
      open: true,
      variant,
      info
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    handleAlertChange();
  };

  const handleLoginAttempt = async () => {
    try {
      // check if all fields are present
      if (!email || !password) throw new Error('Please fill in all the fields.');

      const loginData = {
        email,
        password
      };
      const response = await fetch('http://localhost:4200/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      const responseData = await response.json();
      console.log("responseData", responseData);
      console.log("Response", response);
      if (response.ok) {
        handleAlertChange(`Welcome, ${responseData.userName}`, "success");
        setAuthData(responseData); // insert responseData into applicationContext for ease-of-use
        navigate(`/`);
        return;
      }
      handleAlertChange(responseData.error, "error");
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
              label="Password"
              margin="normal"
              value={password}
              type='password'
              onChange={handlePasswordChange}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoginAttempt}
          sx={{
            width: '241px',
            height: '53px',
            marginTop: '15px',
            padding: '16px 32px 16px 32px',
            borderRadius: '100px',
            gap: '20px',
            textTransform: 'none',
          }}
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/sign-up"
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
          Not a member yet? Sign-up
        </Button>
        <Button
          component={Link}
          to="/forgot-password"
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
          Actually, I forgot my password
        </Button>
      </Box>
      <Snackbar
        open={alertInfo.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ "vertical": "bottom", "horizontal": "center" }}>
        <Alert
          onClose={handleClose}
          severity={alertInfo.variant}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertInfo.info}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;