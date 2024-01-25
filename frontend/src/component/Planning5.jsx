import React from 'react';
import { Button, Typography, Container, Box, useMediaQuery, IconButton } from '@mui/material';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const Planning5 = () => {
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
    navigate('/PlanCreatedPage');
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <Container>
        <Box textAlign="center" mt={4}>
          <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '66px', marginTop: '66px', fontSize: '3rem' }}>
            How many results do you want?
          </Typography>

          <Typography variant="body2" style={{ margin: '66px', fontSize: '2.5rem' }}>
            Results refer to the number of options you want to choose from.
          </Typography>

          <Typography variant="body2" style={{ margin: '6px', fontSize: '2.0rem', textAlign: 'left' }}>
            Results
          </Typography>
          <Box
            display="flex"
            flexDirection={isSmallScreen ? 'column' : 'row'}
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
          </Box>
          <Box
            display="flex"
            flexDirection={isSmallScreen ? 'column' : 'row'}
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              10
            </Button>
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              15+
            </Button>
          </Box>

          <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '66px', marginTop: '66px', fontSize: '3rem' }}>
            How many matches do you want?
          </Typography>

          <Typography variant="body2" style={{ margin: '66px', fontSize: '2.5rem' }}>
            Matches refer to the number of restaurants your group has agreed on.
          </Typography>

          <Typography variant="body2" style={{ margin: '16px', fontSize: '2.0rem', textAlign: 'left' }}>
            Number of matches
          </Typography>
          <Box
            display="flex"
            flexDirection={isSmallScreen ? 'column' : 'row'}
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
          </Box>
          <Box
            display="flex"
            flexDirection={isSmallScreen ? 'column' : 'row'}
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              5
            </Button>
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              Custom
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

          <Box style={{ marginTop: '196px' }}>
            <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '66px', marginTop: '66px', fontSize: '3rem' }}>
              Do you want to save this search to your account?           
              </Typography>
          </Box>

          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              Yes
            </Button>
            <Button variant="contained" color="primary" size="large" style={buttonStyle}>
              No
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

export default Planning5;
