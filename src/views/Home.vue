<template>
  <div class="home">
    <p>メッセージをいれてね</p>
    <input type="text" v-model="message" />
    <p>{{ message }}</p>
    <button @click="send">send</button>
    <p>{{ this.$store.state.count }}</p>
    <p>{{ this.$store.state.message }}</p>
  </div>
</template>

<script>
// @ is an alias to /src

import firebase from "firebase";
export default {
  data() {
    return {
      message: "hello world",
      memoRef: firebase.firestore().collection("memos")
    };
  },
  methods: {
    send: function() {
      this.memoRef.add({
        message: this.message
      });
    }
  }
};
</script>
