import React, { useEffect, useState } from "react";

export const ThemeContext = React.createContext({
  theme: "light",
  toggleTheme: () => {},
});

  // export const [theme, setTheme] = useState(() => {
  //   const storedTheme = window.localStorage.getItem("theme");
  //   return storedTheme !== null ? storedTheme : "light";
  // });

  // useEffect(() => {
  //   window.localStorage.setItem("theme", theme);
  // }, [theme]);

  // export const toggleTheme = () => {
  //   setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  // };