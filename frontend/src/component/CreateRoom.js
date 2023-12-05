// CreateRoom.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleCreateRoom = () => {
    // Add logic to handle creating a room
    console.log('Room name:', roomName);
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
          Create a Room
        </Typography>
        <TextField
          label="Enter Room Name"
          margin="normal"
          value={roomName}
          onChange={handleRoomNameChange} 
          style={{ margin: '16px 0' }}  // Adjust margin for TextField
        />
        <h7>This will be displayed to others in your room</h7>
        <Button variant="contained" color="primary" onClick={handleCreateRoom} mt={2}>
          Create
        </Button>
      </Box>
    </Container>
  );
};

export default CreateRoom;
