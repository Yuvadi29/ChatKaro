const express = require('express');
const socketio = require('socket.io');
const http = require('http');

// Setup Socket Io
const app = express();
const server = http.createServer(app);

//Instance for Socket Io
const io = socketio(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
