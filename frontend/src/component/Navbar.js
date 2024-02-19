// Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar, Popover } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, useTheme } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import useNavbar from '../hook/useNavbar';

const Navbar = () => {
  const { handleMenuIconClick, handleAvatarClick, handlePopoverClose, handleMenuClose, popoverAnchorEl, anchorEl } = useNavbar();
  const { isLoggedIn, clearAuthData, userData } = useAuth();
  const { AlertComponent } = useAlert(); // the global alert component
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

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
                  <br />
                  {userData?.verified ?
                    'Email is verified' : 'Email not verified'
                  }
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
        {AlertComponent}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
