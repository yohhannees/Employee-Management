import { createContext } from "react";

interface AuthContextValue {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});
