import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";
import { Button } from "@mantine/core";

interface Props {
  children: React.ReactNode;
}

function Auth({ children }: Props) {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

   function handleLogin() {
    // perform login logic
    setIsAuthenticated(true);
  }

   function handleLogout() {
    // perform logout logic
    setIsAuthenticated(false);
  }

  return (
    <div>
      {isAuthenticated ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Navigate to="/" />
      )}
      {children}
    </div>
  );
}

export default Auth;
