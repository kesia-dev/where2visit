



import React from 'react';
import { Button, Typography, Container, Box, useMediaQuery, IconButton, Stepper, Step, StepLabel, TextField, Checkbox, FormControlLabel, Select, InputLabel, FormControl, MenuItem } from '@mui/material';
import { ArrowBack, ArrowBackIos } from '@mui/icons-material'; // Add ArrowBackIos
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';


const Planning3 = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const [activeStep, setActiveStep] = React.useState(2);

  const steps = ['', '', '', '', ''];

  const buttonStyle = {
    margin: '8px',
    width: isSmallScreen ? '100%' : '48%',
    height: '120px',
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
    marginTop: '266',
  };

  const handleNextClick = () => {
    navigate('/planning5');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <Container>
        <Box width="100%" display="flex" justifyContent="center" mt={2} mb={12}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel></StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box textAlign="center">
          <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '3rem' }}>
            Set your preferences
          </Typography>
          <Typography variant="body2" style={{ margin: '16px', fontSize: '2.5rem', marginBottom: '35px' }}>
            Select all that apply
          </Typography>
        </Box>
        <Typography variant="body2" style={{ margin: '16px', fontSize: '2.0rem', textAlign: 'left' }}>
          Cuisine
        </Typography>
        <Box
          display="flex"
          flexDirection={isSmallScreen ? 'column' : 'row'}
          alignItems="center"
          justifyContent="space-between"
          mt={2}
        >
          <Button variant="contained" color="primary" size="large" style={buttonStyle}>
            No Preference
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyle}>
            French
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
            Italian
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyle}>
            Chinese
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
            Thai
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyle}>
            Greek
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
            Mexican
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyle}>
            Japanese
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
            Indian
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyle}>
            American
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
              Local Attractions
            </Button>
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              Arts & Entertainment
            </Button>
          </Box>

        <Typography>View more</Typography>

        <Typography variant="body2" style={{ margin: '16px', fontSize: '2.0rem', textAlign: 'left' }}>
          Dietary Restrictions (optional)
        </Typography>

        <Box
          display="flex"
          flexDirection={isSmallScreen ? 'column' : 'row'}
          alignItems="center"
          justifyContent="space-between"
          mt={2}
        >
          <Button variant="contained" color="primary" size="large" style={buttonStyle}>
            Keto
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyle}>
            Vegan
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
            Paleo
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyle}>
            Kosher
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
            Vegetarian
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyle}>
            Gluten Free
          </Button>
        </Box>

        <Typography variant="body2" style={{ margin: '16px', fontSize: '2.0rem', textAlign: 'left' }}>
          Price Range (Per Person)
        </Typography>

        <Box
          display="flex"
          flexDirection={isSmallScreen ? 'column' : 'row'}
          alignItems="center"
          justifyContent="space-between"
          mt={2}
        >
          <Button variant="contained" color="primary" size="large" style={buttonStyle}>
            $50
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyle}>
            $50 - $100
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
            $100 - $150
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyle}>
            $150+
          </Button>
        </Box>

        <Typography variant="body2" style={{ margin: '16px', fontSize: '2.0rem', textAlign: 'left' }}>
          Rating(Optional)
        </Typography>

        <Box
          display="flex"
          flexDirection={isSmallScreen ? 'column' : 'row'}
          alignItems="center"
          justifyContent="space-between"
          mt={2}
        >
          <Button variant="contained" color="primary" size="large" style={buttonStyle}>
            Any Rating
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyle}>
            3+
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
            4+
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyle}>
            5
          </Button>
          
        </Box>

        <Box textAlign="center" mt={2} mb={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{
              borderRadius: '30px',
              padding: '12px 175px', // Adjusted width
              fontSize: '1.5rem',
              height: '120px',
              marginTop: '150px' 
              
            }}
            onClick={handleNextClick}
          >
            Next
          </Button>

        </Box>

        
      </Container>

      
    </Layout>
  );
};

export default Planning3;
