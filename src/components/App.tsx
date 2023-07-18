import React from "react";
import { Provider } from "react-redux";
import  initializeApp  from "firebase/app";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import  getAuth from "firebase/auth";
import store from "../store/store";
import {firebaseConfig} from "../firebaseConfig"
import LoginRegister from "./LoginRegister";

initializeApp(firebaseConfig);

const auth = getAuth();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <FirebaseAuthProvider firebase={auth}>
        <LoginRegister isLogin={true} />
      </FirebaseAuthProvider>
    </Provider>
  );
};

export default App;
