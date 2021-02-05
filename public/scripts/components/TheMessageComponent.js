export default {
    name: "ChatMessage",

    props: ['msg', 'socketid'],

    template:
        `<div class="new-message" :class="{ 'my-message' : matchedID }">
            <p>{{msg.message.content}}</p>
            <p class="meta">{{msg.message.name}}<span class="time">{{time}} "time"</span></p>
        </div>`
    ,

    data: function () {
        return {
            matchedID: this.socketid == this.msg.id
        }
    }
}