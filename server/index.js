const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');


const PORT = process.env.PORT || 5000;

// Setup Socket Io
const app = express();
const server = http.createServer(app);

//Instance for Socket Io
const io = socketio(server);
io.on('connection', (socket) => {
    console.log('We have a new Connection');

    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
});


const router = require('./routes/route');
app.use(router);

server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));

app.use(cors(
    {
        origin: '*',
    }
));
