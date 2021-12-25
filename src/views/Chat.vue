<template>
  <div class="chat d-flex flex-column justify-center align-center">
    <header-chat
      :room="room"
    />
    <v-card
      width="500px"
      max-height="600px"
      class="mx-4 pa-4 card-chat"
    >
      <div class="messages">
        <div
          v-for="(message, index) in messages"
          :key="index"
        >
          <message
            :user="user"
            :message="message"
            :previousMessages="messages[index - 1]"
          />
        </div>
      </div>
      <form-send-message
        @sendMessage="sendMessage"
      />
    </v-card>
  </div>
</template>
<script>
import FormSendMessage from '../components/FormSendMessage.vue';
import HeaderChat from '../components/HeaderChat.vue';
import Message from '../components/Message.vue';

export default {
  components: {
    HeaderChat,
    FormSendMessage,
    Message,
  },
  name: 'Chat',
  data() {
    return {
      message: '',
      messages: [],
      user: '',
      room: '',
    }
  },
  sockets: {
    connect: () => {
      console.log('connected');
    },
  },
  created() {
    this.sockets.subscribe("receive_message", (message) => {
      this.mountMessage(message);
    });
  },
  mounted() {
    this.room = this.$route.params.room;
    this.user = this.$route.params.username;
    if (!this.user) this.$router.push({ name: 'Home' });
    this.$socket.emit("join_room", { room: this.room, name: this.user }, (messages) => {
      messages.forEach(message => this.mountMessage(message));
    });
  },
  methods: {
    mountMessage(message) {
      this.messages.push(message);
      console.log('mountMessage', message);
    },
    sendMessage(message) {
      this.$socket.emit('send_message', {
        room: this.room,
        name: this.user,
        message: message,
        createdAt: new Date().toLocaleString()
      });

      this.message = '';
    },
  },
}
</script>
<style lang="scss">
.chat {
  height: 100vh;
  background-color: greenyellow;

  .card-chat {
    margin: 10px 0px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .messages {
      height: calc(80% - 100px);
      overflow-y: auto;
      border: 2px solid #eaeaea;
      padding: 20px;
      background: #d7ff5c42;
      &::-webkit-scrollbar {
        width: 12px;
      }

      &::-webkit-scrollbar-track {
        background: #ebebeb;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #9fdf35;
        border-radius: 20px;
        border: 3px solid #ebebeb;
      }
    }
  }
}
</style>
