import { createBrowserRouter } from "react-router-dom";
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
import ContractsList from "./pages/website/contracts/addContract/ContractsList";
import EditContract from "./pages/website/contracts/EditContract";
import Home from "./pages/website/home/Home";
import ListingDetailsIndex from "./pages/website/listingDetails/ListingDetailsIndex";
import MyListings from "./pages/website/myListings/MyListing";
import OtherUserHome from "./pages/global/OtherUserHome";
import AddContactFormIndex from "./pages/website/ContactForm/AddContactFormIndex";
import ContactTable from "./pages/website/contactTable/ContactTable";
import EditContactFormIndex from "./pages/website/ContactForm/EditContactFormIndex";
import ContractSignatureIndex from "./pages/website/contracts/contractSignature/ContractSignatureIndex";
import TopAgent from "./pages/website/reports/topAgent/TopAgent";

// Browser URL router container
const router = createBrowserRouter([
  // realtor pages
  {
    path: "/",
    element: <PrivateRoute element={<WebsiteLayout />} role={"realtor"} />,
    children: [
      {
        index: true,
        element: <Home />,
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
        path: "listing/my-listings",
        element: <MyListings />,
      },
      {
        path: "listing/details/:id",
        element: <ListingDetailsIndex />,
      },
      {
        path: "listing/add",
        element: <AddListingIndex />,
      },
      {
        path: "listing/edit/:id",
        element: <EditListingIndex />,
      },
      {
        path: "contracts/add",
        element: <ContractsList />,
        handle: { whiteBg: true },
      },
      {
        path: "contracts/edit",
        element: <EditContract />,
        handle: { whiteBg: true },
      },
      {
        path: "contracts/sign/:mls/:user_id",
        element: <ContractSignatureIndex />,
        handle: { whiteBg: true },
      },
      {
        path: "contact",
        element: <ContactTable />,
      },
      {
        path: "contact/add",
        element: <AddContactFormIndex />,
      },
      {
        path: "contact/edit/:id",
        element: <EditContactFormIndex />,
      },
      {
        path: "reports/top-agent",
        element: <TopAgent />,
      },

    ],
  },
  // admin pages
  {
    path: "/admin",
    element: <PrivateRoute element={<AdminLayout />} role={"admin"} />,
    children: [
      {
        index: true,
        element: <OtherUserHome type="admin" />,
      },
      {
        path: "*",
        element: <>404</>,
      },
    ],
  },
  // broker pages
  {
    path: "/broker",
    element: <PrivateRoute element={<AdminLayout />} role={"broker"} />,
    children: [
      {
        index: true,
        element: <OtherUserHome type="broker" />,
      },
      {
        path: "*",
        element: <>404</>,
      },
    ],
  },
  // seller pages
  {
    path: "/seller",
    element: <PrivateRoute element={<AdminLayout />} role={"seller"} />,
    children: [
      {
        index: true,
        element: <OtherUserHome type="seller" />,
      },
      {
        path: "*",
        element: <>404</>,
      },
    ],
  },
  // buyer pages
  {
    path: "/buyer",
    element: <PrivateRoute element={<AdminLayout />} role={"buyer"} />,
    children: [
      {
        index: true,
        element: <OtherUserHome type="buyer" />,
      },
      {
        path: "*",
        element: <>404</>,
      },
    ],
  },
  // tenant pages
  {
    path: "/tenant",
    element: <PrivateRoute element={<AdminLayout />} role={"tenant"} />,
    children: [
      {
        index: true,
        element: <OtherUserHome type="tenant" />,
      },
      {
        path: "*",
        element: <>404</>,
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
