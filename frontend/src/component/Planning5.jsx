import React from 'react';
import { Button, Typography, Container, Box, useMediaQuery, IconButton, Stepper, Step, StepLabel } from '@mui/material';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const Planning5 = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const [activeStep, setActiveStep] = React.useState(3);

  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];

  const buttonStyle = {
    margin: '8px 8px', 
    width: isSmallScreen ? '100%' : 'calc(25% - 16px)', 
    height: '100px',
    backgroundColor: '#b3e0ff',
    color: '#000',
    borderRadius: '12px',
    fontSize: '1.5rem',
  };

  const darkBlueButtonStyle = {
    width: isSmallScreen ? '100%' : '48%',
    height: '150px',
    backgroundColor: '#0000cd',
    color: '#fff',
    borderRadius: '12px',
    fontSize: '1.5rem',
    margin: '100px',
  };

  const createPlanButtonStyle = {
    ...darkBlueButtonStyle,
    marginTop: '300px',
    marginBottom: '5px',
  };

  const arrowBackStyle = {
    fontSize: '6rem',
    marginRight: '-90px',
    marginTop: '16px', 
  };

  const handleNextClick = () => {
    navigate('/PlanCreatedPage');
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNoClick = () => {
    navigate('/Planning6');
  };

  return (
    <Layout>
      <Container>
        <Box width="100%" display="flex" justifyContent="center" mt={2} mb={8}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box textAlign="center" mt={4}>
          <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '06px', marginTop: '6px', fontSize: '2.5rem' }}>
            How many <span style={{ color: '#b3e0ff' }}>results</span> do you want?
          </Typography>

          <Typography variant="body2" style={{ margin: '26px', fontSize: '1.8rem' }}>
            Results refer to the number of options you want to choose from.
          </Typography>

          <Typography variant="body2" style={{ margin: '6px', fontSize: '2.0rem', textAlign: 'left', marginTop: '56px' }}>
            Number of Results
          </Typography>
          <Box
            display="flex"
            flexDirection={isSmallScreen ? 'column' : 'row'}
            flexWrap="wrap" // Allow buttons to wrap onto the next line
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              3
            </Button>
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              5
            </Button>
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              10
            </Button>
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              15+
            </Button>
          </Box>
          <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '66px', marginTop: '66px', fontSize: '2.5rem' }}>
            How many <span style={{ color: '#b3e0ff' }}>matches</span> do you want?
          </Typography>

          <Typography variant="body2" style={{ margin: '66px', fontSize: '1.8rem' }}>
            Matches refer to the number of restaurants your group has agreed on.
          </Typography>

          <Typography variant="body2" style={{ margin: '16px', fontSize: '2.0rem', textAlign: 'left' }}>
            Number of matches
          </Typography>
          <Box
            display="flex"
            flexDirection={isSmallScreen ? 'column' : 'row'}
            flexWrap="wrap" // Allow buttons to wrap onto the next line
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              1
            </Button>
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              3
            </Button>
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              5
            </Button>
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              Custom
            </Button>
          </Box>

          <Box style={{ marginTop: '196px' }}>
            <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '96px', marginTop: '66px', fontSize: '3rem' }}>
              Do you want to save this search to your account?           
              </Typography>
          </Box>

          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" color="primary" size="large" style={{ ...buttonStyle, backgroundColor: '#0000cd', borderRadius: '40px' }}>
              Yes
            </Button>
            <Button variant="contained" color="primary" size="large" style={{ ...buttonStyle, backgroundColor: '#ffffff', borderRadius: '40px', border: '2px solid #0000cd' }} onClick={handleNoClick}>
              No
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Planning5;

