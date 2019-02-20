const socket = io();

socket.on('connect', function() {
    console.log("Connected to server");
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newEmail', function(email) {
    console.log(email);
});

socket.on('newMessage', function(message) {
    console.log(message);
});

socket.emit('createMessage', {
    to: 'Andrew',
    text: "Thanks for the course, dude!"
})
