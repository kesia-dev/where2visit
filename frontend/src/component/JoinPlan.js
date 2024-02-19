import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Button,
  TextField,
  Container,
  Paper,
  Box,
  Grid,
  Snackbar,
} from '@mui/material';
import copy from 'clipboard-copy';
import PlanDetails from './PlanDetails';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';

const JoinPlan = () => {
  const { planCode, planName, hostName, dateOfEvent, timeOfEvent, location } = useParams();
  const [userName, setUserName] = useState('');
  const [planDetails, setPlanDetails] = useState(null);
  const [copySnackbarOpen, setCopySnackbarOpen] = useState(false);
  const [joinSnackbarOpen, setJoinSnackbarOpen] = useState(false);

  const handleCloseCopySnackbar = () => {
    setCopySnackbarOpen(false);
  };

  const handleCloseJoinSnackbar = () => {
    setJoinSnackbarOpen(false);
  };

  const handleCopyClick = () => {
    try {
      copy(planCode);
      setCopySnackbarOpen(true);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
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

  const handleJoinPlanClick = () => {
    if (!userName) {
      setJoinSnackbarOpen(true);
      return;
    } else {
      console.log('Navigating to voting page');
    }
  };

  useEffect(() => {
    const fetchPlanDetails = async () => {
      if (!planCode) {
        alert('Please enter a valid planCode before joining the plan.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:4200/plan/get-plan', {
          params: {
            planCode: planCode,
            planName: planName,
            hostName: hostName,
            dateOfEvent: dateOfEvent,
            timeOfEvent: timeOfEvent,
            location: location,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = response.data;

        setPlanDetails({
          planName: data.planName,
          hostName: data.hostName,
          dateOfEvent: data.dateOfEvent,
          timeOfEvent: data.timeOfEvent,
          location: data.location,
        });

      } catch (error) {
        console.error('Error checking code:', error);
        alert('An error occurred while checking the code.');
      }
    };

    fetchPlanDetails();
  }, [planCode, planName, hostName, dateOfEvent, timeOfEvent, location]);

  return (
    <Container component="main" >
      <Paper
        elevation={3}
        sx={{
          paddingTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '40px',
          backgroundColor: '#F2F2F2',
          width: "400px",  
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{
            mb: 2,
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: '28px',
            letterSpacing: '0.36px',
            color: 'rgba(52, 146, 199, 1)',
          }}
        >
          <strong>Welcome to the party!</strong>
        </Typography>

        <Box mb={2} sc={{ width: '386px', textAlign: 'left' }}>
          <Typography
            variant="body1"
            sx={{ fontSize: '16px', color: '#333', width: '386px', textAlign: 'left', letterSpacing: '1.3px', marginLeft: '22px'  }}
          >
            <strong>{planDetails?.planName}</strong> hosted by {planDetails?.hostName}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: '14px', color: '#666', letterSpacing: '0.5px', marginLeft: '22px' }}
          >
            {planDetails?.dateOfEvent} @ {planDetails?.timeOfEvent}
          </Typography>
        </Box>

        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{
            
            width: '386px'
          }}
        >
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                textAlign: 'left',
                justifyContent:"center",
                width: '100%'
              }}
            >
  <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'Left',
    width: '328px'
  }}
>
  <Typography
    variant="body2"
    sx={{
      fontSize: '16px',
      color: 'black',
      width: '170px'
    }}
  >
    <strong>Invite your friends!</strong>
  </Typography>

  <Typography
    variant="body2"
    sx={{
      fontSize: '16px',
      color: 'black',
      letterSpacing: '-0.32px'
    }}
  >
    <br /> Tap dotted box to copy your plan code
  </Typography>
</Box>

              <Box
                onClick={handleCopyClick}
                sx={{
                  backgroundColor: '#E9D8A3',
                  padding: '5px',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '30px',
                  border: '2px dashed #333',
                  cursor: 'pointer',
                  margin: '10px',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: '#333' }}
                >
                  {planCode}
                </Typography>
              </Box>
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

        <Snackbar
          open={copySnackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseCopySnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleCloseCopySnackbar}
            severity="success"
            sx={{ width: '100%' }}
          >
            Plan code copied to clipboard!
          </MuiAlert>
        </Snackbar>

        <TextField
          label="Enter Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{
            mb: 2,
            width: '386px',
            marginTop: '20px',
            '& label': {
              color: 'black',
            },
          }}
        />

        <div>
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: '53px',
              padding: '16px 32px 16px 32px',
              borderRadius: '100px',
              textTransform: 'none',
              marginTop: '20px',
              width: '241px'
            }}
            onClick={handleJoinPlanClick}
          >
            Join Plan
          </Button>
        </div>

        <Snackbar
          open={joinSnackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseJoinSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleCloseJoinSnackbar}
            severity="error"
            sx={{ width: '100%' }}
          >
            Please enter your name before joining.
          </MuiAlert>
        </Snackbar>

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
          planName={planDetails?.planName}
          hostName={planDetails?.hostName}
          dateOfEvent={planDetails?.dateOfEvent}
          timeOfEvent={planDetails?.timeOfEvent}
          location={planDetails?.location}
        />
      </Paper>
    </Container>
  );
};

export default JoinPlan;
