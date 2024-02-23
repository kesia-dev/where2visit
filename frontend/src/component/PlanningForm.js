import { Box, Slider, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';
import clsx from 'clsx';
import { DatePicker, TimePicker } from 'antd';
import MyLocationIcon from '@mui/icons-material/MyLocation';

import React, { useState } from 'react';
import axios from 'axios';
import '../styling/PlanningForm.css';

const PlanningForm = ({ formData, setFormData }) => {

  const radiusValue = (value) => {
    return `${value} km`;
  };

  const marks = [
    {
      value: 0,
      label: '0 km',
    },
    {
      value: 10,
      label: '10 km',
    },
    {
      value: 20,
      label: '20 km',
    },
  ];

  // For user-entered address or city:
  const [locationInput, setLocationInput] = useState(formData.locationName);
  const [openSnackbarGeo, setOpenSnackbarGeo] = useState(false);
  const [openSnackbarSearch, setOpenSnackbarSearch] = useState(false);

  // Function to handle manual input of location:
  const handleLocationInput = (e) => {
    setLocationInput(e.target.value);
  };

  // Function to close Snackbars
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbarGeo(prev => !prev ? prev : !prev);
    setOpenSnackbarSearch(prev => !prev ? prev : !prev);
  };

  // Function to convert address to coordinates (Geocoding):
  const convertAddressToCoordinates = async () => {
    const key = process.env.GOOGLE_MAPS_API_KEY
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationInput)}&key=AIzaSyBZRmFvwMfu5UEmA2QEUID_PHsuBJcIJMk`);
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        setFormData({
          ...formData,
          location: {
            latitude: lat,
            longitude: lng
          },
          locationName: locationInput
        });
      } else {
        setOpenSnackbarSearch(true);
        setLocationInput('')
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  // Function to get user's live current location and convert to readable address (Reverse Geocoding):
  const getLocation = () => {
    const key = process.env.GOOGLE_MAPS_API_KEY
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBZRmFvwMfu5UEmA2QEUID_PHsuBJcIJMk`);
          const address = response.data.results[0].formatted_address;
          if (!address) {
            setOpenSnackbarGeo(true)
          }
            
            setLocationInput(address);
            setFormData({
              ...formData,
              location: {
                latitude,
                longitude
              }
            });
        } catch (error) {
          console.error("Reverse geocoding error:", error);
          setOpenSnackbarGeo(true)
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" marginTop={3}>

        <FormControl defaultValue="" required className='inputForm' value={formData.planName}>
          <Label>Plan Name</Label>
          <StyledInput onChange={(e) => setFormData({ ...formData, planName: e.target.value })}  />
          <HelperText />
        </FormControl>

        <FormControl defaultValue="" required className='inputForm' value={formData.hostName}>
          <Label>Host Name</Label>
          <StyledInput onChange={(e) => setFormData({ ...formData, hostName: e.target.value })}  />
          <HelperText />
        </FormControl>

        <FormControl defaultValue="" required className='inputForm'>
          <Label>Date of Event</Label>
          <DatePicker className='dateTimePicker' onChange={(date, dateString) => setFormData({ ...formData, date: dateString })} placeholder='' />
          <HelperText />
        </FormControl>

        <FormControl defaultValue="" required className='inputForm'>
          <Label>Time of Event</Label>
          <TimePicker className='dateTimePicker' use12Hours format="h:mm a" onChange={(time, timeString) => setFormData({ ...formData, time: timeString })} placeholder='' />
          <HelperText />
        </FormControl>

        <FormControl defaultValue="" required className='inputForm' value={locationInput}>
          <Label>Location</Label>
          <StyledInput            
            onChange={handleLocationInput}
            onBlur={convertAddressToCoordinates}
            placeholder='Enter city or address or click the icon'
          />
          <button type="button" className='locationButton' onClick={getLocation}>
            <MyLocationIcon />
          </button>
          <HelperText />
        </FormControl>

        <FormControl defaultValue="" required className='inputForm'>
          <Label>Radius</Label>
          <Slider
            aria-label="Distance Radius"
            defaultValue={5}
            getAriaValueText={radiusValue}
            valueLabelDisplay="auto"
            step={5}
            marks={marks}
            min={0}
            max={20}
            sx={{
              width: 320
            }}
            onChange={(e, value) => setFormData({ ...formData, radius: value })}            
          />
        </FormControl>

        <Snackbar
          open={openSnackbarGeo}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity="error"
            sx={{ width: '100%' }}
          >
            Geolocation couldn't be found. Please, try searching by city.
          </MuiAlert>
        </Snackbar>

        <Snackbar
          open={openSnackbarSearch}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity="error"
            sx={{ width: '100%' }}
          >
            Typed location couldn't be found. Please, try searching another location.
          </MuiAlert>
        </Snackbar>

      </Box>


    </>
  );
};

const StyledInput = styled(Input)(
  ({ theme }) => `

  .${inputClasses.input} {
    width: 300px;
    height: 30px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  }
`,
);

const Label = styled(({ children, className }) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
      {children}
      {required ? ' *' : ''}
    </p>
  );
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

export default PlanningForm;