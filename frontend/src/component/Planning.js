import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTerm, addNumberOfMatches, addNumberOfResults, addPlanName, addHostName, addDate, addTime, addLocation, addRadius, addCuisine, addPrice, addRating } from '../features/userOptions/optionsSlice';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, MobileStepper, Box, Typography, Button } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import "../styling/Planning.css";
import PlanningForm from './PlanningForm';
import RestaurantOptions from './RestaurantOptions';
import axios from 'axios';

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
      title: `How many <span class="title-color"> results </span> do you want?`,
      subtitle: "Results refer to the number of options you would like to choose from.",
      buttonLabel1: "3",
      buttonLabel2: "5",
      buttonLabel3: "10",
      buttonLabel4: "15+",

    },
    {
      title: `How many <span class="title-color"> matches </span> do you want?`,
      subtitle: "Matches refer to the number of restaurants your group has agreed on.",
      buttonLabel1: "1",
      buttonLabel2: "3",
      buttonLabel3: "5",
      buttonLabel4: "Custom"
    },
  ];

  const options = useSelector(state => state.options);
  const { term, numberOfResults: results, numberOfMatches: matches } = options

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = React.useState(0);

  const handleNext = () => {
    setStep(prevStep => (prevStep < steps.length - 1 ? prevStep + 1 : prevStep));
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

  const handlePrevious = () => {
    setStep(prevStep => (prevStep > 0 ? prevStep - 1 : prevStep));
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const handleTerm = value => dispatch(addTerm(value));

  const handleResults = (value) => {
    dispatch(addNumberOfResults(value))
    console.log(results)
  };
  
  const handleMatches = (value) => dispatch(addNumberOfMatches(value));

  const renderFinalStepButtons = (buttonLabels, onClickHandler, state) => {
    return buttonLabels.map((label, index) => (
      <Button
        key={index}
        variant="outlined"
        onClick={() => onClickHandler(label)}
        style={{
          backgroundColor: isAdded(state, label) ? '#153a50' : '#aed3e9',
          color: isAdded(state, label) ? '#aed3e9' : '#153a50',
          border: 'none',
          marginRight: '10px',
        }}
        sx={{
          marginTop: 2,
          borderRadius: '10px',
          textTransform: 'none',
          minHeight: '5vh',
        }}
      >
        {label}
      </Button>
    ));
  };


  const [formData, setFormData] = useState({
    planName: '',
    hostName: '',
    date: '',
    time: '',
    location: '',
    radius: 5,
  });

  const handleClickNextButtonForm = () => {
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

    try {
      // API call to save details to DB and search restaurants
      await axios.post('http://localhost:4200/plan/create-plan', options);
    }
    catch (error) {
      console.error('Error saving plan to DB: ', error);
    }

    // navigate('/restaurant-details/:code'); // navigate to Poll-options/Voting screen
    navigate('/');

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
              dangerouslySetInnerHTML={{ __html: steps[step].title }}
            />


            {step === 0 && (
              <>
                {/* Step 1 Content */}
                <Button
                  variant="outlined"
                  onClick={() => handleTerm(steps[step].buttonLabel1)}
                  style={{ backgroundColor: isAdded(term, steps[step].buttonLabel1) ? '#153a50' : '#aed3e9', color: isAdded(term, steps[step].buttonLabel1) ? '#aed3e9' : '#153a50', border: 'none' }}
                  sx={{ marginTop: 4, marginBottom: 4, borderRadius: '10px', textTransform: 'none', maxWidth: '60vw', minHeight: '5vh' }}
                >
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
                          style={{ backgroundColor: isAdded(term, steps[step][key]) ? '#153a50' : '#aed3e9', color: isAdded(term, steps[step][key]) ? '#aed3e9' : '#153a50', border: 'none' }}
                          sx={{ marginTop: 2, borderRadius: '10px', textTransform: 'none', maxWidth: '60vw', minHeight: '5vh' }}
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
                          style={{ backgroundColor: isAdded(term, steps[step][key]) ? '#153a50' : '#aed3e9', color: isAdded(term, steps[step][key]) ? '#aed3e9' : '#153a50', border: 'none' }}
                          sx={{ marginTop: 2, borderRadius: '10px', textTransform: 'none', maxWidth: '60vw', minHeight: '5vh' }}
                        >
                          {steps[step][key]}
                        </Button>
                      ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}  >
                  <KeyboardDoubleArrowLeftIcon className='backArrows' onClick={goBackHistory} />

                  <Button variant="contained" color="primary" onClick={handleNext} style={{ backgroundColor: '#3492c7' }} sx={{ margin: 5, marginLeft: 1, borderRadius: '100px', textTransform: 'none', minWidth: '20vw' }}>
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
                <div style={{ display: 'flex', alignItems: 'center' }} >
                  <button onClick={handlePrevious} className='backArrows'>
                    <KeyboardDoubleArrowLeftIcon />
                  </button>


                  <Button
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: '#3492c7' }}
                    onClick={handleClickNextButtonForm}
                    sx={{
                      margin: 5,
                      marginLeft: 1,
                      borderRadius: '100px',
                      textTransform: 'none',
                      minWidth: '20vw'
                    }}
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
                  fontWeight={400}
                  fontSize={'14px'}
                />

                <RestaurantOptions />

                <div style={{ display: 'flex', alignItems: 'center' }} >
                  <button onClick={handlePrevious} className='backArrows'>
                    <KeyboardDoubleArrowLeftIcon />
                  </button>

                  <Button variant="contained" color="primary" style={{ backgroundColor: '#3492c7' }} onClick={handleClickNextButtonForm} sx={{ margin: 5, marginLeft: 1, borderRadius: '100px', textTransform: 'none', minWidth: '20vw' }}>
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
                  {renderFinalStepButtons(
                    [
                      steps[step].buttonLabel1,
                      steps[step].buttonLabel2,
                      steps[step].buttonLabel3,
                      steps[step].buttonLabel4,
                    ],
                    handleResults,
                    results
                  )}
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
                  {renderFinalStepButtons(
                    [
                      steps[step].buttonLabel1,
                      steps[step].buttonLabel2,
                      steps[step].buttonLabel3,
                      steps[step].buttonLabel4,
                    ],
                    handleMatches,
                    matches
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }} >
                  <button onClick={handlePrevious} className='backArrows'>
                    <KeyboardDoubleArrowLeftIcon />
                  </button>
                  <Button variant="contained" color="primary" style={{ backgroundColor: '#3492c7' }} onClick={completePlan} sx={{ margin: 5, marginLeft: 1, borderRadius: '100px', textTransform: 'none', minWidth: '20vw' }}>
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

