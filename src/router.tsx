import { createBrowserRouter, Link } from "react-router-dom";
import AdminLayout from "./layouts/admin/AdminLayout";
import WebsiteLayout from "./layouts/website/WebsiteLayout";
import GlobalLayout from "./layouts/global/GlobalLayout";
import LoginLogic from "@/pages/global/login/LoginLogic";
import InputLogic from "./pages/website/Input/InputLogic";
import PrivateRoute from "./utils/privateRoute";
import TestTable from "./pages/website/testTable/TestTable";
import AddListingIndex from "./pages/website/listingForm/AddListingIndex";
import EditListingIndex from "./pages/website/listingForm/EditListingIndex";
import AllListings from "./pages/website/allListings.tsx/AllListings";

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
    element: <PrivateRoute element={<WebsiteLayout />} role={"bearer"} />,
    children: [
      {
        index: true,
        element: <Link to={"/test-table"}>Click here to see table</Link>,
      },
      {
        path: "test-table",
        element: <TestTable />,
      },
      {
        path: "input",
        element: <InputLogic />,
      },
      {
        path: "listing/all-listings",
        element: <AllListings />,
      },
      {
        path: "listing/add",
        element: <AddListingIndex />,
      },
      {
        path: "listing/edit/:id",
        element: <EditListingIndex />,
      },
    ],
  },
  // specific pages that require the user without token
  {
    path: "/",
    element: <PrivateRoute element={<GlobalLayout />} role={"mustUnauth"} />,
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
