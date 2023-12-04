// JoinRoom.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const JoinRoom = () => {
  const [userName, setUserName] = useState('');
  const [roomCode, setRoomCode] = useState('');

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleRoomCodeChange = (event) => {
    setRoomCode(event.target.value);
  };

  const handleJoinRoom = () => {
    // Add logic to handle joining a room
    console.log('User Name:', userName);
    console.log('Room Code:', roomCode);
    // Add further logic, such as API calls or state updates
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="90vh"  // Set the height of the container to full viewport height
      >
        <Typography variant="h4" align="center" mt={3}>
          Join a Room
        </Typography>
        <TextField
          label="Your Name"
          margin="normal"
          value={userName}
          onChange={handleUserNameChange}
          style={{ margin: '16px 0' }}
        />
        <TextField
          label="Room Code"
          margin="normal"
          value={roomCode}
          onChange={handleRoomCodeChange}
          style={{ margin: '16px 0' }}
        />
        <Button variant="contained" color="primary" onClick={handleJoinRoom} mt={2}>
          Enter
        </Button>
      </Box>
    </Container>
  );
};

export default JoinRoom;
