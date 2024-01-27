import React from 'react';
import { Card, CardContent, Typography, Button, Box, TextField } from '@mui/material';

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
      content: '<Strong>Ready to Start?</ Strong>',
      buttonLabel1: 'Create a Plan',
      text: 'Enter code:',
      buttonLabel2: 'Join a Plan',
      linkLabel: 'Already have an account? Login',
    },
  ];

  const [step, setStep] = React.useState(0);

  const handleNext = () => {
    setStep((prevStep) => (prevStep < steps.length - 1 ? prevStep + 1 : prevStep));
  };

  const handleSkip = () => {
    setStep(4); // Skip to the last step
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          {/* Step Image */}
          {step < 4 && <img src={steps[step].image} alt={`Step ${step + 1}`} style={{ maxWidth: '80%' }} />}

          {/* Step Content */}
          <Typography
            variant="body2"
            color="text.secondary"
            dangerouslySetInnerHTML={{ __html: steps[step].content }}
            align='center'
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>

             {/* Create a plan button for Step 5 */}
            <Button variant="contained" color="primary" onClick={handleNext} sx={{ marginTop: 2, borderRadius: '100px', textTransform: 'none', width: '15vw', height: '6.5vh', }}>
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
            <TextField
              label={steps[step].text}
              variant="filled"
              sx={{ width: '15vw',     
              marginTop: '10vh',
              height: '6.5vh',
              fontFamily: 'Inter',
              fontSize:'10px',
              background:
              'linear-gradient(0deg, #C79E34, #C79E34), linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6))',borderRadius: '20px',
              display: 'flex',
              alignItems: 'center', 
              justifyContent: 'center',
             }}
             InputProps={{
                disableUnderline: true, // Remove underline
              }}
            />
            <Button variant="contained" color="primary" onClick={handleNext} sx={{ marginTop: 2, borderRadius: '100px', textTransform: 'none', width: '15vw', height: '6.5vh', }}>
              {steps[step].buttonLabel2}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Instructions;
