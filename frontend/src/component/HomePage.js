// HomePage.js
import React from 'react';
import { Container, Grid } from '@mui/material';
import '../styling/HomePage.css'; // Import the CSS file
import HomeImage from './HomeImage';
import ReadyToStartText from './ReadyToStartText';
import CreatePlanButton from './CreatePlanButton';
import LoginText from './LoginText';
import JoinCompnents from './JoinComponents';

const HomePage = () => {
  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Grid item>
          <HomeImage />
        </Grid>
        <Grid item>
          <ReadyToStartText />
        </Grid>
        <Grid item>
          <CreatePlanButton />
        </Grid>
        <Grid item>
          <LoginText />
        </Grid>
        <Grid item>
          <JoinCompnents />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
