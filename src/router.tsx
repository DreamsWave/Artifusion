import Layout from "@/layout";
import DashboardPage from "@/routes/dashboard";
import ErrorPage from "@/routes/error-page";
import WelcomePage from "@/routes/welcome";
import { createBrowserRouter } from "react-router-dom";

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
