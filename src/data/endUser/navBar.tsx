import type { PermissionsType } from "@/stores/useUser";
import type { IconType } from "react-icons/lib";

export type UserTabType = {
  label: string;
  to?: string;
  permission: PermissionsType;
  submenu?: UserTabsType;
  icon?: IconType;
};
type UserTabsType = UserTabType[];

export const userTabs: UserTabsType = [
  {
    label: "عقارات مُرسلة من قِبل الوكيل",
    to: "/end-user/shared-properties",
    permission: [],
  },
  {
    label: "العقارات المفضلة",
    to: "/end-user/favorite-properties",
    permission: [],
  },
];
