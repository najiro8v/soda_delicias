import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/storage";
import "firebase-admin";
import "firebase-functions";
const firebaseConfig = {
    apiKey: "AIzaSyCTa9zwGbZqrsbMTkUZf_ILU-k-0sQyd7Y",
    authDomain: "sodadelcias.firebaseapp.com",
    projectId: "sodadelcias",
    storageBucket: "sodadelcias.appspot.com",
    messagingSenderId: "1068321241552",
    appId: "1:1068321241552:web:0f8012a38249bb48dee1d5",
    measurementId: "G-JB2ZYW3LW5"
  };
  // Initialize Firebase

  const fire = firebase.initializeApp(firebaseConfig);
  const auth=fire.auth();
  const storageBucket=fire.storage("gs://sodadelcias.appspot.com/");
  const dbNSQL = fire.firestore();
  export {auth,dbNSQL,storageBucket};
  firebase.analytics();