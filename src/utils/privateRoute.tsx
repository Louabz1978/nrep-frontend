import type { UserType } from "@/types/global/user";
import type { ReactNode } from "react";
import secureLocalStorage from "react-secure-storage";
import jsonParse from "./jsonParse";
import { Navigate, useLocation } from "react-router-dom";
import NotFound from "@/components/global/notFound/NotFound";
// import NotFound from "@/components/global/notFound/NotFound";

interface PrivateRouteProps {
  element: ReactNode;
  role: UserType;
}

const hasPermission = (userRole: UserType[], requiredRole: UserType) => {
  return userRole?.includes(requiredRole);
};

// Prevent user from accessing other user type pages
const PrivateRoute = ({ element, role }: PrivateRouteProps) => {
  return element
  const location = useLocation();
  const currentPath = location.pathname;

  const isThereToken = secureLocalStorage.getItem("ACCESS_TOKEN");
  const user = jsonParse(secureLocalStorage.getItem("USER") as string) as {
    [key: string]: unknown;
  };
  const userType = (user?.roles ?? user?.data?.roles) as UserType[];
  const userRoles = userType as unknown as UserType[];

  // allow all users to enter this page
  if (role == "allow") return element;

  console.log({ role, userRoles, isThereToken });

  // user logged in and his role fit with required role
  if (isThereToken && hasPermission(userRoles, role)) return element;

  // user is not logged in try to navigate to a page that require login
  if (!isThereToken && role && role !== "mustUnauth") {
    return <Navigate to="/login" />;
  }

  // if user logged in but try to login again, route him to his index page
  if (
    (role === "" && isThereToken) ||
    currentPath == "" ||
    currentPath == "/"
  ) {
    switch (userRoles?.[0]) {
      case "admin":
        return <Navigate to="/admin" />;
      case "realtor":
        return <Navigate to="/" />;
      case "broker":
        return <Navigate to="/broker" />;
      case "tenant":
        return <Navigate to="/tenant" />;
      case "buyer":
        return <Navigate to="/buyer" />;
      case "seller":
        return <Navigate to="/seller" />;
      default:
        return <Navigate to="/" />;
    }
  }

  // user logged in but navigate to another role page
  if (isThereToken && !userRoles?.includes(role)) return <NotFound />;

  // otherwise
  return element;
};

export default PrivateRoute;
