import type { ReactNode } from "react";
import { isAuthenticated } from "./tools";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};
