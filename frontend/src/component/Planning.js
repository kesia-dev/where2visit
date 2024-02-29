import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTerm, addNumberOfMatches, addNumberOfResults, addPlanName, addHostName, addDate, addTime, addLocation, addRadius } from '../features/userOptions/optionsSlice';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, MobileStepper, Box, Typography, Button, Grid, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import "../styling/Planning.css";
import PlanningForm from './PlanningForm';
import RestaurantOptions from './RestaurantOptions';
import axios from 'axios';

const PlanningCard = () => {
  const steps = [
    {
      title: `<span class="title-star">*</span> What would you like to do?`,
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
      title: `<span class="title-star">*</span> Let's make your plans`
    },
    {
      title: "Set your preferences",
      subtitle: "Select all that apply"
    },
    {
      title: `<span class="title-star">*</span> How many <span class="title-color"> results </span> do you want?`,
      subtitle: "Results refer to the number of options you would like to choose from.",
      buttonLabel1: "3",
      buttonLabel2: "5",
      buttonLabel3: "10",
      buttonLabel4: "15",
    },
    {
      title: `<span class="title-star">*</span> How many <span class="title-color"> matches </span> do you want?`,
      subtitle: "Matches refer to the number of restaurants your group has agreed on.",
      buttonLabel1: "1",
      buttonLabel2: "3",
      buttonLabel3: "5",
    },
  ];

  const options = useSelector(state => state.options);
  const { term, numberOfResults: results, numberOfMatches: matches, cuisine, priceRange: price } = options;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = React.useState(0);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Function to close Snackbars
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(prev => !prev ? prev : !prev);
  };

  const handleSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleNext = () => {

    if (step === 0 && term.length < 4) {
      handleSnackbar('Please select one option.');
      return;
    }

    if (step === 2) {
      if (cuisine === "") {
        handleSnackbar('Please select Cuisine Type.');
        return;
      }
      if (price === "") {
        handleSnackbar('Please select Price Range.');
        return;
      }
    }

    setStep(prevStep => (prevStep < steps.length - 1 ? prevStep + 1 : prevStep));
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const handlePrevious = () => {
    setStep(prevStep => (prevStep > 0 ? prevStep - 1 : prevStep));
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  // Function to check if a button is selected
  const isAdded = (state, buttonLabel) => {
    return state === buttonLabel;
  };

  // Function will take user back to the last visited page
  const goBackHistory = () => {
    navigate(-1);
  };

  const handleTerm = value => dispatch(addTerm(value));

  const handleResults = (value) => {
    dispatch(addNumberOfResults(value));
    handleNext();
  };

  const handleMatches = (value) => {
    if (value <= Number(results) ) {
      dispatch(addNumberOfMatches(value));
    }
  };

  const renderFinalStepButtons = (buttonLabels, onClickHandler, state) => {
    return buttonLabels.map((label, index) => {
      let disabled = false;

      // Check if the button is for "Number of Matches" and "Number of Results" is 3
      // Disable number of matches higher than number of results selected
      if (step >= 3 && label === '5' && index === 2 && results === '3') {
        disabled = true;
      }

      return (
        <Button
          key={index}
          variant="outlined"
          onClick={() => onClickHandler(label)}
          style={{
            backgroundColor: disabled ? '#E0E0E0' : isAdded(state, label) ? '#153a50' : '#aed3e9',
            color: disabled ? '#BDBDBD' : isAdded(state, label) ? '#aed3e9' : '#153a50',
          }}
          disabled={disabled} 
        >
          {label}
        </Button>
      );
    });
  };


  const [formData, setFormData] = useState({
    planName: '',
    hostName: '',
    date: '',
    time: '',
    location: '',
    locationName: '',
    radius: 5,
  });

  // Next button for step 2
  const handleClickNextButtonForm = () => {

    if (
      formData.planName === "" ||
      formData.hostName === "" ||
      formData.date === "" ||
      formData.time === ""
    ) {
      handleSnackbar('Please fill out all fields.');
      return;
    }

    if (formData.location === "") {
      handleSnackbar('Select a valid location.');
      return;
    }

    dispatch(addPlanName(formData.planName));
    dispatch(addHostName(formData.hostName));
    dispatch(addDate(formData.date));
    dispatch(addTime(formData.time));
    dispatch(addLocation(formData.location));
    dispatch(addRadius(formData.radius * 1000)); // value multiplied by 1000 to convert from km to m
    handleNext();
    console.log('Next button clicked: ', formData);
  };

  const completePlan = async () => {
    console.log("Plan complete: Save info to DB and do API call");
    console.log("States to be shared: ", options);

    if (step > 2) {
      if (!results) {
        handleSnackbar('Please select Number of Results.');
        return;
      }
      if (!matches) {
        handleSnackbar('Please select Number of Matches.');
        return;
      }
    }

    try {
      // API call to save details to DB and search restaurants
      const response = await axios.post('http://localhost:4200/plan/create-plan', options);
      console.log('Response from server: ', response.data);
      const { roomId } = response.data;

      // navigate to Poll-options/Voting screen
      navigate(`/restaurant-details/${roomId}`);
    }
    catch (error) {
      console.error('Error saving plan to DB: ', error);
    }
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
            {step < 4 && (
              <Typography
                color="text.secondary"
                noWrap={true}
                align="center"
                fontFamily="Inter"
                fontWeight={700}
                fontSize="22px"
                lineHeight="28px"
                letterSpacing="0.35px"
                sx={{
                  width: '369px',
                  height: '28px',
                  color: 'black',
                }}
                dangerouslySetInnerHTML={{ __html: steps[step].title }}
              />
            )}

            {step === 0 && (
              <>
                {/* Step 1 Content */}
                <Button
                  variant="outlined"
                  onClick={() => handleTerm(steps[step].buttonLabel1)}
                  style={{ backgroundColor: isAdded(term, steps[step].buttonLabel1) ? '#153a50' : '#aed3e9', color: isAdded(term, steps[step].buttonLabel1) ? '#aed3e9' : '#153a50' }}
                  sx={{ marginTop: 4, marginBottom: 4, borderRadius: '10px', textTransform: 'none', width: '180px', height: '53px' }}
                >
                  {steps[step].buttonLabel1}
                </Button>

                <Typography
                  variant="body2"
                  color="#1c1c1c"
                  dangerouslySetInnerHTML={{ __html: steps[step].subtitle }}
                  align="center"
                  fontFamily={'Inter'}
                  fontWeight={400}
                  fontSize={'16px'}
                  lineHeight={'21px'}
                  letterSpacing={'-0.32px'}
                />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', margin: 15 }}>
                    {Object.keys(steps[step])
                      .filter(key => key.startsWith('buttonLabel') && key !== 'buttonLabel1')
                      .slice(0, 3)
                      .map(key => (
                        <Button
                          key={key}
                          variant="outlined"
                          // onClick={() => handleTerm(steps[step][key])}                          
                          style={{ backgroundColor: isAdded(term, steps[step][key]) ? '#153a50' : '#aed3e9', color: isAdded(term, steps[step][key]) ? '#aed3e9' : '#153a50' }}
                          sx={{ marginTop: 2, borderRadius: '10px', textTransform: 'none', width: '180px', height: '53px' }}
                        >
                          {steps[step][key]}
                        </Button>
                      ))}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', margin: 15 }}>
                    {Object.keys(steps[step])
                      .filter(key => key.startsWith('buttonLabel'))
                      .slice(4)
                      .map(key => (
                        <Button
                          key={key}
                          variant="outlined"
                          // onClick={() => handleTerm(steps[step][key])}                          
                          style={{ backgroundColor: isAdded(term, steps[step][key]) ? '#153a50' : '#aed3e9', color: isAdded(term, steps[step][key]) ? '#aed3e9' : '#153a50' }}
                          sx={{ marginTop: 2, borderRadius: '10px', textTransform: 'none', width: '180px', height: '53px' }}
                        >
                          {steps[step][key]}
                        </Button>
                      ))}
                  </div>
                </div>

                <div className='first navigation-btn'  >
                  <KeyboardDoubleArrowLeftIcon className='backArrows' fontSize='large' onClick={goBackHistory} />

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    style={{ backgroundColor: '#3492c7' }}
                  >
                    Create a Plan
                  </Button>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <PlanningForm
                  formData={formData}
                  setFormData={setFormData}
                />
                <div className='second navigation-btn' >
                  <KeyboardDoubleArrowLeftIcon onClick={handlePrevious} className='backArrows' fontSize='large' />

                  <Button
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: '#3492c7' }}
                    onClick={handleClickNextButtonForm}
                  >
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
                  fontWeight={600}
                  fontSize={'16px'}
                  lineHeight={'21px'}
                  letterSpacing={'-0.32px'}
                />

                <RestaurantOptions />

                <div className='third navigation-btn' >
                  <KeyboardDoubleArrowLeftIcon onClick={handlePrevious} className='backArrows' fontSize='large' />

                  <Button
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: '#3492c7' }}
                    onClick={handleClickNextButtonForm}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {step >= 3 && (

              <>
                {step === 4 && (
                  <Typography
                    color="text.secondary"
                    noWrap={true}
                    align="center"
                    fontFamily="Inter"
                    fontWeight={700}
                    fontSize="22px"
                    lineHeight="28px"
                    letterSpacing="0.35px"
                    sx={{
                      width: '369px',
                      height: '28px',
                      color: 'black',
                    }}
                    dangerouslySetInnerHTML={{ __html: steps[3].title }} // Use title from step 3
                  />
                )}

                <Typography
                  variant="p"
                  noWrap={false}
                  dangerouslySetInnerHTML={{ __html: steps[3].subtitle }}
                  align="center"
                  marginTop={'2px'}
                  fontFamily={'Inter'}
                  fontWeight={400}
                  fontSize={'16px'}
                  lineHeight={'21px'}
                  letterSpacing={'-0.32px'}
                  sx={{
                    width: '310px',
                    height: '42px',
                    color: 'black',
                  }}
                />

                <Grid container spacing={0}>
                  <Typography
                    variant="p"
                    color="text.secondary"
                    align="left"
                    marginTop={3}
                    fontFamily={'Inter'}
                    fontWeight={400}
                    fontSize={'16px'}
                    lineHeight={'21px'}
                    letterSpacing={'-0.32px'}
                    sx={{
                      width: '145px',
                      color: 'black',
                    }}
                  > Number of Results
                    <span className='title-star'>*</span>
                  </Typography>
                </Grid>

                <div className='last-step-btn' >
                  {renderFinalStepButtons(
                    [
                      steps[3].buttonLabel1,
                      steps[3].buttonLabel2,
                      steps[3].buttonLabel3,
                      steps[3].buttonLabel4,
                    ],
                    handleResults,
                    results
                  )}
                </div>

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
                  dangerouslySetInnerHTML={{ __html: steps[4].title }} // Use title from step 4
                />

                <Typography
                  variant="p"
                  noWrap={false}
                  dangerouslySetInnerHTML={{ __html: steps[4].subtitle }}
                  align="center"
                  marginTop={'2px'}
                  fontFamily={'Inter'}
                  fontWeight={400}
                  fontSize={'16px'}
                  lineHeight={'21px'}
                  letterSpacing={'-0.32px'}
                  sx={{
                    width: '314px',
                    height: '42px',
                    color: 'black',
                  }}
                />

                <Grid container spacing={0}>
                  <Typography
                    variant="p"
                    color="text.secondary"
                    align="left"
                    marginTop={3}
                    fontFamily={'Inter'}
                    fontWeight={400}
                    fontSize={'16px'}
                    lineHeight={'21px'}
                    letterSpacing={'-0.32px'}
                    sx={{
                      width: '155px',
                      color: 'black',
                    }}
                  > Number of Matches
                    <span className='title-star'>*</span>
                  </Typography>
                </Grid>

                <div className='last-step-btn' >
                  {renderFinalStepButtons(
                    [
                      steps[4].buttonLabel1,
                      steps[4].buttonLabel2,
                      steps[4].buttonLabel3,
                    ],
                    handleMatches,
                    matches
                  )}
                </div>

                <div className='fourth navigation-btn' >
                  <KeyboardDoubleArrowLeftIcon onClick={handlePrevious} className='backArrows' fontSize='large' />

                  <Button
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: '#3492c7' }}
                    onClick={completePlan}
                  >
                    Create Plan
                  </Button>
                </div>
              </>
            )}

            <Snackbar
              open={openSnackbar}
              autoHideDuration={4000}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleClose}
                severity="error"
                sx={{ width: '100%' }}
              >
                {snackbarMessage}
              </MuiAlert>
            </Snackbar>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default PlanningCard;

