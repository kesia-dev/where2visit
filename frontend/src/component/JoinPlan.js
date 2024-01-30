import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, TextField, Container, Paper, Box } from '@mui/material';
import copy from 'clipboard-copy';

const JoinPlan = () => {
  // Access the 'code' parameter from the URL
  const { code } = useParams();

  // Now 'code' contains the value from the URL

  const [userName, setUserName] = useState('');

  const handleCopyClick = () => {
    // Copy the code to the clipboard
    copy(code);
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        {/* Welcome message */}
        <Typography
          variant="h4"
          component="div"
          sx={{
            mb: 2,
            fontFamily: 'Inter',
            fontWeight: 700,
            color: 'rgba(52, 146, 199, 1)',
          }}
        >
          Welcome to the party!
        </Typography>

        {/* Additional details about the event */}
        <Box mb={2}>
          <Typography variant="body1" sx={{ fontSize: '16px', color: '#333' }}>
            <strong>Last Min Plansss</strong> hosted by Karen
          </Typography>
        </Box>

        {/* Yellow box with code details and copy button */}
        <Box
          sx={{
            backgroundColor: '#C79E34',
            padding: '15px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '30%', // Adjusted width
            border: '2px dashed #333',
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>
            Code: {code}
          </Typography>
          <Button variant="outlined" color="primary" onClick={handleCopyClick}>
            Copy
          </Button>
        </Box>

        <Typography variant="body2" sx={{ fontSize: '14px', color: '#666' }}>
            December 7, 2023 @ 8PM
          </Typography>
      
        {/* Text box for the user to enter their name */}
        <TextField
          label="Enter Your Name"
          variant="outlined"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Additional details about the event */}
        <Typography variant="body2" sx={{ fontSize: '14px', color: '#666' }}>
          Code from URL: {code}
        </Typography>
      </Paper>
    </Container>
  );
};

export default JoinPlan;
