import firebase from 'firebase/app';
import 'firebase/auth';

export const firebaseConfig = {
  // Your Firebase configuration goes here
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();