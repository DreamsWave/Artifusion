import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "@/routes/welcome";
import DashboardPage from "@/routes/dashboard";
import ErrorPage from "@/routes/error-page";
import Layout from "./layout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);

export default router;
