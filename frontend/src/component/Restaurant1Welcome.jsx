import React from 'react';
import { Typography, Button, Container, Box, IconButton, Paper } from '@mui/material';
import { ArrowBack, ThumbUp, ThumbDown } from '@mui/icons-material';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const Restaurant1Welcome = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNextClick = () => {
    navigate('/Restaurants1');
  };

  return (
    <Layout>
      <Container style={{ backgroundColor: '#1976D2', height: '100vh' }}>
        <Box textAlign="center" mt={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Paper elevation={3} style={{ padding: '30px', width: '80%', backgroundColor: '#fff', borderRadius: '12px' }}>
            <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '3rem' }}>
              Welcome to Last minute plansss 
            </Typography>

            <Typography variant="body2" style={{ margin: '16px', fontSize: '2.5rem' }}>
              Thumbs up or down whatever does or does not interest you. Don't forget to share the poll with friends so they can put in their votes too!
            </Typography>

            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton color="primary">
                <ThumbUp fontSize="large" />
              </IconButton>
              <IconButton color="primary">
                <ThumbDown fontSize="large" />
              </IconButton>
            </Box>

            <Button variant="contained" color="primary" size="large" style={{ marginTop: '20px' }} onClick={handleNextClick}>
              Start voting
            </Button>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
};

export default Restaurant1Welcome;

