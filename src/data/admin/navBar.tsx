import type { PermissionsType } from "@/stores/useUser";
import type { IconType } from "react-icons/lib";

export type AdminTabType = {
  label: string;
  to?: string;
  permission: PermissionsType;
  submenu?: AdminTabsType;
  icon?: IconType;
};
type AdminTabsType = AdminTabType[];

export const adminTabs: AdminTabsType = [
  {
    label: "الرئيسية",
    to: "/admin",
    permission: [],
  },
  {
    label: "قائمة الاسماء",
    permission: [],
    submenu: [
      {
        label: "جهات الاتصال",
        permission: [],
        to: "/admin/contact",
      },
      {
        label: "إدخال",
        permission: [],
        to: "/admin/contact/add",
      },
    ],
  },
  {
    label: "العقارات",
    permission: [],
    submenu: [
      {
        label: "كل العقارات",
        permission: [],
        to: "/admin/listing/all-listings",
      },
    ],
  },
];
