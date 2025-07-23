import type { PermissionsType } from "@/stores/useUser";
import type { IconType } from "react-icons/lib";
import { BsBuildingFillAdd } from "react-icons/bs";
import { FaList } from "react-icons/fa6";

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
    label: "إدخال",
    to: "/input",
    permission: ["Add Item"],
    icon: BsBuildingFillAdd,
  },
  {
    label: "العقارات",
    permission: ["Add Item"],
    icon: FaList,
    submenu: [
      {
        label: "كل العقارات",
        permission: [],
        to: "/listing/all-listings",
      },
      {
        label: "subTabB",
        permission: [],
        submenu: [
          {
            label: "subtab4",
            to: "four",
            permission: [],
          },
          {
            label: "subtab5",
            to: "five",
            permission: [],
          },
          {
            label: "subtab6",
            to: "six",
            permission: [],
          },
        ],
      },
    ],
  },
];
