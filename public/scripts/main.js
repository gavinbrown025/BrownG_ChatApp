import ChatMessage from "./components/TheMessageComponent.js";

(() => {

    const socket = io();


    function setUserId({ sID, message }) {
        vm.socketID = sID;
    }

    function appendMesage(message) {
        vm.messages.push(message);
        vm.message = "";

        let messageBoard = document.querySelector('.message-board');
        messageBoard.scrollTop = messageBoard.scrollHeight;

    }

    const vm = new Vue({
        data: {
            message: "",
            messages: [],
            nickname: "",
            username: "",
            socketID: ""
        },

        created: function () {
            console.log('its a VUE bitch');
        },

        methods: {
            dispatchMessage() {
                socket.emit('chatmessage', { content: this.message, name: this.nickname || "Anonymous" });
            }
        },

        components: {
            newmessage: ChatMessage
        }

    }).$mount('#app');

    socket.addEventListener('connected', setUserId);
    socket.addEventListener('message', appendMesage);

})();