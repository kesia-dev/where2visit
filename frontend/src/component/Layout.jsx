import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Layout = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '100vh',
        backgroundColor: '#fff',
      }}
    >
      <AppBar
        position="fixed"
        style={{
          background: 'rgba(230, 247, 255, 0.0)',
          width: '100%',
          margin: 0,
        }}
      >
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <IconButton edge="start" color="inherit" aria-label="menu" style={{ color: '#000' }}>
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Avatar sx={{ bgcolor: '#1976D2', marginRight: '8px' }}> </Avatar>
                <Typography variant="h6" align="center" style={{ flexGrow: 1, color: '#000', fontSize: '2rem' }}>
                  Where2Visit
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={1} /> {/* Spacer */}
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {children}
      <Paper
        elevation={0}
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          color: '#000',
          width: '100%',
          textAlign: 'center',
          marginTop: '40px',
        }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Avatar sx={{ bgcolor: '#1976D2', marginRight: '8px' }}> </Avatar>
          <Typography variant="h6" style={{ fontSize: '4rem', margin: '20px 0' }}>
            Where2Visit
          </Typography>
        </Grid>
        <Typography variant="body2" style={{ fontSize: '2.5rem', display: 'block', margin: '8px 0' }}>
          About | Contact | Help | Privacy Policy | Terms of Service
        </Typography>
      </Paper>
    </div>
  );
};

export default Layout;