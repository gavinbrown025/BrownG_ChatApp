//*trevor
// const express = require('express');
// const path = require('path');

// const mesenger = require('socket.io')();

// const app = express();
// app.use(express.static("public"));


// const port = process.env.PORT || 5050;

// app.get("/", (req,res) => {
//     res.sendFile(path.join(__dirname, "index.html"));
// });

// app.get("/chat", (req, res) => {
//     res.sendFile(path.join(__dirname, "chat.html"));
// });

// const server = app.listen(port, () => {
//     console.log(`app is running on ${port}`);
// });

// messenger.attach(server);

//*  Traversy

const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));


//* when client connects
io.on('connection', socket => {
    console.log('new WS connection..');

    //* welcome current connecter
    socket.emit('message', 'Welcome to chat');

    //* broadCast when user connects but not to the connector
    socket.broadcast.emit('message', 'a user has joined the chat');

    //* to everyone
    io.emit();

    //*when someone leaves
    socket.on('disconnect', () => {
        io.emit('message', 'a user has left the chat');
    });

    socket.on('chatMessage', (msg) => {
        io.emit('message', msg)
    })

});


const PORT = 5050 || process.env.PORT;

server.listen(PORT, () => console.log(`app is running on ${PORT}`));

