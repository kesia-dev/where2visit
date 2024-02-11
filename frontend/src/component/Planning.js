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
      subtitle: "Results refer to the number of options you would like to choose from."
    },
    {
      title: "How many matches do you want?",
      subtitle: "Matches refer to the number of restaurants your group has agreed on."
    },

  ];

  const navigate = useNavigate();
  const [step, setStep] = React.useState(0);
  const [selection, setSelection] = useState([]);

  const handleNext = () => {
    setStep(prevStep => (prevStep < steps.length - 1 ? prevStep + 1 : prevStep));
  };

  // Function will add user's selections to the selection array
  const handleSelection = (newSelection) => {
    !selection.includes(newSelection) ? setSelection([...selection, newSelection]) : setSelection(prevSelection => (prevSelection));
  };

  const firstStepSelection = (selection) => {
    handleSelection(selection);
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
        <Paper elevation={3} sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
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
                <Button variant="contained" onClick={event => firstStepSelection(steps[step].buttonLabel1)} color="primary" sx={{ margin: 2, borderRadius: '100px', textTransform: 'none', minWidth: '15vw' }}>
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
                    <Button variant="contained" color="primary" sx={{ marginTop: 2, borderRadius: '100px', textTransform: 'none', minWidth: '15vw' }}>
                      {steps[step].buttonLabel2}
                    </Button>
                    <Button variant="contained" color="primary" sx={{ marginTop: 2, borderRadius: '100px', textTransform: 'none', minWidth: '15vw' }}>
                      {steps[step].buttonLabel3}
                    </Button>
                    <Button variant="contained" color="primary" sx={{ marginTop: 2, borderRadius: '100px', textTransform: 'none', minWidth: '15vw' }}>
                      {steps[step].buttonLabel4}
                    </Button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', margin: 15 }}>
                    <Button variant="contained" color="primary" sx={{ marginTop: 2, borderRadius: '100px', textTransform: 'none', minWidth: '15vw' }}>
                      {steps[step].buttonLabel5}
                    </Button>
                    <Button variant="contained" color="primary" sx={{ marginTop: 2, borderRadius: '100px', textTransform: 'none', minWidth: '15vw' }}>
                      {steps[step].buttonLabel6}
                    </Button>
                    <Button variant="contained" color="primary" sx={{ marginTop: 2, borderRadius: '100px', textTransform: 'none', minWidth: '15vw' }}>
                      {steps[step].buttonLabel7}
                    </Button>
                  </div>
                </Box>

                <div style={{ display: 'flex', alignItems: 'center' }} >
                  <KeyboardDoubleArrowLeftIcon className='backArrows' />

                  <Button variant="contained" color="primary" onClick={goBackHistory} sx={{ margin: 5, marginLeft: 1, borderRadius: '100px', textTransform: 'none', minWidth: '15vw' }}>
                    Create a Plan
                  </Button>
                </div>
              </>
            )}
          </Box>

          {step === 1 && (
            <>
              <PlanningForm />
              <div style={{ display: 'flex', alignItems: 'center' }} >
                <button onClick={handlePrevious} className='backArrows'>
                  <KeyboardDoubleArrowLeftIcon />
                </button>


                <Button variant="contained" color="primary" onClick={handleNext} sx={{ margin: 5, marginLeft: 1, borderRadius: '100px', textTransform: 'none', minWidth: '15vw' }}>
                  Next
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
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

            <RestaurantOptions />

              <div style={{ display: 'flex', alignItems: 'center' }} >
                <button onClick={handlePrevious} className='backArrows'>
                  <KeyboardDoubleArrowLeftIcon />
                </button>

                <Button variant="contained" color="primary" onClick={handleNext} sx={{ margin: 5, marginLeft: 1, borderRadius: '100px', textTransform: 'none', minWidth: '15vw' }}>
                  Next
                </Button>
              </div>
            </>
          )}

          {step > 2 && (
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
              <div style={{ display: 'flex', alignItems: 'center' }} >
                <button onClick={handlePrevious} className='backArrows'>
                  <KeyboardDoubleArrowLeftIcon />
                </button>

                <Button variant="contained" color="primary" onClick={handleNext} sx={{ margin: 5, marginLeft: 1, borderRadius: '100px', textTransform: 'none', minWidth: '15vw' }}>
                  Next
                </Button>
              </div>
            </>
          )}

        </Paper>
      </Container>
    </>
  );
};

export default PlanningCard;

