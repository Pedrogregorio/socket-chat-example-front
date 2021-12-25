<template>
  <div class="chat d-flex flex-column justify-center align-center">
    <div
      class="text-center text-h4 font-weight-black"
    >
      {{ room }}
    </div>
    <div
      class="pt-6 return-button"
    >
      <div class="content-return-button">
        <v-btn
          color="success"
          elevation="2"
          @click="returnToHome"
        >
          <v-icon>
            mdi-arrow-left
          </v-icon>
        </v-btn>
      </div>
    </div>
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
          <div
            class="content-message my-2"
            :class="'content-'+whichUser(message.name)"
          >
            {{ isUser(message.name, index) }}
            <div
              :class="whichUser(message.name)"
              class="message"
            >
              <div>
                {{ message.message }}
              </div>
            </div>
            <div>
              {{ message.createdAt }}
            </div> 
          </div>
        </div>
      </div>

      <div class="send-message my-4">
        <form @submit.prevent="sendMessage">
          <v-text-field
            v-model="message"
            outlined
            label="Digite sua menssagem"
          />
          <v-btn
            block
            color="success"
            type="submit"
          >
            Enviar
          </v-btn>
        </form>
      </div>
    </v-card>
  </div>
</template>
<script>

export default {
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
      console.log(message);
      this.mountMessage(message);
    });
  },
  mounted() {
    this.room = this.$route.params.room;
    this.user = this.$route.params.username;
    if (!this.user) this.$router.push({ name: 'Home' });
    this.$socket.emit("join_room", { room: this.room, user: this.user }, (messages) => {
      console.log('callback');
      console.log("Sao essas menssagesn", messages);
      messages.forEach(message => this.mountMessage(message));
    });
  },
  methods: {
    whichUser(name) {
      return this.user === name? 'current-user' : 'other-user';
    },
    isUser(name, index) {
      const isUser = this.user === name || name === this.messages[index - 1]?.name;
      return isUser? '' : `${name}:`;
    },
    returnToHome() {
      this.$router.push({ name: 'Home' });
    },
    mountMessage(message) {
      this.messages.push(message);
      console.log('mountMessage', message);
    },
    sendMessage() {
      this.$socket.emit('send_message', {
        room: this.room,
        name: this.user,
        message: this.message
      });

      this.message = '';
    },
  },
}
</script>
<style lang="scss" scoped>
.chat {
  height: 100vh;
  background-color: greenyellow;

  .return-button {
    width: 100%;
    .content-return-button {
      max-width: 500px;
      margin: auto;
      .v-btn {
        width: 20px;
      }
    }
  }

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
      .content-message {
        &.content-current-user {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        &.content-other-user {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .message {
          padding: 10px;
          display: flex;
          justify-content: space-between;
          flex-wrap: nowrap;
          &.other-user {
            background-color: #659c10;
            color: white;
            border-radius: 10px 10px 10px 0px
          }
          &.current-user {
            background-color: #e5ffbc;
            color: black;
            border-radius: 10px 10px 0px 10px
          }
        }
      }
    }
  }

  .nav {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    font-size: 1em;
    font-weight: bold;
    text-align: center;
  } 
}
</style>
