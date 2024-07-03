import { createBrowserRouter } from "react-router-dom";
import Home from "../../views/Home";
import Login from "../../views/Login";
import SignUp from "../../views/SignUp";
import NotFound from "../../views/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
]);
