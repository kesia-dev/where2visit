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

        console.log('Plan details:', data.planName);
      } catch (error) {
        console.error('Error checking code:', error);
        alert('An error occurred while checking the code.');
      }
    };

    fetchPlanDetails();
  }, [planCode, planName, hostName, dateOfEvent, timeOfEvent, location]);

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
            <strong>{planDetails?.planName}</strong> hosted by {planDetails?.hostName}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: '14px', color: '#666' }}
          >
            {planDetails?.dateOfEvent} @ {planDetails?.timeOfEvent}
          </Typography>
        </Box>

        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          width={'80%'}
        >
          <Grid item xs={12} md={6}>
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
          variant="outlined"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{
            mb: 2,
            width: '40%',
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
            Please enter user name before joining the plan.
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
