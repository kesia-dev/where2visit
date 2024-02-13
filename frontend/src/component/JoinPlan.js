import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Button,
  TextField,
  Container,
  Paper,
  Box,
  Grid,
} from '@mui/material';
import copy from 'clipboard-copy';
import PlanDetails from './PlanDetails';

const roomName = 'Party Room';
const hostName = 'Karen';
const dateOfEvent = 'December 7, 2023 @ 8PM';
const location = 'Current Location';

const JoinPlan = () => {
  const { planCode } = useParams();
  const [userName, setUserName] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('');

  const handleCopyClick = () => {
    try {
      copy(planCode);
      setCopyFeedback('Plan code copied to clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      setCopyFeedback('Error copying to clipboard');
    }

    setTimeout(() => {
      setCopyFeedback('');
    }, 2000);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Join the Party',
          text: `Join the party with planCode: ${planCode}`,
          url: window.location.href,
        })
        .then(() => console.log('Successfully shared'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert(`Share the planCode: ${planCode}`);
    }
  };

  const handleJoinPlanClick = async () => {
    if (!planCode) {
      alert('Please enter a valid planCode before joining the plan.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4200/api/checkplanCode/${planCode}`);

      if (response.ok) {
        const data = await response.json();

        if (data.isValid) {
          // Code is valid, you can navigate to the plan details page
          console.log('User code:', planCode);
          console.log('Plan details:', data.planDetails);
        } else {
          // Code is not valid, handle accordingly
          alert('Invalid code. Please enter a valid code.');
        }
      } else {
        // Handle non-OK response status
        console.error('Error checking code:', response.statusText);
        alert('An error occurred while checking the code.');
      }
    } catch (error) {
      console.error('Error checking code:', error);
      alert('An error occurred while checking the code.');
    }
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '40px',
          backgroundColor: '#F2F2F2',
        }}
      >
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

        <Box mb={2}>
          <Typography
            variant="body1"
            sx={{ fontSize: '16px', color: '#333' }}
          >
            <strong>Last Min Plansss</strong> hosted by Karen
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: '14px', color: '#666' }}
          >
            December 7, 2023 @ 8PM
          </Typography>
        </Box>

        <Grid container spacing={2} justifyContent="center" alignItems="center" width={'80%'}>
  <Grid item xs={12} md={6}>
    {/* Invite message */}
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'left',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: '12px',
          color: 'black',
        }}
      >
        <strong>Invite your friends!</strong>
        <br />
        <br /> Tap dotted box to copy your plan code
      </Typography>

      {/* Yellow box with code details */}
      <Box
        onClick={handleCopyClick}
        sx={{
          backgroundColor: '#C79E34',
          padding: '5px',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '30%',
          height: '30px',
          border: '2px dashed #333',
          cursor: 'pointer',
          margin: '10px'
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: '#333' }}
        >
          {planCode}
        </Typography>
        
      </Box>
        {/* Share button inside the box */}
        <Button
          variant="outlined"
          style={{
            color: '#3492C7',
            textTransform: 'none',
            border: 'none',
            marginTop: '10px', 
          }}
          onClick={handleShareClick}
        >
          Share
        </Button>
    </Box>
  </Grid>
</Grid>


        {copyFeedback && (
          <Typography
            variant="body2"
            sx={{ fontSize: '14px', color: 'black', mt: 1 }}
          >
            {copyFeedback}
          </Typography>
        )}
        {/* Text box for the user to enter their name */}
        <TextField
          label="Enter Your Name"
          variant="outlined"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{
            mb: 2,
            width: '50%',
            marginTop: '20px',
            '& label': {
              color: 'black',
            },
            '& fieldset': {
              borderColor: 'black',
            },
          }}
        />

        <div>
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: '100%',
              height: '53px',
              padding: '16px 32px 16px 32px',
              borderRadius: '100px',
              textTransform: 'none',
              marginTop: '20px',
            }}
            onClick={handleJoinPlanClick}
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

        <PlanDetails
    roomName={roomName}
    hostName={hostName}
    dateOfEvent={dateOfEvent}
    location={location}
    sx={{
      backgroundColor: 'black', // Background color for PlanDetails
      padding: '15px',
      borderRadius: '8px',
      marginTop: '20px',
    }}
  />
      </Paper>
    </Container>
  );
};

export default JoinPlan;
