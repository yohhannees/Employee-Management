import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import firebase from "../firebase/firebase";
import { Button } from "@mantine/core";
import Auth from "./auth";
import LoginRegister from "./LoginRegister";
import HomePage from "../components/HomePage";
import ListPageLayout from "../components/ListPageLayout";
import PositionPageLayout from "./PositionPag
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    element: (
      <Auth>
        <HomePage />
      </Auth>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/list",
    element: <ListPageLayout />,
    element: (
      <Auth>
        <ListPageLayout />
      </Auth>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/Position",
    element: <PositionPageLayout />,
    element: (
      <Auth>
        <PositionPageLayout />
      </Auth>
    ),
    errorElement: <ErrorPage />,
  },
]);

function App() {
  const dispatch = useDispatch();

  function handleLogout() {
    firebase.auth().signOut();
    dispatch(logout());
  }

  return (
    <BrowserRouter>
      <Auth>
        <Button onClick={handleLogout}>Logout</Button>
        <Route>{router}</Route>
      </Auth>
      <Route path="/login">
        <LoginRegister onSuccess={() => setIsAuthenticated(true)} />
      </Route>
    </BrowserRouter>
  );
}

export default App;
