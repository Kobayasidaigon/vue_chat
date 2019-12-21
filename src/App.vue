<template>
  <div id="app">
    
    <p>メッセージをいれてね</p>
    <input type="text" v-model="message" />
    <button @click="send">send</button>
    <p>{{this.$store.state.message }}</p>
    <li v-for="(value, key) in messageList" :key="key">{{value}}</li>
  </div>
</template>

<script>
import firebase from "./plugins/firebase";

var db = firebase.firestore();
export default {
  data() {
    return {
      message: "hello world",
      messageList: []
    };
  },
  methods: {
    send: function() {
      db.collection("message").add({
        message: this.message
      });

      db.collection("message")
        .get()
        .then(snapshot => {
          let messageList = [];
          snapshot.forEach(doc => {
            messageList.push(doc.data().message);
          });
          this.messageList = messageList;
        });
    }
  },
  created: function() {
    db.collection("message")
      .get()
      .then(snapshot => {
        let messageList = [];
        snapshot.forEach(doc => {
          messageList.push(doc.data().message);
        });
        this.messageList = messageList;
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }
};
</script>