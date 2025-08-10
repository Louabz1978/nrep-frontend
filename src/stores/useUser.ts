import { atom, useAtom } from "jotai";
import secureLocalStorage from "react-secure-storage";
import type { User, UserType } from "@/types/global/user";
import jsonParse from "@/utils/jsonParse";

const userAtom = atom<User | null>(
  // Initial value from localStorage
  jsonParse(
    secureLocalStorage.getItem("USER") as unknown as string
  ) as unknown as User | null
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
export type PermissionsType = UserType[];

export const USER_TYPES = [
  "mustUnauth",
  "admin",
  "broker",
  "tenant",
  "realtor",
  "buyer",
  "seller",
  "free",
  "allow",
] as const;

export const HOME_PAGE: Record<UserType, string> = {
  admin: "/admin",
  broker: "/broker",
  tenant: "/tenant",
  realtor: "/",
  buyer: "/buyer",
  seller: "/seller",
  mustUnauth: "/login",
  free: "/",
  allow: "/",
  "": "",
} as const;

// Derived atom for permissions check
const checkPermissionsAtom = atom(
  (get) =>
    (requiredPermissions: PermissionsType = []): boolean => {
      const user = get(userAtom);
      let permissionStatus = false;

      requiredPermissions.forEach((permission) => {
        permissionStatus =
          permissionStatus || (user?.roles?.includes(permission) ?? false);
      });

      // return permissionStatus;
      return true;
    }
);

// Has permissions
const hasPermissionsAtom = atom(
  (get) =>
    (requiredPermissions: PermissionsType = []): boolean => {
      const user = get(userAtom);
      let permissionStatus = false;

      requiredPermissions.forEach((permission) => {
        permissionStatus =
          permissionStatus || (user?.roles?.includes(permission) ?? false);
      });

      return permissionStatus;
      // return true;
    }
);

// Hook to use the user context
export const useUser = () => {
  const [user, setUser] = useAtom(userWithPersistenceAtom);
  const checkPermissions = useAtom(checkPermissionsAtom)[0];
  const hasPermissions = useAtom(hasPermissionsAtom)[0];

  return {
    user,
    setUser,
    checkPermissions,
    hasPermissions,
  };
};
