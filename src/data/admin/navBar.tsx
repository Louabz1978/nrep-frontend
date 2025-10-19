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
        label: "مدن",
        permission: [],
        to: "/admin/cities",
      },
      {
        label: "أحياء",
        permission: [],
        to: "/admin/neighborhoods",
      },
      
    ],
  },
  {
    label: "الشركات",
    permission: [],
    submenu: [
      // {
      //   label: "الشركات العقارية",
      //   permission: [],
      //   to: "/admin/agencies",
      // },
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
    ],
  }
];
