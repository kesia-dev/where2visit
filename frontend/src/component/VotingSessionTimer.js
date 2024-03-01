import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
        main: "#3492C7",
        },
    },
    });


const totalDuration = 3600;

const VotingSessionTimer = ({ timeLeft }) => {
  // Format the remaining time:
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return [hours, minutes, seconds]
      .map(unit => (unit < 10 ? `0${unit}` : unit))
      .join(':');
  };

  // Calculate the normalized time left for the progress bar:
  const normalizedTimeLeft = timeLeft !== null ? (timeLeft / totalDuration) * 100 : 100;

  return (
    <Box sx={{ width: '95%', my: 1.5, mx: "auto" }}>
      <Typography variant="body1" sx={{ fontSize: "16px", color: "#333", textAlign: 'center', mb: 0.75 }}>
        <strong>Voting Session Ends In: {timeLeft !== null ? formatTime(timeLeft) : "Loading timer..."}</strong>
      </Typography>
      {/* Displays the progress bar based on the remaining time */}
      <ThemeProvider theme={theme}>
      <LinearProgress variant="determinate" color="primary" value={100 - normalizedTimeLeft} sx={{ height: "10px", borderRadius: "10px", color: "#2A759F"}} />
      </ThemeProvider>
    </Box>
  );
}

export default VotingSessionTimer;

