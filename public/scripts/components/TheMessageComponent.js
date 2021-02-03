export default {
    name: "ChatMessage",

    props: ['msg', 'socketid'],

    template:
    `<div class="new-message" :class="{ 'my-message' : matchedID }">
        <h2>This is a Message</h2>
        <p>{{msg.message.name}} says:</p>
        <p>{{msg.message.content}}</p>
    </div>
    `,

    data: function (){
        return {
            matchedID: this.socketid == this.msg.id
        }
    }
}