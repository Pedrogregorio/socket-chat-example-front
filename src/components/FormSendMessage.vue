<template>
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
</template>
<script>
export default {
  name: 'FormSendMessage',
  data() {
    return {
      message: '',
    }
  },
  sendMessage() {
    this.$emit('sendMessage', this.message);
  },
};
</script>
