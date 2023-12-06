import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
  const navigate = useNavigate(); // Initialize history
  const [roomName, setRoomName] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [roomCreated, setRoomCreated] = useState(false);

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleCreateRoom = () => {
    // Validate roomName (ensure it's not empty, etc.)
    if (!roomName) {
      alert('Room name is required.');
      return;
    }

    // Generate six random alphabets
    const roomCode = generateRoomCode(6);

    // Update state with the generated code
    setGeneratedCode(roomCode);

    // Log the room name and generated code
    console.log('Room name:', roomName);
    console.log('Generated Code:', roomCode);

    // Set the roomCreated state to true
    setRoomCreated(true);

    // Navigate to the new route with the roomCode parameter
    navigate(`/create-room/${roomCode}`);
  };

  // Helper function to generate random alphabets
  const generateRoomCode = (length) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      result += alphabet.charAt(randomIndex);
    }
    return result;
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="90vh"
        mt={3}
      >
        <Typography variant="h4" align="center" mt={3}>
          Create a Room
        </Typography>
        <TextField
          label="Enter Room Name"
          variant="outlined"
          margin="normal"
          value={roomName}
          onChange={handleRoomNameChange}
          style={{ margin: '16px 0' }}
        />
        <Typography variant="body2" color="textSecondary" mb={2}>
          This will be displayed to others in your room
        </Typography>
        <Button variant="contained" color="primary" onClick={handleCreateRoom} mt={2}>
          Create
        </Button>

        {roomCreated && (
          <Box mt={2}>
            <Typography variant="h6">Welcome to your room, {roomName}!</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default CreateRoom;
