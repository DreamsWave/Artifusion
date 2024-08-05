import Layout from "@/layout";
import AboutPage from "@/routes/about";
import DashboardPage from "@/routes/dashboard";
import ErrorPage from "@/routes/error-page";
import WelcomePage from "@/routes/welcome";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <WelcomePage />,
      },
      {
        Component: Layout,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "about",
            element: <AboutPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
