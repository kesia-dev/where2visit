import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Typography, Grid, Box, CircularProgress, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LockIcon from '@mui/icons-material/Lock';

const Planning6 = () => {
  return (
    <div>
      <AppBar
        position="fixed"
        style={{
          background: '#b3e0ff', // Set to the same color as the main background
          width: '100%',
          margin: 0,
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <IconButton edge="start" color="inherit" aria-label="menu" style={{ color: '#000', fontSize: '2rem' }}>
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
      <Box
        sx={{
          backgroundColor: '#b3e0ff', // Blue background color
          minHeight: '100vh', // Ensure it covers the entire viewport height
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '15vh', // Adjust vertical spacing
        }}
      >
        <Typography variant="h4" align="center" style={{ fontSize: '5rem', fontWeight: 'bold', marginBottom: '40px' }}>
          Your plan is being created!
        </Typography>
        <Typography variant="body2" align="center" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '24px' }}>
          Please wait a moment while we generate your results.
        </Typography>
        <CircularProgress
          style={{ margin: '160px 0', width: '160px', height: '160px' }}
          thickness={8}
          sx={{
            color: (theme) => (theme.palette.mode === 'light' ? '#6FA3EF' : '#308fe8'),
            transition: 'color 0.5s ease', // Smooth transition for color change
          }}
        />
        <LocationOnOutlinedIcon style={{ fontSize: '7rem', color: 'black', marginBottom: '200px' }} />
      </Box>
      {/* Footer */}
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
  <Grid container alignItems="center" justifyContent="flex-start"> {/* Adjust justifyContent */}
    <Avatar sx={{ bgcolor: '#1976D2', marginRight: '8px' }}> </Avatar>
    <Typography variant="h6" style={{ fontSize: '3rem', margin: '20px 0' }}>
      Where2Visit
    </Typography>
  </Grid>
  <Typography variant="body2" style={{ fontSize: '2.5rem', display: 'block', margin: '8px 0', color: '#666' }}>
  About | Contact | Help | Privacy Policy | Terms of Service
</Typography>

  {/* Black line */}
  <Divider sx={{ marginTop: '100px' }} />
  {/* Lock icon with text */}
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '30px', marginBottom: '30px' }}>
    <LockIcon fontSize="large" />
    <Typography variant="h6" style={{ fontSize: '2rem', marginLeft: '10px' }}>
      where2visit.com
    </Typography>
  </Box>
  <Divider sx={{ height: '10px', width: '350px', backgroundColor: 'black', marginTop: '10px', margin: 'auto',  borderRadius: '10px' }} />
</Box>

    </div>
  );
};

export default Planning6;
