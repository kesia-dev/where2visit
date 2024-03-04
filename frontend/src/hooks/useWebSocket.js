import { useEffect, useState, useRef } from 'react';

const useWebSocket = (url, planCode, onSessionEnd) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const socket = useRef(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const maxReconnectAttempts = 2;
  const [sessionActive, setSessionActive] = useState(null);

  const connect = () => {
    if (reconnectAttempts >= maxReconnectAttempts) {
      console.log('Max reconnect attempts reached, will not attempt to reconnect again.');
      return;
    }

    console.log('Attempting to connect to WebSocket...');
    socket.current = new WebSocket(url);

    socket.current.onopen = () => {
      console.log('WebSocket Connected');
      // Request the current session state when the connection is established:
      sendMessage({ action: 'check-session-state', planCode });
      setReconnectAttempts(0);
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.planCode === planCode) {   
        switch (message.type) {
          case 'time-left':
            setTimeLeft(message.duration);
          break;
          case 'end-voting':
            // console.log('Received end-voting message for:', planCode);
            setSessionActive(false);
            if (onSessionEnd) {
              onSessionEnd();
            }
            break; 
          default:
            console.log('Received an unknown message type:', message.type);
        }
      }
    };

    socket.current.onclose = () => {
      console.log('WebSocket Disconnected. Attempting to reconnect...');
      attemptReconnect();
    };

    socket.current.onerror = () => {
      console.error('WebSocket Error - state:', socket.current.readyState);
    };
  };

  const attemptReconnect = () => {
    if (reconnectAttempts < maxReconnectAttempts) {
      const backoffTime = Math.pow(reconnectAttempts, 2) * 1000;
      setTimeout(connect, backoffTime);
      setReconnectAttempts(reconnectAttempts + 1);
    } else {
      console.log('Stopped attempting to reconnect.');
    }
  };

  const sendMessage = (message) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open. Message not sent.');
    }
  };

  useEffect(() => {
    connect();
    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
    // eslint-disable-next-line
  }, [url, planCode]);

  return { timeLeft, sessionActive, sendMessage, socket };
};

export default useWebSocket;
