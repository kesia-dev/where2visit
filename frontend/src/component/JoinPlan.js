import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Typography,
  Button,
  TextField,
  Container,
  Box,
  Grid,
  Snackbar,
} from '@mui/material';
import copy from 'clipboard-copy';
import PlanDetails from './PlanDetails';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import '../styling/JoinPlan.css';
import dayjs from 'dayjs';
import { API_BASE_URL } from '../config';

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

  const handleJoinPlanClick = async () => {
    if (!userName.trim()) {
      setJoinSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/plan/join`, {
        userName: userName.trim(),
        planCode: planCode,
      });
      console.log('Joined plan successfully:', response.data);
      // Refresh localStorage before setting the new username, purely for development purposes:
      localStorage.removeItem('userName');
      localStorage.setItem('userName', userName.trim());
      // Redirect to the restaurant plan details page:
      window.location.href = `/restaurant-details/${planCode}`;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('This plan is no longer active. The session has been ended by the host');
      } else if (error.response && error.response.status === 409) {
        alert('Username already exists in this plan. Please choose a different name.');
      } else {
        alert('An error occurred while joining the plan.');
      }
    }
  };

  useEffect(() => {
    const fetchPlanDetails = async () => {
      if (!planCode) {
        alert('Please enter a valid planCode before joining the plan.');
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/plan/get-plan`, {
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
          latitude: data.location.latitude,
          longitude: data.location.longitude,
        });

      } catch (error) {
        console.error('Error checking code:', error);
        alert('An error occurred while checking the code.');
      }
    };

    fetchPlanDetails();
  }, [planCode, planName, hostName, dateOfEvent, timeOfEvent, location]);

  return (
    <Container component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: '30px'
      }} >
      <Typography
        variant="h4"
        component="div"
        sx={{
          mb: 2,
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: '28px',
          lineHeight: '34px',
          letterSpacing: '0.36px',
          color: 'rgba(52, 146, 199, 1)',
          width: "311px",
          marginBottom: '20px'
        }}
      >
        <strong>Welcome to the party!</strong>
      </Typography>

      <Box mb={2} sx={{ width: '385px', textAlign: 'left', color: '#1C1C1C' }}>
        <div style={{ display: 'flex', alignItems: 'left' }}>
          <Typography
            variant="body1"
            sx={{
              marginTop: '10px',
              fontFamily: 'Inter',
              fontWeight: '700',
              fontSize: '22px',
              lineHeight: '28px',
              textAlign: 'left',
              letterSpacing: '0.35px'
            }}
          >
            {planDetails?.planName}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Inter',
              fontWeight: '400',
              fontSize: '16px',
              lineHeight: '23px',
              marginLeft: '5px',
              letterSpacing: '-0.32px',
              alignSelf: 'flex-end'
            }}
          >
            hosted by {planDetails?.hostName}
          </Typography>
        </div>

        <Typography
          variant="body2"
          sx={{
            width: '386px',
            fontSize: '16px',
            color: '#1C1C1C',
            letterSpacing: '-0.32px',
            fontFamily: 'inter',
            fontWeight: '400',
            lineHeight: '21px',
          }}
        >
          {dayjs(planDetails?.dateOfEvent).format('MMMM D, YYYY')} @ {planDetails?.timeOfEvent}
        </Typography>

      </Box>

      <div className='horizontal-line'></div>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{
          margin: '17px',
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
              justifyContent: "center",
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
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '21px',
                  letterSpacing: '-0.32px',
                  color: '#1C1C1C',
                  width: '150px',
                }}
              >
                Invite your friends!
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '21px',
                  letterSpacing: '-0.32px',
                  color: '#1C1C1C',
                  marginTop: '11px'
                }}
              >
                Tap dotted box to copy your plan code
              </Typography>
            </Box>

            <Box
              onClick={handleCopyClick}
              sx={{
                backgroundColor: '#E9D8A3',
                padding: '11px 15px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                border: '2px dashed #1C1C1C',
                cursor: 'pointer',
                margin: '10px',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Montserrat',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '19.5px',
                  color: '#1C1C1C',
                }}
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
                margin: 0,
                fontFamily: 'inter',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '21px',
                letterSpacing: '-0.32px',
                alignItems: 'right',
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

      <div className='horizontal-line'></div>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <label className='input-label'>Enter Your Name</label>
        <TextField
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{
            mb: 2,
            width: '386px',
            marginTop: '10px',
            backgroundColor: '#E5E5E5',
            fontFamily: 'inter'
          }}
        />
      </Box>


      <div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#3492C7',
            height: '53px',
            padding: '16px 32px',
            borderRadius: '100px',
            textTransform: 'none',
            marginTop: '20px',
            width: '241px',
            fontFamily: 'Inter',
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '21px',
            letterSpacing: '-0.32px',
            textAlign: 'center',
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
      <Box
        sx={{          
          marginTop: '30px',          
          background: '#E9D8A3',          
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <PlanDetails
          planName={planDetails?.planName}
          hostName={planDetails?.hostName}
          dateOfEvent={planDetails?.dateOfEvent}
          timeOfEvent={planDetails?.timeOfEvent}
          latitude={planDetails?.latitude}
          longitude={planDetails?.longitude}
        />
      </Box>
    </Container>
  );
};

export default JoinPlan;
