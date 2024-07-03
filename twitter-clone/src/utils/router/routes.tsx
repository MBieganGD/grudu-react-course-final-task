import { createBrowserRouter } from "react-router-dom";
import Tweets from "../../views/Tweets";
import Login from "../../views/Login";
import SignUp from "../../views/SignUp";
import NotFound from "../../views/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Tweets />,
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
