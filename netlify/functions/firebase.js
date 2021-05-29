const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyBAnrLs8YDQiEcUuMu-SuVwYpI5A2QKLbc",
  authDomain: "kiei451-final-project.firebaseapp.com",
  projectId: "kiei451-final-project",
  storageBucket: "kiei451-final-project.appspot.com",
  messagingSenderId: "1064640452521",
  appId: "1:1064640452521:web:8257c6738bf78c693d16b8"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase