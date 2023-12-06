// Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleSignIn = () => {
    // Redirect the user to the Auth0 login page
    loginWithRedirect();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1 }}>
          Where2Visit
        </Typography>
        <Button color="inherit" onClick={handleSignIn}>
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
