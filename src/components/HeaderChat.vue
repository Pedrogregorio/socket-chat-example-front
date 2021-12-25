<template>
  <div class="header-chat">
    <div
      class="return-button"
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
    <div
      class="text-center text-h4 font-weight-black name-room"
    >
      {{ room }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderChat',
  props: {
    room: {
      type: String,
      default: '',
    },
  },
  methods: {
    returnToHome() {
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>
<style lang="scss">
  .header-chat {
    width: 100%;
    display: flex;
    max-width: 500px;
    align-items: flex-end;
    border: 1px solid white;
    justify-content: space-between;
    padding: 10px;
    border-radius: 8px;
    .name-room {
      width: 100%;
      height: 40px;
      color: white;
    }
    .return-button {
      .content-return-button {
        max-width: 500px;
        margin: auto;
        .v-btn {
          width: 20px;
        }
      }
    }
  }
</style>
