import { AuthAction } from "./types";
import { auth } from "../firebase/firebase";

export const login = (email: string, password: string) => {
  return (dispatch: (action: AuthAction) => void) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => dispatch({ type: "LOGIN" }))
      .catch((error) => console.log(error));
  };
};

export const register = (email: string, password: string) => {
  return (dispatch: (action: AuthAction) => void) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => dispatch({ type: "REGISTER" }))
      .catch((error) => console.log(error));
  };
};