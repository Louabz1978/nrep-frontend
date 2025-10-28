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
    label: "الأساسيات",
    permission: [],
    submenu: [
      {
        label: "الوسيط العقاري",
        permission: [],
        to: "/admin/realtors",
      },
      {
        label: "صاحب الشركة العقارية",
        permission: [],
        to: "/admin/brokers",
      },

      {
        label: "الشركات العقارية",
        permission: [],
        to: "/admin/agencies",
      },
      {
        label: "المحافظات",
        permission: [],
        to: "/admin/counties",
      },
    ],
  },
  {
    label: "التقارير",
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
      {
        label: "تقرير الوكالات",
        permission: [],
        to: "/admin/reports/agencies-history",
      },
      {
        label: "تقرير الوسطاء",
        permission: [],
        to: "/admin/reports/realtor-history",
      },
    ],
  },
];
