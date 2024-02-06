import React from 'react';
import { Button, Typography, Container, Box, useMediaQuery, Stepper, Step, StepLabel } from '@mui/material';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import { buttonStyles, typographyStyles } from './PlanStyles'; 

const Planning3 = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const [activeStep, setActiveStep] = React.useState(2);

  const steps = ['', '', '', '', ''];

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
          <Typography variant="h4" style={typographyStyles.title}>
            Set your preferences
          </Typography>
          <Typography variant="body2" style={typographyStyles.comingSoon}>
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
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
            No Preference
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
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
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
            Italian
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
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
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
            Thai
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
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
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
            Mexican
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
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
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
            Indian
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
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

        </Box>

        <Box textAlign="center" mt={4} mb={4}>
          <Typography variant="body1" style={{ color: '#00bcd4', fontSize: '1.5rem' }}>
            View more
          </Typography>
        </Box>

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
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
            Keto
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
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
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
            Paleo
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
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
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
            Vegetarian
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
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
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
            $50
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
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
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
            $100 - $150
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
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
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
            Any Rating
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
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
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
            4+
          </Button>
          <Button variant="contained" color="primary" size="large" style={buttonStyles.choiceButton}>
            5
          </Button>
        </Box>

        <Box textAlign="center" mt={20} mb={10}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={buttonStyles.createPlan}
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

