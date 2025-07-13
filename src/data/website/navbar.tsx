import type { PermissionsType } from "@/stores/useUser";
import type { IconType } from "react-icons/lib";
import { MdSettingsInputComponent } from "react-icons/md";
import { TbListSearch } from "react-icons/tb";

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
    icon: MdSettingsInputComponent,
  },
  {
    label: "قائمتي",
    permission: ["Add Item"],
    icon: TbListSearch,
    submenu: [
      {
        label: "subTabA",
        permission: [],
        submenu: [
          {
            label: "subtab1",
            to: "one",
            permission: [],
          },
          {
            label: "subtab2",
            to: "two",
            permission: [],
          },
          {
            label: "subtab3",
            to: "three",
            permission: [],
          },
        ],
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
