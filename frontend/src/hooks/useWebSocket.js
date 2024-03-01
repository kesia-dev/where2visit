import { useEffect, useState, useRef } from 'react';

const useWebSocket = (url, onSessionEnd) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const socket = useRef(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const maxReconnectAttempts = 2;
  const [sessionActive, setSessionActive] = useState(true);

  const connect = () => {
    if (reconnectAttempts >= maxReconnectAttempts) {
      console.log('Max reconnect attempts reached, will not attempt to reconnect again.');
      return;
    }

    console.log('Attempting to connect to WebSocket...');
    socket.current = new WebSocket(url);

    socket.current.onopen = () => {
      console.log('WebSocket Connected');
      setReconnectAttempts(0);
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'time-left') {
        setTimeLeft(message.duration);
      } else if (message.type === 'end-voting') {
        setSessionActive(false);
        if (onSessionEnd) {
          onSessionEnd();
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
      const backoffTime = Math.pow(reconnectAttempts, 2) * 100;
      setTimeout(connect, backoffTime);
      setReconnectAttempts((prev) => prev + 1);
    } else {
      console.log('Stop attempting to reconnect.');
    }
  };

  const sendMessage = (message) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(message);
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
  }, [url]);

  return { timeLeft, sessionActive, sendMessage, socket };
};

export default useWebSocket;
