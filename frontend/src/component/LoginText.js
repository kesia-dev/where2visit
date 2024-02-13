// LoginText.js
import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const LoginText = () => {
  return (
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
      Already have an account? Log In
    </Button>
  );
};

export default LoginText;
