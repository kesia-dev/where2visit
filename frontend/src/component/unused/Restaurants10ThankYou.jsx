import React from 'react';
import { Typography, Button, Container, Box, IconButton, Paper } from '@mui/material';
import { ThumbUp } from '@mui/icons-material';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const Restaurants10ThankYou = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNextClick = () => {
    navigate('/WaitingPage');
  };

  return (
    <Layout>
      <Container style={{ backgroundColor: '#1976D2', height: '100vh' }}>
        <Box textAlign="center" mt={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Paper elevation={3} style={{ padding: '30px', width: '80%', backgroundColor: '#fff', borderRadius: '12px' }}>

            <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '3rem' }}>
              Thank you for voting
            </Typography>

            <Typography variant="body2" style={{ margin: '16px', fontSize: '2.5rem' }}>
              Let's see what your friends have voted for
            </Typography>

            <Button variant="contained" color="primary" size="large" style={{ marginTop: '20px' }} onClick={handleNextClick}>
              View polls
            </Button>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
};

export default Restaurants10ThankYou;
