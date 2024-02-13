// Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
