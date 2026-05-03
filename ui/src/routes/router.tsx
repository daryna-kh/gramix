import { createBrowserRouter, Navigate } from "react-router";
import { ChatList } from "../pages/ChatList";
import { ErrorPage } from "../pages/ErrorPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/list" replace />,
  },
  {
    path: "/login",
    errorElement: <ErrorPage />,
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: "/list",
    element: (
      <ProtectedRoute>
        <ChatList />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/list" replace />,
  },
]);
