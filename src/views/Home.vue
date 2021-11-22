<template>
  <div class="home d-flex justify-center align-center">
    <v-card
      elevation="2"
      class="mx-4"
      width="500px"
    >
      <v-card-title class="justify-center">
        Selecione uma sala
      </v-card-title>
      <v-card-text class="justify-center">
        <v-text-field
          v-model="username"
          label="Apelido"
          required
        />
        <v-select
          v-model="room"
          :items="rooms"
          label="Sala"
          required
        />
        <v-btn
          color="primary"
          dark
          large
          @click="doChat()"
        >
          Chat
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      username: '',
      room: '',
      rooms: [
        { text: 'Sala 1', value: 'sala1' },
        { text: 'Sala 2', value: 'sala2' },
        { text: 'Sala 3', value: 'sala3' },
      ],
    }
  },
  methods: {
    doChat() {
      if (this.username && this.room) {
        this.$router.push({
          name: 'Chat',
          params: {
            username: this.username,
            room: this.room,
          },
        })
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  background-color: greenyellow;
}
</style>
