import React from 'react';
import { Link } from 'react-router-dom';
import { Stepper, Step, StepLabel, Typography, Container, Box, Button, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; // Importing the back arrow icon
import Layout from './Layout';
import { buttonStyles, typographyStyles } from './PlanStyles'; // Importing styles from PlanStyles

const Planning7 = () => {
  const handleBackClick = () => {
    // Handle back button click event here
  };

  return (
    <Layout>
      <Container>
        <Box width="100%" display="flex" justifyContent="center" mt={2} mb={12}>
          <Stepper activeStep={0} alternativeLabel>
            {['', '', '', '', ''].map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Typography variant="h4" style={typographyStyles.title}>
          What would you like to do?
        </Typography>
        <Box mt={2} textAlign="center">
          <Button variant="contained" color="primary" size="large" sx={buttonStyles.darkBlue}>
            Restaurants
          </Button>
          <Typography variant="body2" style={typographyStyles.comingSoon}>
            COMING SOON:
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <Box mr={2}>
              <Button variant="contained" color="primary" size="large" sx={buttonStyles.choiceButton}>
                Button 1
              </Button>
            </Box>
            <Box>
              <Button variant="contained" color="primary" size="large" sx={buttonStyles.choiceButton}>
                Button 2
              </Button>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            <Box mr={2}>
              <Button variant="contained" color="primary" size="large" sx={buttonStyles.choiceButton}>
                Button 3
              </Button>
            </Box>
            <Box>
              <Button variant="contained" color="primary" size="large" sx={buttonStyles.choiceButton}>
                Button 4
              </Button>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            <Box mr={2}>
              <Button variant="contained" color="primary" size="large" sx={buttonStyles.choiceButton}>
                Button 5
              </Button>
            </Box>
            <Box>
              <Button variant="contained" color="primary" size="large" sx={buttonStyles.choiceButton}>
                Button 6
              </Button>
            </Box>
          </Box>
          <Box mt={55} display="flex" alignItems="center" justifyContent="center">
            <IconButton onClick={handleBackClick}>
              <ArrowBackIosIcon />
            </IconButton>
            <Link to="/planning2" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={buttonStyles.createPlan}
              >
                Create a Plan
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Planning7;




