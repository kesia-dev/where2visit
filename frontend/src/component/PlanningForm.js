import { Box, Checkbox, Slider } from '@mui/material';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';
import clsx from 'clsx';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import React from 'react';
import { DatePicker, TimePicker } from 'antd';
import '../styling/PlanningForm.css';

const PlanningForm = () => {

  function valuetext(value) {
    return `${value} km`;
  }

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

  const onChange = (time, timeString) => {
    console.log(time, timeString);
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" marginTop={3}>

        <FormControl defaultValue="" required className='inputForm'>
          <Label>Plan Name</Label>
          <StyledInput />
          <HelperText />
        </FormControl>

        <FormControl defaultValue="" required className='inputForm'>
          <Label>Host Name</Label>
          <StyledInput />
          <HelperText />
        </FormControl>

        <FormControl defaultValue="" required className='inputForm'>
          <Label>Date of Event</Label>
          {/* <FormGroup>
            <span className='formCheckbox'>
            <FormControlLabel control={<Checkbox  size="small" />} label="Now" />
            </span>
          </FormGroup> */}
          <DatePicker className='dateTimePicker' onChange={onChange} placeholder='' />
          <HelperText />
        </FormControl>

        <FormControl defaultValue="" required className='inputForm'>
          <Label>Time of Event</Label>
          <FormGroup>
            <span className='formCheckbox'>
            {/* <FormControlLabel control={<Checkbox  size="small" />} label="Now" /> */}
            <FormControlLabel control={<Checkbox  size="small" />} label="All Day" />
            </span>
          </FormGroup>
          <TimePicker className='dateTimePicker' use12Hours format="h:mm a" onChange={onChange} placeholder='' />
          <HelperText />
        </FormControl>
        
        <FormControl defaultValue="" required className='inputForm'>
          <Label>Location</Label>
          <StyledInput />
          <HelperText />
        </FormControl>

        <FormControl defaultValue="" required className='inputForm'>
          <Label>Radius</Label>
          <Slider
            aria-label="Distance Radius"
            defaultValue={5}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"            
            step={5}
            marks={marks}
            min={0}
            max={20}
            sx={{
              width: 350
            }}
          />     
        </FormControl>

      </Box>
    </>
  );
};

const StyledInput = styled(Input)(
  ({ theme }) => `

  .${inputClasses.input} {
    width: 320px;
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