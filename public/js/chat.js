const socket = io();

function scrollToBottom() {
    //Selectors
    let messages = jQuery("#messages");
    let newMessage = messages.children('li:last-child');
    //Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    let params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log("No errors");
        }
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
    let ol = jQuery('<ol></ol>');

    users.forEach(function(user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery("#users").html(ol);
});

socket.on('newMessage', function(message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery("#message-template").html();
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime,
    });

    jQuery("#messages").append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery("#location-message-template").html();
    const html = Mustache.render(template, {
       from: message.from,
       url: message.url,
       createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
})

jQuery('#message-form').on('submit', function(e) {
    const messageTextBox = jQuery('[name=message]');
    e.preventDefault();
    socket.emit('createMessage', {
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    });
});

const locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled');
    locationButton.text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
        locationButton.removeAttr('disabled');
        locationButton.text('Send location');
    }, function() {
        alert('Unable to fetch location.');
        locationButton.removeAttr('disabled');
        locationButton.text('Send location');
    });
});