import React from 'react';
import { Container, Grid, Typography } from '@mui/material';

const SignUpPage = () => {
  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        height="90vh" // Set the height of the container to full viewport height
        spacing={2}
      >        
        <Typography>
          SignUp Page goes here.
        </Typography>
      </Grid>
      {/* Add other content as needed */}
    </Container>
  );
};

export default SignUpPage;
