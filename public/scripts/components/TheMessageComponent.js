export default {
    name: "ChatMessage",

    props: ['msg', 'socketid'],

    template:
        `<div class="new-message" :class="{ 'my-message' : matchedID }">
            <p class="meta">{{msg.name}}</p>
            <p>{{msg.message}}</p>
            <p class="time">{{msg.time}}</p>
        </div>`
    ,

    data: function () {
        return {
            matchedID: this.socketid == this.msg.id
        }
    },
    created: function () {
        //console.log(this.msg);
    }
}