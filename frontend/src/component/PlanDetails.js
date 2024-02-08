import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const PlanDetailsCard = ({ roomName, hostName, dateOfEvent, location }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: '20px', backgroundColor: '#f5f5f5' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ color: '#333' }}>
          Plan Details
        </Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>
          <strong>Room Name:</strong> {roomName}
        </Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>
          <strong>Host Name:</strong> {hostName}
        </Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>
          <strong>Date of Event:</strong> {dateOfEvent}
        </Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>
          <strong>Location:</strong> {location}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlanDetailsCard;
