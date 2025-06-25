import type { PermissionsType } from "@/stores/useUser";

type TabsType = {
  label: string;
  to?: string;
  permission: PermissionsType;
  submenu?: TabsType;
}[];

export const tabs: TabsType = [
  {
    label: "إدخال",
    to: "/input",
    permission: ["Add Item"],
  },
  {
    label: "قائمتي",
    permission: ["Add Item"],
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
