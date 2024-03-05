import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Grid, Button } from '@mui/material';
import StyledTextField from './StyledTextField';
import useLogin from '../hook/useLogin';

const Login = () => {

  const { handleEmailChange, handlePasswordChange, handleLoginAttempt } = useLogin();

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
          Sign-In
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={8} sm={2}>
            <StyledTextField
              label="Email"
              margin="dense"
              variant='filled'
              onChange={handleEmailChange}
            />
            <StyledTextField
              label="Password"
              margin="dense"
              variant='filled'
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
            marginTop: '25px',
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
    </Container>
  );
};

export default Login;