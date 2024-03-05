import React from 'react';
import { Container, Box, Typography, Grid, Button } from '@mui/material';
import StyledTextField from './StyledTextField';
import useResetPassword from '../hook/useResetPassword';

const ResetPassword = () => {

  const { handlePasswordChange, handleResetPassword } = useResetPassword();

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
            fontWeight: 700,
            letterSpacing: '0.35px',
            textAlign: 'center',
            color: 'white',
            marginTop: '20px',
            marginBottom: '20px'
          }}
        >
          Enter your new password
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={8} sm={2}>
            <StyledTextField
              label="Password"
              type='password'
              margin="normal"
              variant='filled'
              // value={password}
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
    </Container>
  );
};

export default ResetPassword;