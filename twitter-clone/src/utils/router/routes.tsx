import { Navigate, RouteObject } from "react-router-dom";
import Home from "../../views/Home";
import Login from "../../views/Login";
import SignUp from "../../views/SignUp";
import NotFound from "../../views/NotFound";

export const routes = (isAuthenticated: boolean): RouteObject[] => [
  {
    path: "/",
    element: isAuthenticated ? <Home /> : <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
