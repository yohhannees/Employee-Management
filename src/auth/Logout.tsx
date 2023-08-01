import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import firebase from "../firebase/firebase";
import { Button } from "@mantine/core";

export const Logout: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;