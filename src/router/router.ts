
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage.tsx";
import ListPageLayout from "./components/ListPageLayout.tsx";
import PositionPageLayout from "./components/PositionPageLayout.tsx";
import ErrorPage from "./components/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/list",
    element: <ListPageLayout />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Position",
    element: <PositionPageLayout />,
    errorElement: <ErrorPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}