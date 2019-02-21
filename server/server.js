//Libraries
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

//Local
const {generateMessage, generateLocationMessage} = require('./utils/message');

//Init
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

//Middleware
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', "A new user has joined the chat!"));

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback("This is from the server");
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
});


