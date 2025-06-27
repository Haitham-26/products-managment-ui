import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../../Layout";
import { Home } from "../home/Home";
import { Login } from "../register/login/Login";
import { SignUp } from "../register/signup/SignUp";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <div>Something went wrong</div>,
    children: [
      {
        path: "*",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default router;
