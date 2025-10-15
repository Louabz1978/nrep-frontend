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
import MarketMovement from "./pages/website/reports/marketMovement/MarketMovement";
import RentalTransfer from "@/pages/website/RentalTransfer";
import SaleTransfer from "@/pages/website/SaleTransfer";
import EditContractSign from "./pages/website/contracts/EditContractSign";
import ListingMovementHistory from "./pages/website/reports/listingMovementHistory/ListingMovementHistory";
import AgentMovement from "./pages/website/reports/agentMovement/AgentMovements";
import ResetOtp from "./pages/global/resetOtp/ResetOtp";
import VerifyPassword from "./pages/global/resetOtp/VerifyPassword";
import AdminHome from "./pages/admin/home/AdminHome";
import AgenciesList from "./pages/admin/agencies/AgenciesList";
import CreateAgency from "./pages/admin/agencies/CreateAgency";
import AgencyDetails from "./pages/admin/agencies/AgencyDetails";
import BrokerTable from "@/components/admin/broker/BrokerTable";
import RealtorTable from "@/components/admin/realtor/RealtorTable";
import TopAgencies from "./pages/admin/reports/TopAgencies";
import BrokerHistory from "./pages/admin/reports/BrokerHistory";

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
        handle: {
          noPadding: true,
          whitebg: true,
        },
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
        path: "listing/listing-movement",
        element: <ListingMovementHistory />,
      },
      {
        path: "listing/details/:id",
        element: <ListingDetailsIndex />,
        handle: { whiteBg: true },
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
        path: "contracts/edit/sign/:id",
        element: <EditContractSign />,
        handle: { whiteBg: true },
      },
      {
        path: "contracts/sign/:mls",
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
      {
        path: "reports/agent-movement",
        element: <AgentMovement />,
      },
      {
        path: "reports/market-movement",
        element: <MarketMovement />,
      },
      {
        path: "transfers/rental",
        element: <RentalTransfer />,
      },
      {
        path: "transfers/sale",
        element: <SaleTransfer />,
      },
    ],
  },
  // admin pages
  {
    path: "/admin/",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "listing/all-listings",
        element: <AllListings />,
      },
      {
        path: "listing/edit/:id",
        element: <EditListingIndex />,
      },
      {
        path: "listing/details/:id",
        element: <ListingDetailsIndex />,
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
        path: "agencies",
        element: <AgenciesList />,
      },
      {
        path: "agencies/create",
        element: <CreateAgency />,
      },
      {
        path: "agencies/:id",
        element: <AgencyDetails />,
      },
      {
        path: "brokers",
        element: <BrokerTable />,
      },
      {
        path: "realtors",
        element: <RealtorTable />,
      },
      {
        path: "reports/top-agencies",
        element: <TopAgencies />,
      },
      {
        path: "reports/broker-history",
        element: <BrokerHistory />,
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
      {
        path: "reset-otp",
        element: <ResetOtp />,
      },
      {
        path: "verify-password",
        element: <VerifyPassword />,
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
