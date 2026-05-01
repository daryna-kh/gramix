import { createBrowserRouter, Navigate } from "react-router";
import { ScreenLoader } from "../components/ScreenLoader";
import { ChatList } from "../pages/ChatList";
import { ErrorPage } from "../pages/ErrorPage";
import { RegisterPage } from "../pages/RegisterPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { isAuthenticated } from "./tools";

export const router = createBrowserRouter([
  {
    path: "/",
    element: isAuthenticated ? <ChatList /> : <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    errorElement: <ErrorPage />,
    lazy: () =>
      import("../pages/LoginPage").then((m) => ({ Component: m.LoginPage })),
    hydrateFallbackElement: <ScreenLoader />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
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
    element: <Navigate to="/login" replace />,
  },
]);
