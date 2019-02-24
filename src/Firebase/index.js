import firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDOPWQtlS9RECcDebMopEV79DdLnyXRaa0",
  authDomain: "rnative-1549466028052.firebaseapp.com",
  databaseURL: "https://rnative-1549466028052.firebaseio.com",
  projectId: "rnative-1549466028052",
  storageBucket: "rnative-1549466028052.appspot.com",
  messagingSenderId: "86256577359"
};
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
