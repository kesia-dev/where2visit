import React, { useState, useEffect } from 'react';
import {
  CardContent,
  Typography,
  Button,
  Box,
  MobileStepper,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../styling/Instructions.css';
import { useLocation, useNavigate } from 'react-router-dom';


const Instructions = () => {
  const steps = [
    {
      content1: '<span style="color: black; font-size: 22px;font-weight: 700; font-family: inter">STEP 1: <span style="color: #3492C7; font-size: 22px; ;font-weight: 700; font-family: inter">Select topic</span>',
      content2: '<br><span style="color: #00000099; font-size: 17px; ;font-weight: 400; font-family: inter; letter-spacing: -0.41px; line-height: 22px">Restaurant / Activities / Hotels</span>',
      image1: './assets/food-combo.png',
    },
    {
      content1: '<span style="color: black; font-size: 22px;font-weight: 700; font-family: inter">STEP 2:</span> <span style="color: #3492C7; font-size: 22px; ;font-weight: 700; font-family: inter">Set Preferences</span> ',
      content4: '<br>Select your preferences to filter and find the most suitable options for you and your group',
      image2: "./assets/gray-box.png",
    },
    {
      content1: '<span style="color: black; font-size: 22px;font-weight: 700; font-family: inter">STEP 3:</span> <span style="color: #3492C7; font-size: 22px; ;font-weight: 700; font-family: inter">Share and Vote</span> ', 
      content3: '<span><br>Invite your friends to join and vote for the best choice</span>',
      image3: './assets/online-ordering.png',
    },
    {
      content1: '<span style="color: black; font-size: 22px;font-weight: 700; font-family: inter"> Step 4:</span> <span style="color: #3492C7; font-size: 22px; ;font-weight: 700; font-family: inter"> View Poll Results </span>',
      content2: '<br>Once the votes are collected, see the final matches and enjoy!',
      image4: './assets/winner-cup.png',
    },
    {
      text2: 'Where2Visit',
      text3: 'Ready to Start?',
      shape: {
        width: '20px',
        height: '20px',
        background: '#3492C7',
        borderRadius: '50%',
      },
      buttonLabel1: 'Create a Plan',
      linkLabel: 'Already have an account? Login'
    },
  ];

  const [step, setStep] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const [isOnInstructionsPage, setIsOnInstructionsPage] = useState(
    location.pathname === '/instructions'
  );

  useEffect(() => {
    // Update the state when the location changes
    setIsOnInstructionsPage(location.pathname === '/instructions');
  }, [location]);

  useEffect(() => {
    // Handle initial mount and route change
    document.body.classList.toggle('gradient-background', isOnInstructionsPage);

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove('gradient-background');
    };
  }, [isOnInstructionsPage]);

  const [openInstructions, setOpenInstructions] = useState(true);

  const handleNext = () => {
    setStep((prevStep) => (prevStep < steps.length - 1 ? prevStep + 1 : prevStep));
  };

  const handleSkip = () => {
    setStep(4); // Skip to the last step
  };

  const handleCloseInstructions = () => {
    setOpenInstructions(false);
    navigate('/');
  };
  const handleCreatePlan = () => {
    navigate('/create-plan');
  }

  return (
    <div className="instructions-body">
    <Dialog open={openInstructions} onClose={handleCloseInstructions}>
      <DialogTitle>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleCloseInstructions}
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        > 
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
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

            {/* Step Image and Content */}
            <Box display="flex" flexDirection="column" alignItems="center">
              {step === 0 && <img src={steps[step].image1} alt={`Step ${step + 1}`} style={{ width: '153px', height: '115px', marginTop: '20px', marginBottom: '20px' }} />}
              {step === 1 && <img src={steps[step].image2} alt={`Step ${step + 1}`} style={{ width: '194px', height: '55px', marginTop: '55px', marginBottom: '20px' }} />}
              {step === 2 && <img src={steps[step].image3} alt={`Step ${step + 1}`} style={{ width: '167px', height: '127px', marginTop: '5px', marginBottom: '20px' }} />}
              {step === 3 && <img src={steps[step].image4} alt={`Step ${step + 1}`} style={{ width: '153px', height: '153px' }} />}
              <Typography
                variant="body2"
                color="text.secondary"
                dangerouslySetInnerHTML={{ __html: steps[step].content1 }}
                align="center"
                marginTop={'15px'}
                width={'278px'}
                fontFamily={'Inter'}
                fontWeight={400}
                fontSize={'17px'}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                dangerouslySetInnerHTML={{ __html: steps[step].content2 }}
                align="center"
                width={'278px'}
                fontFamily={'Inter'}
                fontWeight={400}
                fontSize={'17px'}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                dangerouslySetInnerHTML={{ __html: steps[step].content3 }}
                align="center"
                fontFamily={'Inter'}
                width={'278px'}
                fontWeight={400}
                fontSize={'17px'}
                lineHeight={'22px'}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                dangerouslySetInnerHTML={{ __html: steps[step].content4 }}
                align="center"
                fontFamily={'Inter'}
                width={'278px'}
                letterSpacing={'-0.41px'}
                fontWeight={400}
                fontSize={'17px'}
                lineHeight={'22px'}
              />
            </Box>

            {/* Next Button */}
            {step < 4 && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
              <Button variant="contained" color="primary" onClick={handleNext} style={{ borderRadius: '100px', width: '100px', height: '53px' }}>
                Next
              </Button>
            </div>
            
            )}

            {/* Skip Instructions */}
            {step === 0 && (
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  overflowY: '0' }}>

            {/* Ready to start text */}
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ marginTop: '4vh' }}>
              {step === 4 && (
                <div style={{ ...steps[step].shape, marginRight: '10px', marginTop:'-60px' }} />
              )}
              <Typography
                color="black"
                fontFamily="Inter"
                fontWeight={600}
                fontSize="20px"
                lineHeight="25px"
                letterSpacing="0.38px"
                marginTop={'-60px'}
              >
                {steps[step].text2}
              </Typography>
            </Box>
            {/* Ready to start text */}
            <Box style={{  alignItems: 'center', width: '100%', marginBottom: '10vh', marginTop: '10vh' }}>
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

    <Box display="flex" alignItems="center" justifyContent="center" sx={{ marginTop: '4vh' }}>
        {step.shape && <div style={{ ...step.shape, marginRight: '10px' }} />}
        <Typography
          color="black"
          fontFamily="Inter"
          fontWeight={600}
          fontSize="20px"
          lineHeight="25px"
          letterSpacing="0.38px"
        >
          {step.text2}
        </Typography>
      </Box>
      
    <Button variant="contained" color="primary" onClick={handleCreatePlan} sx={{ borderRadius: '100px', textTransform: 'none', width: '200px', height:'50.34px', marginTop: '20px' }}>
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
  </div>
)}

          </CardContent>
        </DialogContent>
      </Dialog>
      </div>
  );
};

export default Instructions;
