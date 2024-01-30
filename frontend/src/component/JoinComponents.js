import React, { useState } from 'react';
import { Typography, Box, Input, Button } from '@mui/material';
import JoinPlan from './JoinPlan';
import { useNavigate } from 'react-router-dom';

const JoinComponents = () => {
  const [enteredCode, setEnteredCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);

  const navigate = useNavigate();

  const handleCodeChange = (event) => {
    setEnteredCode(event.target.value);
  };

  const handleJoinPlanClick = () => {
    // Example validation logic (replace this with your actual validation)
    const isValid = enteredCode.trim() !== ''; // Check if the code is not empty

    if (isValid) {
      // Navigate to the JoinPlanPage with the entered code as a parameter
      navigate(`/join-plan/${enteredCode}`);
    }
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
            background:'#C79E34',
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
        >
          Join Plan
        </Button>
      </div>

      {/* Conditionally render JoinPlan based on code validation */}
      {isCodeValid && <JoinPlan enteredCode={enteredCode} />}
    </div>
  );
};

export default JoinComponents;
