import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
var Config = {
  apiKey: "AIzaSyAYn9-e7-aQwiYSluZGbMoAaomxdGetxAs",
  authDomain: "train-77065.firebaseapp.com",
  databaseURL: "https://train-77065.firebaseio.com",
  projectId: "train-77065",
  storageBucket: "train-77065.appspot.com",
  messagingSenderId: "448796482414",
  appId: "1:448796482414:web:6ee148128eb08648e53f7f",
  measurementId: "G-5MCQEMMHHX"
};
// Initialize Firebase
firebase.initializeApp(Config);

export default firebase;
