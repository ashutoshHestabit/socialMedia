import { io } from 'socket.io-client';
const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const socket = io(BACKEND, {
    transports: ['websocket'],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });
  
  socket.on('connect_error', (err) => {
    console.error('Socket connection error:', err);
  });
export default socket;
