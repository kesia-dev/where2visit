import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Box, IconButton, Tooltip, Snackbar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import copy from 'clipboard-copy';

const RoomInfo = () => {
  const { roomCode } = useParams();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleCopyToClipboard = () => {
    copy(roomCode);
    setIsSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handleCloseRoom = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmCloseRoom = () => {
    // Add logic to perform any necessary cleanup or notify the server
    // before closing the room, then navigate back to the home route
    // validate();
    navigate('/');
    setIsDialogOpen(false);
  };

  const handleCancelCloseRoom = () => {
    setIsDialogOpen(false);
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="80vh"
        mt={3}
      >
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Your room has been created!
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Room Code: {roomCode}
            {/* Copy to Clipboard Button */}
            <Tooltip title="Copy to Clipboard" arrow>
              <IconButton onClick={handleCopyToClipboard} size="small" style={{ marginLeft: '8px' }}>
                <FileCopyIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          {/* Add additional content or components related to the room */}
          <Button variant="contained" color="primary" style={{ backgroundColor: 'red' }} onClick={handleCloseRoom} mt={2}>
            Close Room
          </Button>
        </Paper>
      </Box>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Room code has been copied to clipboard"
      />
      <Dialog
        open={isDialogOpen}
        onClose={handleCancelCloseRoom}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to close the room?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Closing the room will log everyone out of the room.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelCloseRoom} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmCloseRoom} color="primary" autoFocus>
            Close Room
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RoomInfo;
