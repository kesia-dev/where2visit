import React from 'react';
import { Typography, Box, Input, Button } from '@mui/material';

const JoinComponents = () => {
  return (
    <div>
      <Typography
        variant='h3'
        align='center'
        sx={{
          fontFamily: 'Inter',
          fontSize: '22px',
          fontWeight: 700,
          lineHeight: '28px',
          textAlign: 'center',
          color: 'white',
          marginTop: '15px',
        }}
      >
        Joining an Existing Plan?
      </Typography>
      <div>
        <Box
          sx={{
            width: '182px',
            height: '21px',
            padding: '16px 32px 16px 32px',
            borderRadius: '20px',
            border: '1px solid #1C1C1C',
            gap: '12px',
            background:
              'linear-gradient(0deg, #C79E34, #C79E34), linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Input
            placeholder="Enter Code"
            disableUnderline
            sx={{
              fontFamily: 'Inter',
              fontSize: '16px',
              fontWeight: 600,
              color: 'black',
              alignItems: 'center',
              letterSpacing: '0.35px',
              lineHeight: '21px',
            }}
          />
        </Box>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: '241px',
            height: '53px',
            marginTop: '15px',
            padding: '16px 32px 16px 32px',
            borderRadius: '100px',
            gap: '20px',
            textTransform: 'none',
          }}
        >
          Join Plan
        </Button>
      </div>
    </div>
  );
};

export default JoinComponents;
