const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } })
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const PORT = 5000;

// Setup Socket Io
// const server = http.createServer(app);

app.use(cors());


const router = require('./routes');
app.use(router);

//Instance for Socket Io

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        // Sending the message on user join
        socket.emit('message', {
            user: 'admin', text: `${user.name}, Welcome to the Room ${user.room}.`
        });
        // Broadcasting the message on user join
        socket.broadcast.to(user.room).emit('message', {
            user: 'admin', text: `${user.name} has joined the Conversation!`
        });

        socket.join(user.room);

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    })
});

server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));

