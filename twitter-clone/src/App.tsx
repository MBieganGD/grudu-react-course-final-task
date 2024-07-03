import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router/routes";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
