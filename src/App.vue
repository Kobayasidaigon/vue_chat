<template>
  <div id="app">
    <button @click="sign_in">ログイン</button>
    {{this.$store.state.user_prof_name}}
    <img
      :src="this.$store.state.user_prof_image"
      width="40"
      height="40"
    />
    <p>メッセージをいれてね</p>
    <input type="text" v-model="message" />
    <button @click="send">send</button>
    <p>{{ this.$store.state.message }}</p>
    <li v-for="(value,index, key) in messageList" :key="key">{{value}}</li>
  </div>
</template>

<script>
import firebase from "./plugins/firebase";

var db = firebase.firestore();
export default {
  data() {
    return {
      message: "hello world",
      user_name: "",
      user_image: "",
      messageList: []
    };
  },
  methods: {
    sign_in: function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    send: function() {
      db.collection("message").add({
        message: this.message,
        user_name: this.$store.state.user_prof_name,
        user_image: this.$store.state.user_prof_image
      });
      db.collection("message")
        .get()
        .then(snapshot => {
          let messageList = [];
          snapshot.forEach(doc => {
            messageList.push(doc.data().message);
            messageList.push(doc.data().user_name);
            messageList.push(doc.data().user_image);
          });
          this.messageList = messageList;
        });
    }
  },
  created: function() {
    db.collection("message")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let data = {
            message: doc.data().message,
            user_name: doc.data().user_name,
            user_image: doc.data().user_image
          };
          this.messageList.push(data);
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //ログイン状態
        this.$store.dispatch("sign_in", { user: user });
      }
    });
  }
};
</script>
