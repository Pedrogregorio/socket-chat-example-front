<template>
  <div
    class="content-message my-2"
    :class="'content-'+whichUser()"
  >
    {{ isUser() }}
    <div
      :class="whichUser()"
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
</template>
<script>
export default {
  name: 'Message',
  props: {
    message: {
      type: Object,
      default: () => {},
    },
    previousMessages: {
      type: Object,
      default: () => {},
    },
    user: {
      type: String,
      default: '',
    },
  },
  methods: {
    whichUser() {
      return this.user === this.message.name? 'current-user' : 'other-user';
    },
    isUser() {
      const isUser = this.user === this.message.name || this.message.name === this.previousMessages?.name;
      return isUser? '' : `${this.message.name}:`;
    },
  },
};
</script>
<style lang="scss" scoped>
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
</style>