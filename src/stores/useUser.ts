import { atom, useAtom } from "jotai";
import secureLocalStorage from "react-secure-storage";
import WEBSITE_PERMISSIONS from "@/data/website/permissions";
import ADMIN_PERMISSIONS from "@/data/admin/permissoins";
import type { User } from "@/types/global/user";
import jsonParse from "@/utils/jsonParse";

const userAtom = atom<User | null>(
  // Initial value from localStorage
  jsonParse(secureLocalStorage.getItem("USER") as string) as User | null
);

// Create a derived atom with write capability
const userWithPersistenceAtom = atom(
  (get) => get(userAtom),
  (_get, set, update: User | null) => {
    // Update the atom
    set(userAtom, update);

    // Persist to secureLocalStorage
    if (update) {
      secureLocalStorage.setItem("USER", JSON.stringify(update));
    } else {
      secureLocalStorage.removeItem("USER");
    }
  }
);

// permissions type
export type PermissionsType = (
  | keyof typeof WEBSITE_PERMISSIONS
  | keyof typeof ADMIN_PERMISSIONS
)[];

// Derived atom for permissions check
const checkPermissionsAtom = atom(
  (get) =>
    (requiredPermissions: PermissionsType = []): boolean => {
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
  const [user, setUser] = useAtom(userWithPersistenceAtom);
  const checkPermissions = useAtom(checkPermissionsAtom)[0];

  return {
    user,
    setUser,
    checkPermissions,
  };
};
