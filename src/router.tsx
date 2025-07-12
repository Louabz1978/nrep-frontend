import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/admin/AdminLayout";
import WebsiteLayout from "./layouts/website/WebsiteLayout";
import GlobalLayout from "./layouts/global/GlobalLayout";
import LoginLogic from "@/pages/global/login/LoginLogic";
import InputLogic from "./pages/website/Input/InputLogic";
import ListingLogic from "./pages/website/listing/ListingLogic";
import PrivateRoute from "./utils/privateRoute";

// Browser URL router container
const router = createBrowserRouter([
  // admin pages
  {
    path: "/admin",
    element: <PrivateRoute element={<AdminLayout />} role={"admin"} />,
    children: [
      {
        index: true,
        element: <>home</>,
      },
      {
        path: "*",
        element: <>404</>,
      },
    ],
  },
  // private website pages
  {
    path: "/",
    element: <PrivateRoute element={<WebsiteLayout />} role={"allow"} />,
    children: [
      {
        index: true,
        element: <>private route in website</>,
      },
      {
        path: "input",
        element: <InputLogic />,
      },
      {
        path: "listing/*",
        element: <ListingLogic />,
      },
    ],
  },
  // specific pages that require the user without token
  {
    path: "/",
    element: <PrivateRoute element={<GlobalLayout />} role={"allow"} />,
    children: [
      {
        path: "login",
        element: <LoginLogic />,
      },
    ],
  },
  // not found
  {
    path: "*",
    element: <>404</>,
  },
]);

export default router;
