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
    <div>
      <Typography
        variant='h3'
        align='center'
        sx={{
          fontFamily: 'Inter',
          fontSize: '22px',
          fontWeight: 700,
          lineHeight: '28px',
          textAlign: 'center',
          color: 'white',
          marginTop: '15px',
        }}
      >
        Joining an Existing Plan?
      </Typography>
      <div>
        <Box
          sx={{
            width: '182px',
            height: '21px',
            padding: '16px 32px 16px 32px',
            borderRadius: '20px',
            border: '1px solid #1C1C1C',
            gap: '12px',
            background: '#E9D8AE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
              lineHeight: '21px',
              justifyContent: 'center',
              alignContent: 'center'
            }}
          />
        </Box>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleJoinPlanClick}
          sx={{
            width: '241px',
            height: '53px',
            marginTop: '15px',
            padding: '16px 32px 16px 32px',
            borderRadius: '100px',
            gap: '20px',
            textTransform: 'none',
          }}
          disabled={loading}
        >
          {loading ? 'Joining...' : 'Join Plan'}
        </Button>
      </div>

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
          Please enter a valid code before joining the plan.
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default JoinComponents;
