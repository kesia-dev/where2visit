import React, { useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import '../styling/HomePage.css';
import HomeImage from './HomeImage';
import ReadyToStartText from './ReadyToStartText';
import CreatePlanButton from './CreatePlanButton';
import LoginText from './LoginText';
import JoinCompnents from './JoinComponents';

const HomePage = () => {
  useEffect(() => {
    // Apply background styles when the component mounts
    document.body.style.background = 'linear-gradient(179.94deg, rgba(0, 0, 0, 0) -0.4%, rgba(0, 0, 0, 0.6) 72.52%), linear-gradient(0deg, #3492C7, #3492C7)';

    // Remove background styles when the component unmounts
    return () => {
      document.body.style.background = 'initial';
    };
  }, []);

  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="auto"
        sx={{
          marginTop: '40px',
        }}
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
