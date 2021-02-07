import ChatMessage from "./components/TheMessageComponent.js";

(() => {

    const socket = io();
    const myStorage = window.localStorage;
    let messageBoard = document.querySelector('.message-board');

    console.log(myStorage);

    function setUserId({ sID, message }) {
        vm.socketID = sID;
        vm.message = message;
        vm.dispatchMessage(message);
        vm.setUsername();
    }

    function appendMesage(message) {
        vm.messages.push(message);
        vm.message = "";

        messageBoard.scrollTop = messageBoard.scrollHeight;
        //console.log(messageBoard.scrollTop);
        //console.log(messageBoard.scrollHeight);
    }

    const vm = new Vue({
        data: {
            message: "",
            messages: [],
            users:[],
            username: "",
            socketID: ""
        },
        created: function(){
            this.username = myStorage.getItem('username');
            this.users.push(myStorage.getItem('username'));
        },

        methods: {
            dispatchMessage() {
                socket.emit('chatmessage', { content: this.message, name: this.username || "Anonymous" });
            },
            setUsername() {
            }
        },

        components: {
            newmessage: ChatMessage
        }

    }).$mount('#app');

    socket.addEventListener('connected', setUserId);
    socket.addEventListener('message', appendMesage);

})();