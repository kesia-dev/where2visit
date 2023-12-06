import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Box, IconButton, Tooltip, Snackbar  } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import copy from 'clipboard-copy';

const RoomInfo = () => {
  // Extract the roomCode from the URL parameters
  const { roomCode } = useParams();
  
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleCopyToClipboard = () => {
    copy(roomCode);
    setIsSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
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
        </Paper>
      </Box>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Room code has been copied to clipboard"
      />
    </Container>
  );
};

export default RoomInfo;
