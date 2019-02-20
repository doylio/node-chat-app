//Libraries
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('createEmail', newEmail => {
        console.log('createEmail', newEmail);
    });

    socket.emit('newMessage', {
        from: 'Sandy',
        text: 'This is a new message'
    });

    socket.on('createMessage', message => {
        console.log(message);
    })
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
});


