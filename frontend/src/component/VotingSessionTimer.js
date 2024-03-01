import React from 'react';
import { Box, Typography, LinearProgress, styled } from '@mui/material';

const totalDuration = 3600;

// Styled component for animated dots:
const LoadingDots = styled('span')({
  '& span': {
    opacity: 0,
    animation: 'blink 1.4s infinite both',
  },
  '& span:nth-child(2)': {
    animationDelay: '0.2s',
  },
  '& span:nth-child(3)': {
    animationDelay: '0.4s',
  },
  '@keyframes blink': {
    '0%': { opacity: 0 },
    '50%': { opacity: 1 },
    '100%': { opacity: 0 },
  },
});

const VotingSessionTimer = ({ timeLeft, sessionActive }) => {
  // Format the remaining time or show a loading indicator:
  const formatTimeOrLoading = (time) => {
    if (time === null) {
      // Animated loading text effect while the time is being fetched from the server:
      return (
        <LoadingDots>
          Loading<span>.</span><span>.</span><span>.</span>
        </LoadingDots>
      );
    }

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
       {sessionActive ? (
          <>
            <strong>Voting Session Ends In: </strong>
            <strong>{formatTimeOrLoading(timeLeft)}</strong>
          </>
        ) : (
          <strong>Voting Session Is Now Closed!</strong>
        )}
      </Typography>
      {/* Displays the progress bar based on the remaining time */}
      <LinearProgress variant="determinate" value={100 - normalizedTimeLeft} />
    </Box>
  );
}

export default VotingSessionTimer;

