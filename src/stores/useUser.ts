import { atom, useAtom } from "jotai";
import secureLocalStorage from "react-secure-storage";
import jsonParse from "@/utils/jsonParse";
import WEBSITE_PERMISSIONS from "@/data/website/permissions";
import ADMIN_PERMISSIONS from "@/data/admin/permissoins";
import type { User } from "@/types/global/user";

// Atom for user data
const userAtom = atom<User | null>(
  jsonParse(secureLocalStorage.getItem("USER"))
);

// Derived atom for permissions check
const checkPermissionsAtom = atom(
  (get) =>
    (
      requiredPermissions: (
        | keyof typeof WEBSITE_PERMISSIONS
        | keyof typeof ADMIN_PERMISSIONS
      )[] = []
    ): boolean => {
      const user = get(userAtom);
      const permissionsList = { ...WEBSITE_PERMISSIONS, ...ADMIN_PERMISSIONS };
      let permissionStatus = false;

      requiredPermissions.forEach((permission) => {
        permissionStatus =
          permissionStatus ||
          (user?.permissions?.includes(permissionsList[permission]) ?? false);
      });

      // return permissionStatus;
      return true;
    }
);

// Hook to use the user context
export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);
  const checkPermissions = useAtom(checkPermissionsAtom)[0];

  return {
    user,
    setUser,
    checkPermissions,
  };
};
