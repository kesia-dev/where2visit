import React from 'react';
import { Container, CircularProgress, AppBar, Toolbar, IconButton, Avatar, Grid, Paper, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';

const PlanCreatedPage = () => {
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '100vh',
        backgroundColor: '#b3e0ff',

      }}
    >
      <AppBar
        position="fixed"
        style={{
          background: '#b3e0ff',
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
            <Grid item xs={1} />
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Typography variant="h4" align="center" style={{ fontSize: '6rem', marginBottom: '40px', marginTop: '20vh' }}>
        Your plan is being created!
      </Typography>
      <Typography variant="body2" align="center" style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '24px' }}>
        Please wait a moment while we generate your results.
      </Typography>
      <CircularProgress style={{ margin: '160px 0', width: '100px', height: '100px' }} />
      <LocationOnIcon style={{ fontSize: '4rem', color: '#1976D2', marginBottom: '200px' }} />
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
    </Container>
  );
};

export default PlanCreatedPage;
