import firebase from 'firebase';

require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyD5GzCcjqLy6TrnKBC3470VzrgRFCV-v3E",
    authDomain: "book-santa-bc3f0.firebaseapp.com",
    projectId: "book-santa-bc3f0",
    storageBucket: "book-santa-bc3f0.appspot.com",
    messagingSenderId: "490800864317",
    appId: "1:490800864317:web:152373cb27f990fb885e54"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();