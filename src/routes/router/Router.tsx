import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../../Layout";
import { Home } from "../home/Home";

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
]);

export default router;
