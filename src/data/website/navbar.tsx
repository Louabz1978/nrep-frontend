import type { PermissionsType } from "@/stores/useUser";
import type { IconType } from "react-icons/lib";

export type TabType = {
  label: string;
  to?: string;
  permission: PermissionsType;
  submenu?: TabsType;
  icon?: IconType;
};
type TabsType = TabType[];

export const tabs: TabsType = [
  {
    label: "الرئيسية",
    to: "/",
    permission: [],
  },
  {
    label: "قائمة الاسماء",
    permission: [],
    submenu: [
      {
        label: "جهات الاتصال",
        permission: [],
        to: "/contact",
      },
      {
        label: "إدخال",
        permission: [],
        to: "/contact/add",
      },
    ],
  },
  {
    label: "إدخال",
    to: "/input",
    permission: [],
  },
  {
    label: "العقارات",
    permission: [],
    submenu: [
      {
        label: "كل العقارات",
        permission: [],
        to: "/listing/all-listings",
      },
      {
        label: "عقاراتي",
        permission: [],
        to: "/listing/my-listings",
      },
    ],
  },
  {
    label: "العقود",
    permission: [],
    submenu: [
      {
        label: "كتابة عقد",
        permission: [],
        to: "/contracts/add",
      },
      {
        label: "تعديل عقد",
        permission: [],
        to: "/contracts/edit",
      },
    ],
  },
  {
    label: "التقارير",
    permission: [],
    submenu: [
      {
        label: "حركة السوق",
        permission: [],
        to: "/reports/market-movement",
      },
      {
        label: "أفضل الوكلاء",
        permission: [],
        to: "/reports/top-agent",
      },
    ],
  },
];
