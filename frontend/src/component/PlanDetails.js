import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const PlanDetails = ({ planName, hostName, dateOfEvent, timeOfEvent, location }) => {
  return (
    <Card elevation={0} sx={{ marginBottom: '20px', alignItems: 'center', justifyContent: 'center', background: '#E9D8A3', color: 'black', width: '100%'}}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#333' }}>
          Plan Details
        </Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>
          Room Name: <strong>{planName} </strong>
        </Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>
         Host Name:<strong> {hostName} </strong>
        </Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>
          Date of Event:<strong> {dateOfEvent} </strong>
        </Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>
          Time of Event:<strong> {timeOfEvent} </strong>
        </Typography>
      {/*
        <Typography variant="body1" sx={{ color: '#555' }}>
          <strong>Location:</strong> {location}
        </Typography>
      */}
      </CardContent>
    </Card>
  );
};

export default PlanDetails;
