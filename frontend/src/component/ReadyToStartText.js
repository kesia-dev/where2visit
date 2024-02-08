// ReadyToStartText.js
import React from 'react';
import { Typography } from '@mui/material';

const ReadyToStartText = () => {
  return (
    <Typography
      variant="h5"
      align="center"
      sx={{
        fontFamily: 'Inter',
        fontSize: '22px',
        fontWeight: 700,
        lineHeight: '28px',
        letterSpacing: '0.35px',
        textAlign: 'center',
        color: 'white',
        marginTop: '20px',
      }}
    >
      Ready to Start?
    </Typography>
  );
};

export default ReadyToStartText;
