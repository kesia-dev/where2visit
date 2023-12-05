import React from 'react';
import { Container, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
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
            to="/create-room"
            variant="contained"
            color="primary"
            mt={2}
          >
            Create Room
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to="/join-room"
            variant="contained"
            color="secondary" // Set a different color for the Join Room button
            mt={2}
          >
            Join Room
          </Button>
        </Grid>
      </Grid>
      {/* Add other content as needed */}
    </Container>
  );
};

export default HomePage;
