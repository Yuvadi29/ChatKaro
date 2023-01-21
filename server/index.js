const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {cors: {origin: "*"}})
const cors = require('cors');

const PORT = 5000;

// Setup Socket Io
// const server = http.createServer(app);

app.use(cors());


const router = require('./routes');
app.use(router);

//Instance for Socket Io

io.on('connection', (socket) => {
    console.log('We have a new Connection');

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);

        // const error = true;
        // if(error) {
        //     callback({ error: 'error' });
        // }
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
});



server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));

