import { createContext } from "react";

export const AuthContext = createContext<{
  isAuth: boolean | null;
  setIsAuth: (val: boolean) => void;
} | null>(null);
