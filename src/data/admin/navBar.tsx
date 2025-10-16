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
  {
    label: "الأساسيات",
    permission: [],
    submenu: [
      {
        label: "سماسرة",
        permission: [],
        to: "/admin/brokers",
      },
      {
        label: "وكلاء العقارات",
        permission: [],
        to: "/admin/realtors",
      },
      {
        label: "الشركات العقارية",
        permission: [],
        to: "/admin/agencies",
      },
    ],
  },
  {
    label:"التقارير",
    permission: [],
    submenu: [
      {
        label: "أفضل عشر وكالات",
        permission: [],
        to: "/admin/reports/top-agencies",
      },
      {
        label: "سجل حركة الوسطاء",
        permission: [],
        to: "/admin/reports/broker-history",
      },
    ],
  }
];
