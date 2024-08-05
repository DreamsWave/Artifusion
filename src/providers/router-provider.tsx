import router from "@/router";
import { RouterProvider as RouterDomProvider } from "react-router-dom";

const RouterProvider = () => {
  return <RouterDomProvider router={router} />;
};

export default RouterProvider;
