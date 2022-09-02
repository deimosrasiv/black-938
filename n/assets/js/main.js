 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDEXV4uu0VGnIWNcpr3xCRAYq1u3wxiyBI",
 authDomain: "black-938.firebaseapp.com",
 projectId: "black-938",
 storageBucket: "black-938.appspot.com",
 messagingSenderId: "493225174118",
 appId: "1:493225174118:web:72aa09b310b7f57297f9a7",
 measurementId: "G-CW21DRFX5J" 
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 const auth = firebase.auth();
 const fs = firebase.firestore();