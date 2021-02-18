
const express = require('express');
const path = require('path');
const io = require('socket.io')();
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


let users = [];

io.attach(server);
io.on('connection', socket => {

    console.log(`${socket.id} has connected`);

    //*send the user their id
    socket.emit('connected', { sID: socket.id, message: 'has joined the chat' });

    socket.on('userJoin', user => {
        users.push(user);
        io.emit('pushUsers', users);
    });

    socket.on('chatmessage', msg => {
        io.emit('message', { id:socket.id, message:msg.content, name:msg.name, time:moment().format('h:mm a') });
    });

    socket.on('typing', username => {
        socket.broadcast.emit('typing', username);
    });

    socket.on('disconnect', () => {
        let thisUser = users.filter(user => user.sID == socket.id);
        io.emit('message', {message: `${thisUser[0].name} has left the chat`, time: moment().format('h:mm a')});

        users = users.filter(user => user.sID !== socket.id);
        io.emit('pushUsers', users);
    })

});
