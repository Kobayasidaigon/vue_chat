<template>
  <div id="app">
    <div v-if="this.$store.state.user_prof_name!='ユーザーA'">
      {{ this.$store.state.user_prof_name }}
      <button @click="sign_out">ログアウト</button>
      <img :src="this.$store.state.user_prof_image" width="40" height="40" />
    </div>
    <div v-else>
      <p>{{ this.$store.state.user_prof_name }}</p>
      <button @click="sign_in">ログイン</button>
    </div>
    <p>メッセージをいれてね</p>
    <input type="text" v-model="message" />
    <button @click="send">send</button>
    <p>{{ this.$store.state.message }}</p>
    <div v-for="(message, index, key) in messageList" :key="key" style="display: block;">
      <img :src="message.user_image" width="40" height="40" />
      <p>{{ message.message }}</p>
      <p>{{ message.user_name }}</p>
      <hr />
    </div>
  </div>
</template>

<script>
import firebase from "./plugins/firebase";

var db = firebase.firestore();
export default {
  data() {
    return {
      message: "hello world",
      user_name: "ユーザー",
      user_image: "",
      messageList: []
    };
  },
  methods: {
    sign_in: function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    sign_out: function() {
      firebase.auth().signOut();
      this.$store.dispatch("sign_out");
    },
    send: function() {
      db.collection("message").add({
        message: this.message,
        user_name: this.$store.state.user_prof_name,
        user_image: this.$store.state.user_prof_image
      });

      let data = {
        message: this.message,
        user_name: this.$store.state.user_prof_name,
        user_image: this.$store.state.user_prof_image
      };
      this.messageList.push(data);
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
        console.log(
          user != ""
            ? (this.user_name = this.$store.state.user_prof_name)
            : (this.user_name = "ユーザーA")
        );
      }
    });
  }
};
</script>
