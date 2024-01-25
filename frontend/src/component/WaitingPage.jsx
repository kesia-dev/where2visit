import React from 'react';
import { Container, CircularProgress, AppBar, Toolbar, IconButton, Avatar, Grid, Paper, Typography, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import ThumbUp from '@mui/icons-material/ThumbUp'; // Import ThumbUp icon

const WaitingPage = () => {
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '100vh',
        backgroundColor: 'gold',
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
      <Typography variant="h4" align="center" style={{ fontSize: '4rem', marginBottom: '40px', marginTop: '30vh' }}>
        Voting still in session!
      </Typography>
      <Typography variant="body2" align="center" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '24px' }}>
        Please wait a moment for everyone to finish voting.
      </Typography>
      <CircularProgress style={{ margin: '160px 0', width: '100px', height: '100px' }} />

      {/* <LocationOnIcon style={{ fontSize: '4rem', color: '#1976D2', marginBottom: '200px' }} /> */}

      <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconButton color="primary" style={{ fontSize: '8rem' }}>
          <ThumbUp fontSize="inherit" />
        </IconButton>
      </Box>

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

export default WaitingPage;
