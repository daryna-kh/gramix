import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/auth/AuthContext";
import { ScreenLoader } from "../components/ScreenLoader";
// import { AuthContext } from "../context/auth/AuthProvider";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const auth = useContext(AuthContext);
  if (!auth) return <ScreenLoader />;
  if (auth.isAuth === null || auth.isAuth === false)
    return <Navigate to="/login" replace />;
  return children;
};
