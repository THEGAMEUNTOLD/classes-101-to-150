import { createBrowserRouter } from "react-router-dom";
import Login from "../Auth/Pages/Login";
import Register from "../Auth/Pages/Register";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
]);