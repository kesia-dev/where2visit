// Navbar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar, Popover } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, useTheme } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, clearAuthData, userData } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);

  const handleMenuIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAvatarClick = (event) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {isSmallScreen && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuIconClick}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: 'none', color: 'black', textTransform: 'none' }}

        >
          Where2Visit
        </Typography>
        {!isLoggedIn() ?
          <Button
            component={Link}
            to="/login"
            color="inherit"
            sx={{ textTransform: 'none' }}

          >Login</Button>
          : (
            <div>
              <IconButton onClick={handleAvatarClick}>
                <Avatar sx={{ bgcolor: '#3492C7' }} alt={userData?.userName || ''}>
                  {userData?.userName?.charAt(0).toUpperCase() || ''}
                </Avatar>
              </IconButton>
              <Popover
                open={Boolean(popoverAnchorEl)}
                anchorEl={popoverAnchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <Typography sx={{ p: 2 }}>
                  Username: {userData?.userName || ''}
                  <br />
                  Email: {userData?.email || ''}
                  {/* Add more user information here */}
                </Typography>
              </Popover>
              <Button
                color="inherit"
                sx={{ textTransform: 'none' }}
                onClick={() => {
                  clearAuthData();
                  navigate(`/`);
                }}
              >
                Logout
              </Button>
            </div>
          )
          // <Button
          // color="inherit"
          // sx={{ textTransform: 'none' }}
          // onClick={() => {
          //   clearAuthData()
          //   navigate(`/`);
          // }}
          // >
          //   Logout
          // </Button>
        }
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ marginTop: isSmallScreen ? '0' : '5px' }} // Adjust the marginTop value
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/create-plan">
            Create a Plan
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/join-plan">
            Join a Plan
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
