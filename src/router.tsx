import { createBrowserRouter, Link } from "react-router-dom";
import AdminLayout from "./layouts/admin/AdminLayout";
import WebsiteLayout from "./layouts/website/WebsiteLayout";
import GlobalLayout from "./layouts/global/GlobalLayout";
import TemplateLayout from "./layouts/template/TemplateLayout";
import PageContainer from "./components/global/pageContainer/PageContainer";
import TemplateLogic from "./pages/template/template/TemplateLogic";
import LoginLogic from "@/pages/global/login/LoginLogic";
import InputLogic from "./pages/website/Input/InputLogic";
import ListingLogic from "./pages/website/listing/ListingLogic";
import PrivateRoute from "./utils/privateRoute";
import { ColorPaletteEditor } from "./components/global/form/colorInput/ColorPaletteEditor";
import TestTable from "./pages/website/testTable/TestTable";

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
        element: (
          <Link to={"/template/main"}>Click here to see the template</Link>
        ),
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
        path: "listing/*",
        element: <ListingLogic />,
      },
      {
        path: "color",
        element: <ColorPaletteEditor />,
      },
      {
        path: "one",
        element: <>one</>,
      },
      {
        path: "two",
        element: <>two</>,
      },
      {
        path: "three",
        element: <>three</>,
      },
      {
        path: "four",
        element: <>four</>,
      },
      {
        path: "five",
        element: <>five</>,
      },
      {
        path: "six",
        element: <>six</>,
      },
      {
        path: "seven",
        element: <>seven</>,
      },
      {
        path: "eight",
        element: <>eight</>,
      },
      {
        path: "nine",
        element: <>nine</>,
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
  // template
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
