import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.tsx";
import HomePage from "./components/HomePage.tsx";
import ListPageLayout from "./components/ListPageLayout.tsx";
import { MantineProvider } from "@mantine/core";
import { ThemeContext } from "./theme/ThemeContext.tsx";
import Authentication from "./components/Authentication.tsx";
import { AuthenticationForm } from "./components/AuthenticationForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,      
  },
  {
    path: "/list",
    element: <ListPageLayout />,
  },
]);

const Main = () => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = window.localStorage.getItem("theme");
    return storedTheme !== null ? storedTheme : "light";
  });

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <MantineProvider
          theme={{ colorScheme: theme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <RouterProvider router={router} />
        </MantineProvider>
      </ThemeContext.Provider>
      {/* <Authentication/> */}
      {/* <AuthenticationForm/> */}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
