// const express = require('express');
// const path = require('path');

// const messenger = require('socket.io')();

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

// messenger.on('connection',(socket) => {
//     console.log(`a user connected: ${socket.id}`);

//     socket.on('disconnect', (socket) => {
//         console.log('a user disconnected');
//     })
// });


const express = require('express');
const path = require('path');
const messenger = require('socket.io')();

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
    socket.broadcast.emit('message', `${socket.id} connected`);

    //*send the user their id
    socket.emit('connected', { sID: `${socket.id}`, message: 'new connection' });


    socket.on('chatmessage', function (msg) {
        console.log(msg);
        messenger.emit('message', { id: socket.id, message: msg });
    });

    socket.on('disconnect', (socket) => {
        console.log('a user disconnected');
    })

});


