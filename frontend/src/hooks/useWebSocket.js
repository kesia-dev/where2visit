import { useEffect, useState, useRef } from 'react';

const useWebSocket = (url) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const socket = useRef(null);

  // Function to initialize WebSocket connection:
  const connect = () => {
    console.log('Attempting to connect to WebSocket...');
		socket.current = new WebSocket(url);

    socket.current.onopen = () => {
      console.log('WebSocket Connected');
    };

    socket.current.onmessage = (event) => {
			// console.log('Received WebSocket message:', event.data);
      const message = JSON.parse(event.data);
      if (message.type === 'time-left') {
        setTimeLeft(message.duration);
      }
    };

    socket.current.onclose = (event) => {
			console.log(`WebSocket Closed - Code: ${event.code}, Reason: ${event.reason}`);
      if (!event.wasClean) {
        // Attempt to reconnect with a fixed delay:
        console.log('WebSocket Disconnected. Attempting to reconnect...');
        setTimeout(connect, 4000); 
      }
    };

    socket.current.onerror = (error) => {
      console.error(`WebSocket Error - State: ${socket.current.readyState}`);
			console.log('websocket readystate', socket.current.readyState);
    };
  };

// Function to send message to WebSocket server:
const sendMessage = (message) => {
	if (socket.current.readyState === WebSocket.OPEN) {
		socket.current.send(message);
	} else {
		console.error('WebSocket is not open. Cannot send message:', message);
	}
};

// Effect hook to establish connection on mount and provide cleanup:
useEffect(() => {
	connect();
	return () => {
		if (socket.current) {
			socket.current.close();
		}
	};
}, []);

return { timeLeft, sendMessage, socket };
};

export default useWebSocket;