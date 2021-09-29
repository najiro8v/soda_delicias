import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";
import "firebase/compat/storage";
// Initialize Firebase
/*const firebaseConfig = {
  apiKey: "AIzaSyCTa9zwGbZqrsbMTkUZf_ILU-k-0sQyd7Y",
  authDomain: "sodadelcias.firebaseapp.com",
  projectId: "sodadelcias",
  storageBucket: "sodadelcias.appspot.com",
  messagingSenderId: "1068321241552",
  appId: "1:1068321241552:web:0f8012a38249bb48dee1d5",
  measurementId: "G-JB2ZYW3LW5"
};*/
const firebaseConfig = {
  apiKey: "AIzaSyCh4MHJaoWgBaoWWdfjH_ESXwO536-2HQw",
  authDomain: "soda-delicias.firebaseapp.com",
  projectId: "soda-delicias",
  storageBucket: "soda-delicias.appspot.com",
  messagingSenderId: "82420759354",
  appId: "1:82420759354:web:19883ec780a818b1b0ae03",
  measurementId: "G-P7D8S93SP6"
}; 
const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth();
const storageBucket = fire.storage("gs://soda-delicias.appspot.com");
const dbNSQL = fire.firestore();
export { auth, dbNSQL, storageBucket };
firebase.analytics();