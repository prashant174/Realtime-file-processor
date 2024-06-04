import io from 'socket.io-client'

const socket=io('https://real-time-file-processor-backend.onrender.com/');

export default socket;