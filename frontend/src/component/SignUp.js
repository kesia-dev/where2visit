import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Grid, TextField, Button } from '@mui/material';
import useAlert from '../hook/useAlert';
import StyledTextField from './StyledTextField';

const SignUp = () => {

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleAlertChange, AlertComponent } = useAlert();
  const navigate = useNavigate();

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUpAttempt = async () => {
    try {
      // check if all fields are present
      if (!userName || !email || !password) {
        throw new Error('Please fill in all fields.');
      }

      const signUpData = {
        username: userName,
        email,
        password
      };

      const response = await fetch('http://localhost:4200/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpData)
      });

      if (response.ok) {
        handleAlertChange(`Welcome, ${userName}! You will be redirected to the login page now.`, 'info');
        setTimeout(() => { navigate('/login') }, 2000)
      }

    } catch (error) {
      handleAlertChange(`${error}`, "error");
    }
  };

  // const StyledTextField = styled((props) => (
  //   <TextField InputProps={{ disableUnderline: true }} {...props} />
  // ))(({ theme }) => ({
  //   '& .MuiFilledInput-root': {
  //     overflow: 'hidden',
  //     borderRadius: 4,
  //     backgroundColor: theme.palette.mode === 'light' ? '#e7e7e7' : '#e7e7e7',
  //     border: '1px solid',
  //     borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#E0E3E7',
  //     transition: theme.transitions.create([
  //       'border-color',
  //       'background-color',
  //       'box-shadow',
  //     ]),
  //     '&:hover': {
  //       backgroundColor: 'white',
  //     },
  //     '&.Mui-focused': {
  //       // backgroundColor: 'transparent',
  //       boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
  //       borderColor: theme.palette.primary.main,
  //     },
  //   },
  // }));

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
          variant="h3"
          align="center"
          sx={{
            fontFamily: 'Inter',
            fontWeight: 700,
            letterSpacing: '0.35px',
            textAlign: 'center',
            color: 'white',
            marginTop: '20px',
            marginBottom: '20px'
          }}
        >
          Sign-Up
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={8} sm={2}>
            <StyledTextField
              label="Username"
              defaultValue=""
              variant="filled"
              margin="dense"
              value={userName}
              onChange={handleUserNameChange}
            />
            <StyledTextField
              label="Email"
              defaultValue=""
              variant="filled"
              margin="dense"
              value={email}
              onChange={handleEmailChange}
            />
            <StyledTextField
              label="Password"
              defaultValue=""
              variant="filled"
              margin="dense"
              value={password}
              type='password'
              onChange={handlePasswordChange}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignUpAttempt}
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
          Sign-up!
        </Button>
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
            textTransform: 'none',
          }}
        >
          Already a member? Log-in instead!
        </Button>
      </Box>
      {AlertComponent}
    </Container>
  );
};

export default SignUp;