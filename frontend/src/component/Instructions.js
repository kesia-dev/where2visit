import React, { useState } from 'react';
import { CardContent, Typography, Button, Box, Input, MobileStepper, Snackbar } from '@mui/material';
import JoinPlan from './JoinPlan';
import { useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import '../styling/Instructions.css';
import axios from 'axios';


const Instructions = () => {
  const steps = [
    {
      content: '<strong>Step 1</strong>: Select a topic <br>Restaurant / Activities / Hotels',
      image: './assets/food-combo.png',
    },
    {
      content: '<strong>Step 2</strong>: Set Preferences <br>Select your preferences to filter and find the most suitable options for you and your group',
      image: './assets/gray-box.png',
    },
    {
      content: '<strong>Step 3</strong>: Share and Vote <br>Invite your friends to join and vote for the best choice',
      image: './assets/online-ordering.png',
    },
    {
      content: '<strong>Step 4</strong>: View Poll Results <br>Once the votes are collected, see the final matches and enjoy!',
      image: './assets/winner-cup.png',
    },
    {
      text3: 'Ready to Start?',
      buttonLabel1: 'Create a Plan',
      text: 'Enter code:',
      buttonLabel2: 'Join Plan',
      linkLabel: 'Already have an account? Login',
      image1: './assets/user-steps.png',
      text1: 'Find the latest trends',
      image2: './assets/user-group.png',
      text2: 'Connect with friends',
    },
  ];

  const [step, setStep] = React.useState(0);
  const navigate = useNavigate();
  const [enteredCode, setEnteredCode] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [planDetails, setPlanDetails] = useState(null);

  const handleCodeChange = (event) => {
    setEnteredCode(event.target.value);
  };

  const handleNext = () => {
    setStep((prevStep) => (prevStep < steps.length - 1 ? prevStep + 1 : prevStep));
  };

  const handleSkip = () => {
    setStep(4); // Skip to the last step
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleJoinPlan = async () => {
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

  return (
    <CardContent className="customCardContent" style={{padding: '0px'}}>
      {/* MobileStepper for navigation */}
      <MobileStepper
        variant="dots"
        steps={steps.length}
        position="static"
        activeStep={step}
        sx={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
        dotactivestyle={{ backgroundColor: 'black' }}
        dotstyle={{ backgroundColor: 'grey' }}
      />

      <Box display="flex" flexDirection="column" alignItems="center">
        {/* Step Image */}
        {step < 4 && <img src={steps[step].image} alt={`Step ${step + 1}`} style={{ maxWidth: '80%' }} />}

        {/* Step Content */}
        <Typography
          variant="body2"
          color="text.secondary"
          dangerouslySetInnerHTML={{ __html: steps[step].content }}
          align="center"
          marginTop={'10px'}
          fontFamily={'Inter'}
          fontWeight={400}
          fontSize={'17px'}
        />
      </Box>

      {/* Next Button */}
      {step < 4 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        </div>
      )}

      {/* Skip Instructions */}
      {step < 4 && (
        <Typography
          variant="body2"
          sx={{ textAlign: 'center', marginTop: 2, cursor: 'pointer' }}
          onClick={handleSkip}
          fontSize={'15px'}
          fontFamily={'Inter'}
          color="primary"
        >
          Skip Instructions
        </Typography>
      )}



      {/* Display Buttons for Step 5 */}
      {step === 4 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2, overflowY: '0' }}>

            {/* Ready to start text */}
            <Box style={{ marginTop: 1, alignItems: 'center', width: '100%' }}>
            <Typography
              color="text.secondary"
              align="center"
              fontFamily="Inter"
              fontWeight={700}
              fontSize="22px"
              lineHeight="34px"
              letterSpacing="0.36px"
              sx={{
                width: '100%',
                height: '34px',
                color: 'black',
              }}
            >
              {steps[step].text3}
            </Typography>
          </Box>

          {/* Create a plan button for Step 5 */}
          <Button variant="contained" color="primary" onClick={handleNext} sx={{ marginTop: 2, borderRadius: '100px', textTransform: 'none', minWidth: '15vw' }}>
            {steps[step].buttonLabel1}
          </Button>

          {/* Link label for Step 5 */}
          <Typography
            variant="body2"
            sx={{ textAlign: 'center', marginTop: 1, cursor: 'pointer' }}
            onClick={handleSkip}
            fontSize={'15px'}
            fontFamily={'Inter'}
            color="primary"
          >
            {steps[step].linkLabel}
          </Typography>

          {/* Enter code text field for Step 5 */}
          <Box
            sx={{
              width: '40%',
              marginTop: '5vh',
              height: '1vh',
              padding: '16px 32px 16px 32px',
              borderRadius: '20px',
              border: '1px solid #1C1C1C',
              background: '#E9D8AE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Input
              placeholder={steps[step].text}
              disableUnderline
              value={enteredCode}
              onChange={handleCodeChange}
              sx={{
                fontFamily: 'Inter',
                fontSize: '20px', 
                fontWeight: 600,
                color: 'black',
                letterSpacing: '0.35px',
                lineHeight: '21px',
                width: '100%', 
              }}
            />
          </Box>
          {/* Join Plan button for Step 5 */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleJoinPlan}
            sx={{ marginTop: 1, borderRadius: '100px', textTransform: 'none', minWidth: '15vw', width: 'auto' }}
          >
            {steps[step].buttonLabel2}
            {/* Conditionally render JoinPlan based on code validation */}
            {isCodeValid && <JoinPlan enteredCode={enteredCode} />}
          </Button>
          
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

          {/* Additional images and texts for Step 5 */}
          <Box style={{ marginTop: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <img src={steps[step].image1} alt={`Graphics 1`} style={{ width: '100%' }} />
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              fontFamily="Inter"
              fontWeight={700}
              fontSize="28px"
              lineHeight="34px"
              letterSpacing="0.36px"
              sx={{
                width: '100%',
                height: '34px',
                background: 'rgba(52, 146, 199, 1)',
                color: 'white',
              }}
            >
              {steps[step].text1}
            </Typography>
          </Box>

          <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <img src={steps[step].image2} alt={`Graphics 2`} style={{ width: '100%' }} />
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              fontFamily="Inter"
              fontWeight={700}
              fontSize="28px"
              lineHeight="34px"
              letterSpacing="0.36px"
              sx={{
                width: '100%',
                height: '34px',
                background: 'rgba(199, 158, 52, 1)',
                color: 'white',
              }}
            >
              {steps[step].text2}
            </Typography>
          </Box>
        </div>
      )}
    </CardContent>
  );
};

export default Instructions;
