
const express = require('express');
const path = require('path');
const messenger = require('socket.io')();
const moment = require('moment');

const app = express();


app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "chat.html"));
});



const port = process.env.PORT || 5050;
const server = app.listen(port, () => console.log(`app is running on ${port}`));


messenger.attach(server);
messenger.on('connection', socket => {

    console.log(`${socket.id} has connected`);
    //! broadCast when user connects but not to the connector
    //socket.emit('connected', socket.id);

    //*send the user their id
    socket.emit('connected', { sID: socket.id, message: 'has joined the chat' });


    socket.on('chatmessage', function (msg) {
        console.log(msg);
        messenger.emit('message', { id: socket.id, message: msg, time: moment().format('h:mm a') });
    });

    socket.on('disconnect', (socket) => {
        console.log('a user disconnected');
    })

});
