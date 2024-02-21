import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, useTheme } from '@mui/material';
import '@fontsource/inter';

const Navbar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Check if the current path is '/instructions'
  const isInstructionsPage = location.pathname === '/instructions';

  // Render the Navbar only if not on the '/instructions' path
  if (isInstructionsPage) {
    return null;
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none' }}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuIconClick}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              marginLeft: '10px',
              background: '#3492C7',
              borderRadius: '50%',
              display: 'block',
            }}
          />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'black',
              textTransform: 'none',
              marginLeft: '10px',
              fontFamily: 'Inter',
              fontSize: '20px',
              fontWeight: 600,
              lineHeight: '25px',
              letterSpacing: '0.38px',
              textAlign: 'center',
              display: 'block',
            }}
          >
            Where2Visit
          </Typography>
        </div>
        <div>
          <Button color="inherit" sx={{ textTransform: 'none', marginLeft: '20px', fontSize: '16px',fontFamily: 'Inter',
              fontWeight: 600,
              lineHeight: '21px',
              letterSpacing: '-0.32px',
              textAlign: 'Right',
              display: 'block', }}>
            Login
          </Button>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ marginTop: isSmallScreen ? '0' : '5px' }}
          >
            <MenuItem onClick={handleMenuClose} component={Link} to="/create-plan">
              Create a Plan
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/join-plan">
              Join a Plan
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
