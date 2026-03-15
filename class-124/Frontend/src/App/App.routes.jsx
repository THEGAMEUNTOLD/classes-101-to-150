import { createBrowserRouter } from "react-router-dom";
import Login from "../Features/Auth/Pages/Login";
import Register from "../Features/Auth/Pages/Register";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/",
    element: <h1 className="text-3xl font-bold text-center mt-20">Welcome to the App</h1>
  }

]);