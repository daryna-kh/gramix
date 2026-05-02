import { RouterProvider } from "react-router/dom";
import "./App.css";
import { AuthProvider } from "./context/auth/AuthProvider";
import { router } from "./routes/router";

export const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
