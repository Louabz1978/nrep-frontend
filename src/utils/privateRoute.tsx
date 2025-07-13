import type { UserType } from "@/types/global/user";
import type { ReactNode } from "react";
import secureLocalStorage from "react-secure-storage";
import jsonParse from "./jsonParse";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: ReactNode;
  role: UserType;
}

// Prevent user from accessing other user type pages
const PrivateRoute = ({ element, role }: PrivateRouteProps) => {
  const isThereToken = secureLocalStorage.getItem("ACCESS_TOKEN");
  const userType = (
    jsonParse(secureLocalStorage.getItem("USER") as string)?.data as {
      [key: string]: unknown;
    }
  )?.token_type as UserType;

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

export default PrivateRoute;
