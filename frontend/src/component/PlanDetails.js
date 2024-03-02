import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import axios from 'axios';
import GOOGLE_MAPS_API_KEY from '../config';
import dayjs from 'dayjs';

const PlanDetails = ({ planName, hostName, dateOfEvent, timeOfEvent, latitude, longitude }) => {

  const [address, setAddress] = useState('');

  if (latitude && longitude) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`)
    .then(response => setAddress(response.data.results.at(-4).formatted_address))
    .catch(error => console.error('Error fetching address:', error));
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'left',
        justifyContent: "center",
        width: '385px',
        margin: '18px',
        alignItems: 'flex-start'
      }}>

      <Typography variant="h6" gutterBottom
        sx={{
          color: '#1C1C1C',
          marginBottom: 2,
          fontFamily: 'inter',
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '25px',
          letterSpacing: '0.38px'
        }}>
        Plan Details
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          textAlign: 'left',
          justifyContent: "center",
          width: '100%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'Left',
            width: '35%'
          }}
        >
          <p className='plan-details-title'>Room Name:</p>
          <p className='plan-details-title'>Host Name:</p>
          <p className='plan-details-title'>Date of Event:</p>
          <p className='plan-details-title'>Time of Event:</p>
          <p className='plan-details-title'>Location:</p>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'Left',
            width: '328px'
          }}
        >
          <p className='plan-details-info'>{planName}</p>
          <p className='plan-details-info'>{hostName}</p>
          <p className='plan-details-info'>{dayjs(dateOfEvent).format('MM/DD/YYYY')}
          </p>
          <p className='plan-details-info'>{timeOfEvent}</p>
          <p className='plan-details-info'>{address}</p>
        </Box>
      </Box>
    </Box>
  );
};

export default PlanDetails;
