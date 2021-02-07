export default {
    name: "ChatMessage",

    props: ['msg', 'socketid'],

    template:
        `<div class="new-message" :class="{ 'my-message' : matchedID }">
            <p class="meta">{{msg.message.name}}</p>
            <p>{{msg.message.content}}</p>
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