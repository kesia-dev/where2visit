// CreatePlanButton.js
import React from 'react';
import { Button } from '@mui/material';

const CreatePlanButton = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        width: '241px',
        height: '53px',
        marginTop: '5px',
        padding: '16px 32px 16px 32px',
        borderRadius: '100px',
        gap: '20px',
        textTransform: 'none',
      }}
    >
      Create a Plan
    </Button>
  );
};

export default CreatePlanButton;
