import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Instructions from './Instructions';

const CreatePlanButton = () => {
  const navigate = useNavigate();
  const [openInstructions, setOpenInstructions] = useState(false);

  const handleCreatePlan = () => {
    // Open the instructions component
    setOpenInstructions(true);

    // Navigate to /instructions
    navigate('/instructions');

    // Apply body background color
    document.body.classList.add('home-page');

  };

  const handleCloseInstructions = () => {
    // Close the instructions component
    setOpenInstructions(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreatePlan}
        sx={{
          width: '241px',
          height: '53px',
          marginTop: '12px',
          padding: '16px 32px 16px 32px',
          borderRadius: '100px',
          gap: '20px',
          textTransform: 'none',
          backgroundColor: '#3492C7',
          display: 'flex', 
          justifyContent: 'center'
        }}
      >
        Create a Plan
      </Button>

      {/* Instructions Dialog */}
      <Dialog open={openInstructions} onClose={handleCloseInstructions}>
        <DialogTitle>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseInstructions}
            aria-label="close"
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* Render Instructions here */}
          <Instructions />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatePlanButton;
