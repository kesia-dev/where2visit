import React, { useState } from 'react';
import { Typography, Box, Input, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import JoinPlan from './JoinPlan';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const JoinComponents = () => {
  const [enteredCode, setEnteredCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [planDetails, setPlanDetails] = useState(null);

  const navigate = useNavigate();

  const handleCodeChange = (event) => {
    setEnteredCode(event.target.value);
  };

  const handleJoinPlanClick = async () => {
    try {
      setLoading(true);

      // Make an asynchronous request to your server to get plan details
      const response = await axios.get('http://localhost:4200/plan/get-plan', {
        params: {
          planCode: enteredCode,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        // If the code is valid, set isCodeValid to true
        setIsCodeValid(true);
        // Set the plan details to be passed to the JoinPlan component
        setPlanDetails({
          planName: data.planName,
          hostName: data.hostName,
          dateOfEvent: data.dateOfEvent,
          timeOfEvent: data.timeOfEvent,
          location: data.location,
        });

        // Navigate to the JoinPlanPage with the entered code as a parameter
        navigate(`/join-plan/${enteredCode}`);
      } else {
        console.error('Error fetching plan details:', response.statusText);
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error fetching plan details:', error);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    // Close the Snackbar
    setOpenSnackbar(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontFamily: 'Inter',
          fontSize: '22px',
          fontWeight: 700,
          lineHeight: '28px',
          textAlign: 'center',
          color: 'white',
          marginTop: '15px',
          letterSpacing: '0.35px',
          width: '276px',
        }}
      >
        Joining an Existing Plan?
      </Typography>

      <Box
        sx={{
          width: '160px',
          height: '21px',
          padding: '16px 32px 16px 32px',
          borderRadius: '20px',
          border: '3px dotted #1C1C1C',
          gap: '12px',
          background: '#E9D8AE',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20px'
        }}
      >
        <Input
          placeholder="Enter Code"
          disableUnderline
          value={enteredCode}
          onChange={handleCodeChange}
          sx={{
            fontFamily: 'Inter',
            fontSize: '16px',
            fontWeight: 600,
            color: 'black',
            alignItems: 'center',
            letterSpacing: '0.35px',
            lineHeight: '10',
            justifyContent: 'center',
            alignContent: 'center',
            textAlign: 'center',
          }}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleJoinPlanClick}
        sx={{
          width: '235px',
          height: '53px',
          marginTop: '20px',
          padding: '16px 32px 16px 32px',
          borderRadius: '100px',
          gap: '20px',
          textTransform: 'none',
        }}
        disabled={loading}
      >
        {loading ? 'Joining...' : 'Join Plan'}
      </Button>

      {/* Conditionally render JoinPlan based on code validation */}
      {isCodeValid && <JoinPlan planDetails={planDetails} />}

      {/* Snackbar for alerting the user */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="error"
        >
          Please enter a valid code to join the plan.
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default JoinComponents;
