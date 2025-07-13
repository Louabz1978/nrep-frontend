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
            to: "",
            permission: [],
          },
          {
            label: "subtab2",
            to: "",
            permission: [],
          },
          {
            label: "subtab3",
            to: "",
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
            to: "",
            permission: [],
          },
          {
            label: "subtab5",
            to: "",
            permission: [],
          },
          {
            label: "subtab6",
            to: "",
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
            to: "",
            permission: [],
          },
          {
            label: "subtab8",
            to: "",
            permission: [],
          },
          {
            label: "subtab9",
            to: "",
            permission: [],
          },
        ],
      },
    ],
  },
];
