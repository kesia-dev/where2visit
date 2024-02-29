import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

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
    <Box sx={{ width: '100%', mt: 3 }}>
      <Typography variant="h6" sx={{ fontSize: "18px", color: "#333", textAlign: 'center', mb: 1 }}>
        <strong>Voting Session Ends In: {timeLeft !== null ? formatTime(timeLeft) : "Loading timer..."}</strong>
      </Typography>
      {/* Displays the progress bar based on the remaining time */}
      <LinearProgress variant="determinate" value={100 - normalizedTimeLeft} />
    </Box>
  );
}

export default VotingSessionTimer;

