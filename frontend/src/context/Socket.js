// context/Socket.js
import { io } from 'socket.io-client';

const Socket = io(import.meta.env.VITE_BACKEND_SOCKET, {
  autoConnect: true,
  transports: ['websocket'], // optional: forces websocket only
});

export default Socket;