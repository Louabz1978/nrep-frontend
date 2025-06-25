export const tabs = [
  {
    label: "إدخال",
    to: "/input",
    permission: "Add Item",
  },
  {
    label: "قائمتي",
    permission: "Add Item",
    hasMenu: true,
    submenu: [
      {
        label: "subTabA",
        nested: ["subTab1", "subTab2", "subTab3"],
      },
      {
        label: "subTaB",
        nested: ["subTab4", "subTab5", "subTab6"],
      },
      {
        label: "subTabC",
        nested: ["subTab7", "subTab8", "subTab9"],
      },
    ],
  },
];
