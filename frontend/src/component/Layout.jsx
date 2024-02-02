import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Typography, Grid, Box, Divider, useScrollTrigger } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LockIcon from '@mui/icons-material/Lock';

const Layout = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '100vh',
        backgroundColor: '#fff',
        overflow: 'auto',
      }}
    >
      <AppBar
        position="fixed"
        style={{
          background: trigger ? '#fff' : 'rgba(230, 247, 255, 0.0)',
          width: '100%',
          margin: 0,
          boxShadow: trigger ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none',
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
            <Grid item xs={1} />
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <div style={{ paddingTop: '64px' }}>
        {children}
      </div>
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: '20px',
          color: '#000',
          width: '100%',
          textAlign: 'left',
          marginTop: '40px',
        }}
      >

        <Divider sx={{ marginTop: '100px', marginBottom: '100px' }} />

        {/* Footer */}

        <Grid container alignItems="center" justifyContent="flex-start">

          <Avatar sx={{ bgcolor: '#1976D2', marginRight: '8px' }}> </Avatar>
          <Typography variant="h6" style={{ fontSize: '3rem', margin: '20px 0' }}>
            Where2Visit
          </Typography>
        </Grid>
        <Typography variant="body2" style={{ fontSize: '2.5rem', display: 'block', margin: '8px 0', color: '#666' }}>
          About | Contact | Help | Privacy Policy | Terms of Service
        </Typography>

        <Divider sx={{ marginTop: '100px' }} />

      </Box>

      {/* Lock and Text Below Footer */}

      <Box
        sx={{
          backgroundColor: '#fff',
          padding: '20px',
          color: '#000',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LockIcon fontSize="large" />
          <Typography variant="h6" style={{ fontSize: '2rem', marginLeft: '10px' }}>
            where2visit.com
          </Typography>
        </Box>
        <Divider sx={{ height: '10px', width: '350px', backgroundColor: 'black', marginTop: '10px', margin: 'auto', borderRadius: '10px' }} />
      </Box>
    </div>
  );
};

export default Layout;
