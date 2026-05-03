import { useContext, type ReactNode } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import { ScreenLoader } from "../components/ScreenLoader";
import { Navigate } from "react-router";

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const auth = useContext(AuthContext);
  if (!auth) return <ScreenLoader />;
  if (auth.isAuth === null) return <ScreenLoader />;
  if (auth.isAuth === true) return <Navigate to="/list" replace />;
  return children;
};
