import React from 'react';
import { Container, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const SignInPage = () => {
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
        <Grid item>
          <Button
            component={Link}
            to="/sign-up"
            variant="contained"
            color="secondary" // Set a different color for the Join Room button
            mt={2}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
      {/* Add other content as needed */}
    </Container>
  );
};

export default SignInPage;
