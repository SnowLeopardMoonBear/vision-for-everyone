<template>
  <div class="col align-self-center">
    <h3 class="pb-5 text-left underline">Create todos</h3>
    <form class="sign-in" @submit.prevent>
      <div class="form-group todo__row">
        <input
          type="text"
          class="form-control"
          @keypress="typing=true"
          placeholder="What do you want to do?"
          v-model="name"
          @keyup.enter="addTodo($event)"
        />
        <input
          type="text"
          class="form-control"
          @keypress="typing=true"
          placeholder="DF communication"
          v-model="msg"
          @keyup.enter="dfCom()"
        />
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
      msg: "4 dollars!",
      typing: false
    };
  },
  mounted() {
    this.$socket.on("receive chat", function(dar){this.msg = dar}); // 소켓 통해 들으려는데 잘 안 되네...
  },
  methods: {
    dfCom() {
      var msg = this.msg
      this.$socket.emit("send chat", this.msg) // 이걸로 소켓연결
      this.msg = ''
    },
  }
};
</script>
<style lang="scss" scoped>
.underline {
  text-decoration: underline;
}
</style>