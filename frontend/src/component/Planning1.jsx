import React from 'react';
import { Button, Typography, Container, Box, useMediaQuery, IconButton, Stepper, Step, StepLabel } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const Planning1 = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = ['', '', '', '', ''];

  const buttonStyle = {
    margin: '8px',
    width: '100%',
    height: '120px',
    backgroundColor: '#b3e0ff',
    color: '#000',
    borderRadius: '12px',
    fontSize: '1.5rem',
  };

  const darkBlueButtonStyle = {
    width: isSmallScreen ? '110%' : '48%',
    height: '120px',
    backgroundColor: '#0000cd',
    color: '#fff',
    borderRadius: '12px',
    fontSize: '1.5rem',
    margin: '100px',
  }

  const createPlanButtonStyle = {
    ...darkBlueButtonStyle,
    marginTop: '20px',
    marginBottom: '20px',
    width: '70%',
    borderRadius: '70px',
    backgroundColor: '#1C3CBB',
    color: '#FFD700',
  };

  const arrowBackStyle = {
    fontSize: '6rem',
    marginRight: '-90px',
    marginTop: '0px',
    color: '#FFD700',
  };

  const handleCreatePlanClick = () => {
    navigate('/planning2');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <Container>
        <Box width="100%" display="flex" justifyContent="center" mt={2} mb={12}> {/* Centering the stepper horizontally */}
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box textAlign="center" mt={4}>
          <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '3rem' }}>
            What would you like to do?
          </Typography>
          <Button variant="contained" color="primary" size="large" style={darkBlueButtonStyle}>
            Restaurants
          </Button>
          <Typography variant="body2" style={{ margin: '16px', fontSize: '2.5rem' }}>
            COMING SOON:
          </Typography>
          <Box
            display="flex"
            flexDirection={isSmallScreen ? 'column' : 'row'}
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              Local Attractions
            </Button>
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              Arts & Entertainment
            </Button>
          </Box>
          <Box
            display="flex"
            flexDirection={isSmallScreen ? 'column' : 'row'}
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              Shopping
            </Button>
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              Beauty and Spa
            </Button>
          </Box>
          <Box
            display="flex"
            flexDirection={isSmallScreen ? 'column' : 'row'}
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              Nightlife
            </Button>
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              Hotel and Travel
            </Button>
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ ...createPlanButtonStyle, marginTop: '320px', color: '#fff' }}
            onClick={handleCreatePlanClick}
          >
            Create a Plan
          </Button>
          {/* <IconButton onClick={handleBackClick} color="primary" size="medium" style={{ marginBottom: '0px' }}>
            <ArrowBackIosIcon style={{ ...arrowBackStyle, fontSize: '3rem' }} />
          </IconButton>
          <IconButton onClick={handleBackClick} color="primary" style={{ marginBottom: '0px', width: 'auto', height: 'auto', padding: 10 }}>
            <ArrowBackIosIcon style={{ ...arrowBackStyle, fontSize: '3rem' }} />
          </IconButton> */}
        </Box>
      </Container>
    </Layout>
  );
};

export default Planning1;



