import ChatMessage from "./components/TheMessageComponent.js";

(() => {

    const socket = io();
    const myStorage = window.localStorage;

    function setUserId({ sID, message }) {
        vm.socketID = sID;
        vm.message = message;
        vm.setUser(sID);
        vm.dispatchMessage(message);
    }

    function appendMesage(message) {
        vm.messages.push(message);
        vm.message = "";
    }

    function updateUsers(users){
        vm.users = users;
    }

    const vm = new Vue({
        data: {
            message: "",
            messages: [],
            users:[],
            username: "",
            socketID: ""
        },
        updated: function(){
            let messageBoard = document.querySelector('.message-board');
            messageBoard.scrollTop = messageBoard.scrollHeight;
        },

        methods: {
            dispatchMessage() {
                socket.emit('chatmessage', { content: this.message, name: this.username });
                //event.target.firstChild.focus();
            },
            setUser(sID){
                this.username = myStorage.getItem('username') || 'Anonymous';
                socket.emit('userJoin', { sID: this.socketID, name: this.username });
            }
        },

        components: {
            newmessage: ChatMessage
        }

    }).$mount('#app');

    socket.addEventListener('connected', setUserId);
    socket.addEventListener('message', appendMesage);
    socket.addEventListener('pushUsers', updateUsers);

})();