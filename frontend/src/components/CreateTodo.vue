<template>
  <div class="col align-self-center">
    <h3 class="pb-5 text-left underline">Create todos</h3>
    <form class="sign-in" @submit.prevent>
      <div class="form-group todo__row">
        <input
          type="text"
          class="form-control"
          @keypress="typing=true"
          placeholder="DF communication"
          v-model="msg"
          @keyup.enter="dfCom()"
        />
        <div v-for="chat in chats" v-bind:key="chat">{{chat}}</div>
        <small class="form-text text-muted" v-show="typing">Hit enter to save</small>
      </div>
    </form>
  </div>
</template>
<script>
// import axios from "axios";

export default {
  data() {
    return {
      name: "",
      msg: "component message",
      chats: [],
      typing: false
    };
  },
  mounted() {
    this.$socket.on("receive chat", data => this.chats.push(data))
  },
  methods: {
    dfCom() {
      this.chats.push(this.msg);
      this.$socket.emit("send chat", this.msg); // 이걸로 소켓연결
      this.msg = '';
    }
  }
};
</script>
<style lang="scss" scoped>
.underline {
  text-decoration: underline;
}
</style>