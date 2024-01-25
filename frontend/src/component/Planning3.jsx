import React from 'react';
import { Button, Typography, Container, Box, useMediaQuery, IconButton } from '@mui/material';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';


const Planning3 = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const buttonStyle = {
    margin: '8px',
    width: isSmallScreen ? '100%' : '48%',
    height: '150px',
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
        <Box textAlign="center" mt={4}>
          <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '3rem' }}>
            Set your preferences
          </Typography>

          <Typography variant="body2" style={{ margin: '16px', fontSize: '2.5rem' }}>
            Select all that apply
          </Typography>

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
              No Preference            </Button>
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
              greek
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

          <Typography>View more</Typography>

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
              Any Rating           </Button>
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
          <IconButton onClick={handleBackClick} color="primary" size="large" style={{ marginBottom: '0px' }}>
            <ArrowBack style={arrowBackStyle} />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={createPlanButtonStyle}
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