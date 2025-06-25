import { Navigate, createBrowserRouter } from "react-router-dom";
import jsonParse from "./utils/jsonParse";
import secureLocalStorage from "react-secure-storage";
import type { ReactNode } from "react";
import type { UserType } from "./types/global/user";
import AdminLayout from "./layouts/admin/AdminLayout";
import WebsiteLayout from "./layouts/website/WebsiteLayout";
import GlobalLayout from "./layouts/global/GlobalLayout";
import TestHome from "./pages/website/TestHome/TestHome";
import TemplateLayout from "./layouts/template/TemplateLayout";
import PageContainer from "./components/global/pageContainer/PageContainer";
import TemplateLogic from "./pages/template/template/TemplateLogic";
import LoginLogic from "@/pages/global/login/LoginLogic";
import InputLogic from "./pages/website/Input/InputLogic";


interface PrivateRouteProps {
  element: ReactNode;
  role: UserType;
}

// Prevent user from accessing other user type pages
const PrivateRoute = ({ element, role }: PrivateRouteProps) => {
  const isThereToken = secureLocalStorage.getItem("ACCESS_TOKEN");
  const userType = jsonParse(secureLocalStorage.getItem("USER"))?.data
    ?.userType as UserType;

  if (
    (isThereToken && userType === role) ||
    role == "allow" ||
    (!isThereToken && role === undefined)
  ) {
    return element;
  }

  if (!isThereToken) {
    return <Navigate to="/login" />;
  }

  switch (userType) {
    case "admin":
      return <Navigate to="/admin" />;
    case "free":
      return <Navigate to="/" />;
    default:
      return <Navigate to="/login" />;
  }
};

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
  // global website pages
  {
    path: "/",
    element: <PrivateRoute element={<WebsiteLayout />} role={"allow"} />,
    children: [
      {
        index: true,
        element: <TestHome />,
      }
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
  // templage
  {
    path: "/template",
    element: <PrivateRoute element={<TemplateLayout />} role={"allow"} />,
    children: [
      {
        path: "",
        element: <PageContainer>home</PageContainer>,
      },
      {
        path: "main/*",
        element: <TemplateLogic />,
      },
      {
        path: "*",
        element: <>404</>,
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
