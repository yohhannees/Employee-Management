
import firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCu8JHEjephRnRhDyLSFohKY5_1X2bZg9s",
  authDomain: "reactp-4544a.firebaseapp.com",
  databaseURL: "https://reactp-4544a-default-rtdb.firebaseio.com",
  projectId: "reactp-4544a",
  storageBucket: "reactp-4544a.appspot.com",
  messagingSenderId: "575732711865",
  appId: "1:575732711865:web:ff33a5523b3d3e0e873668",
  measurementId: "G-3M8HWXVE3N"
};

firebase.initializeApp(firebaseConfig);

export default firebase;