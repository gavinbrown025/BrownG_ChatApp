(() => {
    console.log('this is main.js');

    const socket = io();

    const vm = new Vue({
        data: {
            messages: [],
            nickname: "",
            username: ""
        },
        created: function() {
            console.log('its a VUE bitch');
        },
        methods: {}
    }).$mount('#app')


})();