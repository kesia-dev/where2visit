import React from 'react';
import { Button, Typography, Container, Box, useMediaQuery, IconButton, TextField, Checkbox, Radio, RadioGroup, FormControlLabel, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import Layout from './Layout';

const Planning2 = () => {
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

  const squareCheckboxStyle = {
    borderRadius: '0', 
    width: '20px',
    height: '20px',
  };

  const arrowBackStyle = {
    fontSize: '6rem',
    marginRight: '-90px',
    marginTop: '266',
  };

  const handleNextClick = () => {
    navigate('/planning3');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <Container>
        <Box textAlign="center" mt={12} mb={55}>
          <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '76px', fontSize: '3rem', }}>
            Let's make your plans?
          </Typography>

          {/* Form starts here */}

          <div style={{ textAlign: 'left' }}>
            <form>
              <div style={{ marginBottom: '16px' }}>
                <Typography variant="body2" style={{ margin: '8px', fontSize: '2.5rem' }}>
                  Plan Name
                </Typography>
                <TextField variant="outlined" fullWidth />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <Typography variant="body2" style={{ margin: '8px', fontSize: '2.5rem' }}>
                  Host Name
                </Typography>
                <TextField variant="outlined" fullWidth />
              </div>

              <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '16px', flex: 1 }}>
                  <Typography variant="body2" style={{ margin: '8px', fontSize: '2.5rem' }}>
                    Date of Event
                  </Typography>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField type="date" variant="outlined" fullWidth />
                  </div>

                  <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox color="primary" style={squareCheckboxStyle} />}
                  label="Now"
                  style={{ marginLeft: '8px', marginTop: '12px' }}
                />
                
              </div>
                </div>
              </div>

              <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '16px', flex: 1 }}>
                  <Typography variant="body2" style={{ margin: '8px', fontSize: '2.5rem' }}>
                    Time of Event
                  </Typography>
                  <div style={{ display: 'flex' }}>
                    <FormControl variant="outlined" fullWidth style={{ marginRight: '8px', height: '56px' }}>
                      <InputLabel id="hour-label">Hour</InputLabel>
                      <Select labelId="hour-label" label="Hour">
                        {[...Array(12)].map((_, index) => (
                          <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl variant="outlined" fullWidth style={{ marginLeft: '8px', height: '56px' }}>
                      <InputLabel id="am-pm-label">AM/PM</InputLabel>
                      <Select labelId="am-pm-label" label="AM/PM">
                        <MenuItem value="AM">AM</MenuItem>
                        <MenuItem value="PM">PM</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox color="primary" style={squareCheckboxStyle} />}
                  label="Now"
                  style={{ marginLeft: '8px' }}
                />
                <FormControlLabel
                  control={<Checkbox color="primary" style={squareCheckboxStyle} />}
                  label="All Day"
                  style={{ marginLeft: '8px' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <Typography variant="body2" style={{ margin: '8px', fontSize: '2.5rem' }}>
                  Location
                </Typography>
                <TextField variant="outlined" fullWidth />
              </div>
            </form>
          </div>
          
          {/* Form ends here */}

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

export default Planning2;
