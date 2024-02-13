import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, MobileStepper, Box, Typography, Button } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import "../styling/Planning.css";
import PlanningForm from './PlanningForm';
import RestaurantOptions from './RestaurantOptions';

const PlanningCard = () => {
  const steps = [
    {
      title: "What would you like to do?",
      subtitle: "COMING SOON:",
      buttonLabel1: "Restaurants",
      buttonLabel2: "Local Attractions",
      buttonLabel3: "Shopping",
      buttonLabel4: "Nightlife",
      buttonLabel5: "Arts & Entertainment",
      buttonLabel6: "Beauty & Spa",
      buttonLabel7: "Hotel & Travel",
    },
    {
      title: "Let's make your plans"
    },
    {
      title: "Set your preferences",
      subtitle: "Select all that apply"
    },
    {
      title: "How many results do you want?",
      subtitle: "Results refer to the number of options you would like to choose from.",
      buttonLabel1: "3",
      buttonLabel2: "5",
      buttonLabel3: "10",
      buttonLabel4: "15+",

    },
    {
      title: "How many matches do you want?",
      subtitle: "Matches refer to the number of restaurants your group has agreed on.",
      buttonLabel1: "1",
      buttonLabel2: "3",
      buttonLabel3: "5",
      buttonLabel4: "Custom"
    },

  ];

  const navigate = useNavigate();
  const [step, setStep] = React.useState(0);
  const [selection, setSelection] = useState([]);

  const handleNext = () => {
    setStep(prevStep => (prevStep < steps.length - 1 ? prevStep + 1 : prevStep));
  };

  const handleSkip = () => {
    setStep(3); // Skip to the last step
  };

  // Function will add user's selections to the selection array
  const handleSelection = (newSelection) => {
    selection.includes(newSelection) ? selection.filter((item) => item !== newSelection) : setSelection([...selection, newSelection]);
  };

  const firstStepSelection = (newSelection) => {
    handleSelection(newSelection);
    handleNext();
  };

  // Function will take user back to the last visited page
  const goBackHistory = () => {
    navigate(-1);
  };

  const handlePrevious = () => {
    setStep(prevStep => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  return (
    <>
      <Container component="main" maxWidth="md">
        <Paper elevation={3} sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px', minHeight: '80vh' }}>
          {/* MobileStepper for navigation */}
          <MobileStepper
            variant="dots"
            steps={steps.length}
            position="static"
            activeStep={step}
            sx={{ alignItems: 'center', justifyContent: 'center' }}
            dotactivestyle={{ backgroundColor: 'black' }}
            dotstyle={{ backgroundColor: 'grey' }}
          />

          <Box display="flex" flexDirection="column" alignItems="center">
            {/* Step Title */}
            <Typography
              color="text.secondary"
              noWrap={true}
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
              {steps[step].title}
            </Typography>

            {step === 0 && (
              <>
                {/* Step 1 Content */}
                <Button variant="outlined" onClick={() => firstStepSelection(steps[step].buttonLabel1)} style={{ backgroundColor: '#aed3e9', color: '#153a50', border: 'none' }} sx={{ marginTop: 4, marginBottom: 4, borderRadius: '10px', textTransform: 'none', maxWidth: '60vw', minHeight: '5vh' }} >
                  {steps[step].buttonLabel1}
                </Button>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  dangerouslySetInnerHTML={{ __html: steps[step].subtitle }}
                  align="center"
                  marginTop={'10px'}
                  fontFamily={'Inter'}
                  fontWeight={400}
                  fontSize={'17px'}
                />

                <Box display="flex" alignItems="center">
                  <div style={{ display: 'flex', flexDirection: 'column', margin: 15 }}>
                    <Button variant="outlined" style={{ backgroundColor: '#aed3e9', color: '#153a50', border: 'none' }} sx={{ marginTop: 2, borderRadius: '10px', textTransform: 'none', minWidth: '40vw', minHeight: '5vh' }}>
                      {steps[step].buttonLabel2}
                    </Button>
                    <Button variant="outlined" style={{ backgroundColor: '#aed3e9', color: '#153a50', border: 'none' }} sx={{ marginTop: 2, borderRadius: '10px', textTransform: 'none', minWidth: '40vw', minHeight: '5vh' }}>
                      {steps[step].buttonLabel3}
                    </Button>
                    <Button variant="outlined" style={{ backgroundColor: '#aed3e9', color: '#153a50', border: 'none' }} sx={{ marginTop: 2, borderRadius: '10px', textTransform: 'none', minWidth: '40vw', minHeight: '5vh' }}>
                      {steps[step].buttonLabel4}
                    </Button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', margin: 15 }}>
                    <Button variant="outlined" style={{ backgroundColor: '#aed3e9', color: '#153a50', border: 'none' }} sx={{ marginTop: 2, borderRadius: '10px', textTransform: 'none', minWidth: '40vw', minHeight: '5vh' }}>
                      {steps[step].buttonLabel5}
                    </Button>
                    <Button variant="outlined" style={{ backgroundColor: '#aed3e9', color: '#153a50', border: 'none' }} sx={{ marginTop: 2, borderRadius: '10px', textTransform: 'none', minWidth: '40vw', minHeight: '5vh' }}>
                      {steps[step].buttonLabel6}
                    </Button>
                    <Button variant="outlined" style={{ backgroundColor: '#aed3e9', color: '#153a50', border: 'none' }} sx={{ marginTop: 2, borderRadius: '10px', textTransform: 'none', minWidth: '40vw', minHeight: '5vh' }}>
                      {steps[step].buttonLabel7}
                    </Button>
                  </div>
                </Box>

                <div style={{ display: 'flex', alignItems: 'center' }} >
                  <KeyboardDoubleArrowLeftIcon className='backArrows' />

                  <Button variant="contained" color="primary" style={{ backgroundColor: '#3492c7' }} onClick={goBackHistory} sx={{ margin: 5, marginLeft: 1, borderRadius: '100px', textTransform: 'none', minWidth: '20vw' }}>
                    Create a Plan
                  </Button>
                </div>
              </>
            )}


            {step === 1 && (
              <>
                <PlanningForm />
                <div style={{ display: 'flex', alignItems: 'center' }} >
                  <button onClick={handlePrevious} className='backArrows'>
                    <KeyboardDoubleArrowLeftIcon />
                  </button>


                  <Button variant="contained" color="primary" style={{ backgroundColor: '#3492c7' }} onClick={handleNext} sx={{ margin: 5, marginLeft: 1, borderRadius: '100px', textTransform: 'none', minWidth: '20vw' }}>
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <Typography
                  variant="body2"
                  sx={{ textAlign: 'center', marginTop: 2, cursor: 'pointer' }}
                  onClick={handleSkip}
                  fontSize={'15px'}
                  fontFamily={'Inter'}
                  color="primary"
                  className='skipPreferences'
                >
                  Skip
                </Typography>

                <Typography
                  variant="p"
                  noWrap={false}
                  dangerouslySetInnerHTML={{ __html: steps[step].subtitle }}
                  align="center"
                  marginTop={'2px'}
                  fontFamily={'Inter'}
                  fontWeight={400}
                  fontSize={'14px'}
                />

                <RestaurantOptions selection={selection} handleSelection={handleSelection} />

                <div style={{ display: 'flex', alignItems: 'center' }} >
                  <button onClick={handlePrevious} className='backArrows'>
                    <KeyboardDoubleArrowLeftIcon />
                  </button>

                  <Button variant="contained" color="primary" style={{ backgroundColor: '#3492c7' }} onClick={handleNext} sx={{ margin: 5, marginLeft: 1, borderRadius: '100px', textTransform: 'none', minWidth: '20vw' }}>
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <Typography
                  variant="p"
                  noWrap={false}
                  dangerouslySetInnerHTML={{ __html: steps[step].subtitle }}
                  align="center"
                  marginTop={'2px'}
                  fontFamily={'Inter'}
                  fontWeight={400}
                  fontSize={'14px'}
                />

                <div style={{ display: 'flex', alignItems: 'center', margin: '15px' }} >
                  <Button variant="outlined" style={{ backgroundColor: '#aed3e9', color: '#153a50', border: 'none', marginRight: '10px' }} sx={{ marginTop: 2, borderRadius: '10px', textTransform: 'none', minHeight: '5vh' }}>
                    {steps[step].buttonLabel1}
                  </Button>
                  <Button variant="outlined" style={{ backgroundColor: '#aed3e9', color: '#153a50', border: 'none', marginRight: '10px' }} sx={{ marginTop: 2, borderRadius: '10px', textTransform: 'none', minHeight: '5vh' }}>
                    {steps[step].buttonLabel2}
                  </Button>
                  <Button variant="outlined" style={{ backgroundColor: '#aed3e9', color: '#153a50', border: 'none', marginRight: '10px' }} sx={{ marginTop: 2, borderRadius: '10px', textTransform: 'none', minHeight: '5vh' }}>
                    {steps[step].buttonLabel3}
                  </Button>
                  <Button variant="outlined" style={{ backgroundColor: '#aed3e9', color: '#153a50', border: 'none' }} sx={{ marginTop: 2, borderRadius: '10px', textTransform: 'none', minHeight: '5vh' }}>
                    {steps[step].buttonLabel4}
                  </Button>
                </div>


                <div style={{ display: 'flex', alignItems: 'center' }} >
                  <button onClick={handlePrevious} className='backArrows'>
                    <KeyboardDoubleArrowLeftIcon />
                  </button>

                  <Button variant="contained" color="primary" style={{ backgroundColor: '#3492c7' }} onClick={handleNext} sx={{ margin: 5, marginLeft: 1, borderRadius: '100px', textTransform: 'none', minWidth: '20vw' }}>
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <Typography
                  variant="p"
                  noWrap={false}
                  dangerouslySetInnerHTML={{ __html: steps[step].subtitle }}
                  align="center"
                  marginTop={'2px'}
                  fontFamily={'Inter'}
                  fontWeight={400}
                  fontSize={'14px'}
                />

                <div style={{ display: 'flex', alignItems: 'center', margin: '15px' }} >
                  <Button variant="outlined" style={{ backgroundColor: '#aed3e9', color: '#153a50', border: 'none', marginRight: '10px' }} sx={{ marginTop: 2, borderRadius: '10px', textTransform: 'none', minHeight: '5vh' }}>
                    {steps[step].buttonLabel1}
                  </Button>
                  <Button variant="outlined" style={{ backgroundColor: '#aed3e9', color: '#153a50', border: 'none', marginRight: '10px' }} sx={{ marginTop: 2, borderRadius: '10px', textTransform: 'none', minHeight: '5vh' }}>
                    {steps[step].buttonLabel2}
                  </Button>
                  <Button variant="outlined" style={{ backgroundColor: '#aed3e9', color: '#153a50', border: 'none', marginRight: '10px' }} sx={{ marginTop: 2, borderRadius: '10px', textTransform: 'none', minHeight: '5vh' }}>
                    {steps[step].buttonLabel3}
                  </Button>
                  <Button variant="outlined" style={{ backgroundColor: '#aed3e9', color: '#153a50', border: 'none' }} sx={{ marginTop: 2, borderRadius: '10px', textTransform: 'none', minHeight: '5vh' }}>
                    {steps[step].buttonLabel4}
                  </Button>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center' }} >
                  <button onClick={handlePrevious} className='backArrows'>
                    <KeyboardDoubleArrowLeftIcon />
                  </button>
                  <Button variant="contained" color="primary" style={{ backgroundColor: '#3492c7' }} onClick={handleNext} sx={{ margin: 5, marginLeft: 1, borderRadius: '100px', textTransform: 'none', minWidth: '20vw' }}>
                    Create Plan
                  </Button>
                </div>

              </>
            )}
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default PlanningCard;

 