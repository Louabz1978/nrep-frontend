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
    label: "قائمتي",
    permission: ["Add Item"],
    icon: FaList,
    submenu: [
      {
        label: "subTabA",
        permission: [],
        to: "one",
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
      {
        label: "subTabC",
        permission: [],
        submenu: [
          {
            label: "subtab7",
            to: "seven",
            permission: [],
          },
          {
            label: "subtab8",
            to: "eight",
            permission: [],
          },
          {
            label: "subtab9",
            to: "nine",
            permission: [],
          },
        ],
      },
    ],
  },
];
