import { Box, Slider, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { styled } from '@mui/system';
import clsx from 'clsx';
import { DatePicker, TimePicker } from 'antd';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../styling/PlanningForm.css';
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import GOOGLE_MAPS_API_KEY from '../config';

const libraries = ['places'];

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
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Function to close Snackbars
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(prev => !prev ? prev : !prev);
  };

  const handleSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  // Config for Place Autocomplete API
  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const options = {
    componentRestrictions: { country: ['ca'] },
    fields: ["formatted_address", "geometry", "name"]
  };

  const onLoad = () => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
  };

  // Function to handle manual input of location from Autocomplete:
  const handlePlaceChanged = async (e) => {
    setLocationInput(e.target.value);
    autoCompleteRef.current.addListener("place_changed", async () => {
      const place = await autoCompleteRef.current.getPlace();
      setLocationInput(place.formatted_address);
      setFormData({
        ...formData,
        location: {
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng()
        },
        locationName: place.formatted_address
      });
    });
  };

  // Function to get user's live current location and convert to readable address (Reverse Geocoding):
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`);
          const address = response.data.results.at(-4).formatted_address;
          if (!address) {
            handleSnackbar("Geolocation couldn't be found. Please, try searching by city.");
            return;
          }
          setLocationInput(address);
          setFormData({
            ...formData,
            location: {
              latitude,
              longitude
            },
            locationName: address
          });
        } catch (error) {
          console.error("Reverse geocoding error:", error);
          handleSnackbar("Geolocation couldn't be found. Please, try searching by city.");
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
          <input className='input-form' onChange={(e) => setFormData({ ...formData, planName: e.target.value })} value={formData.planName} />
          <HelperText />
        </FormControl>

        <FormControl defaultValue="" required className='inputForm' value={formData.hostName}>
          <Label>Host Name</Label>
          <input className='input-form' onChange={(e) => setFormData({ ...formData, hostName: e.target.value })} value={formData.hostName} />
          <HelperText />
        </FormControl>

        <FormControl defaultValue="" required className='inputForm' >
          <Label>Date of Event</Label>
          <DatePicker className='dateTimePicker' onChange={(date, dateString) => setFormData({ ...formData, date: dateString })} placeholder={formData.date} />
          <HelperText />
        </FormControl>

        <FormControl defaultValue="" required className='inputForm' >
          <Label>Time of Event</Label>
          <TimePicker className='dateTimePicker' use12Hours format="h:mm a" onChange={(time, timeString) => setFormData({ ...formData, time: timeString })} placeholder={formData.time} />
          <HelperText />
        </FormControl>

        <FormControl defaultValue="" required className='inputForm' value={locationInput}>
          <Label>Location</Label>
          {isLoaded &&
            <Autocomplete
              onLoad={onLoad}
            >
              <input
                onChange={handlePlaceChanged}
                className='input-form'
                placeholder='Enter city or address or click the icon'
                ref={inputRef}
                value={locationInput}
              />
            </Autocomplete>
          }
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
            value={formData.radius}
          />
        </FormControl>

        <Snackbar
          open={openSnackbar}
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
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>

      </Box>
    </>
  );
};

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
      {required ? <span className='required'>*</span> : ''}
    </p>
  );
})`
  font-family: 'Inter', sans-serif;
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
  color: red;
  margin-top: 5px;
`;

export default PlanningForm;