import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, TextField, Container, Paper, Box, useMediaQuery } from '@mui/material';
import copy from 'clipboard-copy';
import PlanDetails from './PlanDetails';

const roomName = 'Party Room';
const hostName = 'Karen';
const dateOfEvent = 'December 7, 2023 @ 8PM';
const location = 'Current Location';

const JoinPlan = () => {
  // Access the 'code' parameter from the URL
  const { code } = useParams();

  // 'code' contains the value from the URL

  const [userName, setUserName] = useState('');
  const isSmallScreen = useMediaQuery('(max-width:767px)');

  const [copyFeedback, setCopyFeedback] = useState('');

  const handleCopyClick = () => {
    try {
      // Attempt to copy the code to the clipboard
      copy(code);
      setCopyFeedback('Plan code copied to clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      setCopyFeedback('Error copying to clipboard');
    }

    // Clear the feedback after a short delay
    setTimeout(() => {
      setCopyFeedback('');
    }, 2000);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join the Party',
        text: `Join the party with code: ${code}`,
        url: window.location.href,
      })
        .then(() => console.log('Successfully shared'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert(`Share the code: ${code}`);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
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
          <strong>Welcome to the party!</strong>
        </Typography>

        {/* Additional details about the event */}
        <Box mb={2}>
          <Typography variant="body1" sx={{ fontSize: '16px', color: '#333' }}>
            <strong>Last Min Plansss</strong> hosted by Karen
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '14px', color: '#666' }}>
            December 7, 2023 @ 8PM
          </Typography>
        </Box>

        {/* Yellow box with code details and copy/share button */}
        <Box
          sx={{
            backgroundColor: '#C79E34',
            padding: '15px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '40%',
            border: '2px dashed #333',
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>
            Code: {code}
          </Typography>
          {isSmallScreen ? (
            <>
              <Button
                variant="outlined"
                style={{ color: '#1C1C1C' }}
                onClick={handleShareClick}
              >
                Share
              </Button>
              <Typography variant="body2" sx={{ fontSize: '12px', color: 'black', mt: 1 }}>
                Click share to invite your friends
              </Typography>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                style={{ color: '#1C1C1C' }}
                onClick={handleCopyClick}
              >
                Copy
              </Button>
              <Typography variant="body2" sx={{ fontSize: '12px', color: 'black', mt: 1 }}>
                <strong>Invite your friends!</strong> Copy the plan code and share
              </Typography>
              {copyFeedback && (
                <Typography variant="body2" sx={{ fontSize: '14px', color: 'black', mt: 1 }}>
                  {copyFeedback}
                </Typography>
              )}
            </>
          )}
        </Box>

        {/* Text box for the user to enter their name */}
        <TextField
          label="Enter Your Name"
          variant="outlined"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{
            mb: 2,
            width: '40%',
            marginTop: '20px',
            '& label': {
              color: 'black', // Set label color to black
            },
            '& fieldset': {
              borderColor: 'black', // Set border color to black
            },
          }}
        />

        {/* Additional details about the event */}
        <div>
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: '241px',
              height: '53px',
              padding: '16px 32px 16px 32px',
              borderRadius: '100px',
              textTransform: 'none',
              marginTop: '20px',
            }}
          >
            Join Plan
          </Button>
        </div>
        <Button
          variant="text"
          align="center"
          className="login"
          sx={{
            fontFamily: 'Inter',
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '21px',
            letterSpacing: '-0.32px',
            textAlign: 'center',
            color: '#3492C7',
            textTransform: 'none',
            marginTop: '10px',
          }}
        >
          Already have an account? Log In
        </Button>

        {/* Plan details card */}
        <PlanDetails roomName={roomName} hostName={hostName} dateOfEvent={dateOfEvent} location={location} />

      </Paper>
    </Container>
  );
};

export default JoinPlan;
