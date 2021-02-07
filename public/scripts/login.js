(() => {

    const myStorage = window.localStorage;

    const vm = new Vue({
        methods: {
            setUsername(login) {
                let username = login.target.elements[0].value;
                myStorage.setItem('username', username);
                console.log(myStorage);
            }
        }
    }).$mount('#app');

})();