import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBwboLjZZGUSE9xK3LTsdd0DgWLUHZA7WA",
  authDomain: "todolist-50b5c.firebaseapp.com",
  databaseURL: "https://todolist-50b5c-default-rtdb.firebaseio.com",
  projectId: "todolist-50b5c",
  storageBucket: "todolist-50b5c.appspot.com",
  messagingSenderId: "720614305509",
  appId: "1:720614305509:web:ca2aff3904345a33702e0c"
};

// Inicialize o Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

export { database, auth };