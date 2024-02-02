import React from 'react';
import { Button, Typography, Container, Box, useMediaQuery, IconButton, Stepper, Step, StepLabel, TextField, Checkbox, FormControlLabel, Select, InputLabel, FormControl, MenuItem } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; 
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const Planning2 = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [activeStep, setActiveStep] = React.useState(1);

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
    marginTop: '120px', 
    marginBottom: '20px',
    width: '85%', 
    borderRadius: '70px', 
    backgroundColor: '#1C3CBB', 
    color: '#fff', 
    marginLeft: 'auto', 
    marginRight: 'auto', 
  };

  const arrowBackStyle = {
    fontSize: '6rem',
    color: '#FFD700', 
  };

  const handleCreatePlanClick = () => {
    navigate('/planning3');
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
                <StepLabel></StepLabel> 
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box textAlign="center" mt={4}>
          
          <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '100px', fontSize: '3rem' }}>
            Let's make your plans
          </Typography>


          {/* Form starts here */}


          <div style={{ textAlign: 'left', width: '100%', margin: 'auto' }}> {/* Adjusted width to 90% */}
            <form>
              {/* Plan Name */}
              <div style={{ marginBottom: '16px' }}>
                <Typography variant="body2" style={{ margin: '8px', fontSize: '2.5rem' }}>
                  Plan Name
                </Typography>
                <TextField variant="outlined" fullWidth />
              </div>

              {/* Host Name */}
              <div style={{ marginBottom: '16px' }}>
                <Typography variant="body2" style={{ margin: '8px', fontSize: '2.5rem' }}>
                  Host Name
                </Typography>
                <TextField variant="outlined" fullWidth />
              </div>

              {/* Date of Event */}
              <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '16px', flex: 1 }}>
                  <Typography variant="body2" style={{ margin: '8px', fontSize: '2.5rem' }}>
                    Date of Event
                  </Typography>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField type="date" variant="outlined" fullWidth />
                  </div>

                  {/* Checkbox for Now */}
                  <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                    <FormControlLabel
                      control={<Checkbox color="primary" />}
                      label="Now"
                      style={{ marginLeft: '8px', marginTop: '12px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Time of Event */}
              <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '16px', flex: 1 }}>
                  <Typography variant="body2" style={{ margin: '8px', fontSize: '2.5rem' }}>
                    Time of Event
                  </Typography>
                  <div style={{ display: 'flex' }}>
                    {/* Hour Select */}
                    <FormControl variant="outlined" fullWidth style={{ marginRight: '8px', height: '56px' }}>
                      <InputLabel id="hour-label">Hour</InputLabel>
                      <Select labelId="hour-label" label="Hour">
                        {[...Array(12)].map((_, index) => (
                          <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {/* AM/PM Select */}
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

              {/* Checkboxes for Now and All Day */}
              <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Now"
                  style={{ marginLeft: '8px' }}
                />
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="All Day"
                  style={{ marginLeft: '8px' }}
                />
              </div>

              {/* Location */}
              <div style={{ marginBottom: '16px' }}>
                <Typography variant="body2" style={{ margin: '8px', fontSize: '2.5rem' }}>
                  Location
                </Typography>
                <TextField variant="outlined" fullWidth />
              </div>
            </form>
          </div>


          {/* Form ends here */}

          
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={createPlanButtonStyle}
            onClick={handleCreatePlanClick}
          >
            Next
          </Button>
          <Box display="flex" justifyContent="center" mt={2}>
            {/* <IconButton onClick={handleBackClick} color="primary" size="medium" style={{ marginBottom: '0px', marginRight: '8px' }}>
              <ArrowBackIosIcon style={{ ...arrowBackStyle, fontSize: '3rem' }} />
            </IconButton>
            <IconButton onClick={handleBackClick} color="primary" style={{ marginBottom: '0px', marginLeft: '8px' }}>
              <ArrowBackIosIcon style={{ ...arrowBackStyle, fontSize: '3rem' }} />
            </IconButton> */}
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Planning2;





