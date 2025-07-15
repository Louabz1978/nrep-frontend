import type { UserType } from "@/types/global/user";
import type { ReactNode } from "react";
import secureLocalStorage from "react-secure-storage";
import jsonParse from "./jsonParse";
import { Navigate } from "react-router-dom";
import NotFound from "@/components/global/notFound/NotFound";

interface PrivateRouteProps {
  element: ReactNode;
  role: UserType;
}

// Prevent user from accessing other user type pages
const PrivateRoute = ({ element, role }: PrivateRouteProps) => {
  const isThereToken = secureLocalStorage.getItem("ACCESS_TOKEN");
  const userType = (
    jsonParse(secureLocalStorage.getItem("USER") as string) as {
      [key: string]: unknown;
    }
  )?.token_type as UserType;

  // allow all users to enter this page
  if (role == "allow") return element;

  // user logged in and his role fit with required role
  if (isThereToken && userType === role) return element;

  // if user logged in but try to login again, route him to his index page
  if (role === "mustUnauth" && isThereToken) {
    switch (userType) {
      case "admin":
        return <Navigate to="/admin" />;
      default:
        return <Navigate to="/" />;
    }
  }

  // user logged in but navigate to another role page
  if (isThereToken && userType !== role) return <NotFound />;

  // user is not logged in try to navigate to a page that require login
  if (!isThereToken && role && role !== "mustUnauth") {
    return <Navigate to="/login" />;
  }

  // otherwise
  return element;
};

export default PrivateRoute;
