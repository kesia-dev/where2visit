import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const PlanDetails = ({ planName, hostName, dateOfEvent, timeOfEvent, location }) => {
  return (
    <Card elevation={0} sx={{ marginTop: '20px', alignItems: 'center', justifyContent: 'center', background: '#E9D8A3', color: 'black', width: '400px' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#333', marginBottom: 2 }}>
          Plan Details
        </Typography>
        <Typography variant="body1" sx={{ color: '#555', marginBottom: 0.5 }}>
          Room Name: <strong>{planName} </strong>
        </Typography>
        <Typography variant="body1" sx={{ color: '#555', marginBottom: 0.5 }}>
         Host Name:<strong> {hostName} </strong>
        </Typography>
        <Typography variant="body1" sx={{ color: '#555', marginBottom: 0.5 }}>
          Date of Event:<strong> {dateOfEvent} </strong>
        </Typography>
        <Typography variant="body1" sx={{ color: '#555', marginBottom: 0.5 }}>
          Time of Event:<strong> {timeOfEvent} </strong>
        </Typography>
        {/*
          <Typography variant="body1" sx={{ color: '#555', marginBottom: 1 }}>
            <strong>Location:</strong> {location}
          </Typography>
        */}
      </CardContent>
    </Card>
  );
};

export default PlanDetails;
