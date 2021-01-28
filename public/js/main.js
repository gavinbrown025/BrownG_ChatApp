(() => {

    let chatForm = document.querySelector('#chat-form'),
    messageBoard = document.querySelector('.message-board');

    const socket = io();
    socket.on('message', message => {
        outputMessage(message);
        messageBoard.scrollTop = messageBoard.scrollHeight;
    });

    const sendMessage = (e) => {
        e.preventDefault();
        let msg = e.target.elements.msg.value;

        //* emiting message to server
        socket.emit('chatMessage', msg);

        e.target.elements.msg.value = '';
        e.target.elements.msg.focus();
    }

    const outputMessage = (message) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML =
            `<p class="message-text">
                ${message}
            </p>
            <p class="meta">Gavin <span>9:12pm</span></p>`;

        messageBoard.appendChild(messageDiv);
    }

    chatForm.addEventListener('submit', sendMessage);
})();



//!     let vue_vm = new Vue({
//         data: {
//             socket: io(),
//             messages: []
//         },
//         mounted: function () { },
//         updated: function () {
//             this.socket.on('message', message => {
//                 outputMessage(message);
//             })
//         },
//         methods: {
//             sendMessage(e) {
//                 //* emiting message to server
//                 this.socket.emit('chatMessage', msg);
//             }
//         },
//         components: {}
//     }).$mount("#app");