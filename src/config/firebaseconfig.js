import { initializeApp } from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBwboLjZZGUSE9xK3LTsdd0DgWLUHZA7WA",
    authDomain: "todolist-50b5c.firebaseapp.com",
    projectId: "todolist-50b5c",
    storageBucket: "todolist-50b5c.appspot.com",
    messagingSenderId: "720614305509",
    appId: "1:720614305509:web:ca2aff3904345a33702e0c"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);