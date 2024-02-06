import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Stepper, Step, StepLabel, Typography, Button, TextField, Checkbox, FormControlLabel, Select, InputLabel, FormControl, MenuItem } from '@mui/material';
import Layout from './Layout';
import { buttonStyles, typographyStyles } from './PlanStyles';

const Planning2 = () => {
  const handleCreatePlanClick = () => {
  };

  return (
    <Layout>
      <Container>
      <Box width="100%" display="flex" justifyContent="center" mt={2} mb={12}>
          <Stepper activeStep={1} alternativeLabel>
            {['', '', '', '', ''].map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Form starts here */}

        <Box width="100%" margin="auto">
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
        </Box>
        
        {/* Form ends here */}

        {/* Next Button */}
        <Box textAlign="center" mt={20}>
          <Link to="/planning3" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={buttonStyles.createPlan}
              onClick={handleCreatePlanClick}
            >
              Next
            </Button>
          </Link>
        </Box>

      </Container>
    </Layout>
  );
};

export default Planning2;






