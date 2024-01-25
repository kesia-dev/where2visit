import React from 'react';
import { Typography, Button, Container, Box, IconButton, Paper } from '@mui/material';
import { ArrowBack, ThumbUp, ThumbDown } from '@mui/icons-material';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const Restaurant1Vote = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNextClick = () => {
    navigate('/Restaurants1Members');
  };

  return (
    <Layout>
      <Container style={{ backgroundColor: '#1976D2', height: '100vh' }}>
        <Box textAlign="center" mt={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Paper elevation={3} style={{ padding: '30px', width: '80%', backgroundColor: '#fff', borderRadius: '12px' }}>


            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton color="primary">
                <ThumbUp fontSize="large" />
              </IconButton>

            </Box>

            <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '3rem' }}>
              Voted
            </Typography>

            <Typography variant="body2" style={{ margin: '16px', fontSize: '2.5rem' }}>
              list of people who have voted
            </Typography>

            <Button variant="contained" color="primary" size="large" style={{ marginTop: '20px' }} onClick={handleNextClick}>
              Continue voting
            </Button>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
};

export default Restaurant1Vote;