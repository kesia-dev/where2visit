import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const PlanDetails = ({ planName, hostName, dateOfEvent, timeOfEvent, location }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: '20px', alignItems: 'center', justifyContent: 'center', background: '#C79E34', color: 'black', width: 'auto%' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#333' }}>
          Plan Details
        </Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>
          <strong>Room Name:</strong> {planName}
        </Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>
          <strong>Host Name:</strong> {hostName}
        </Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>
          <strong>Date of Event:</strong> {dateOfEvent}
        </Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>
          <strong>Time of Event:</strong> {timeOfEvent}
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
