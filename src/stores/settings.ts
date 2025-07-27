// settingsAtom.js
import { atom } from "jotai";
import secureLocalStorage from "react-secure-storage";
import jsonParse from "@/utils/jsonParse";

// Default website settings
const DEFAULT_SETTINGS = {
  theme: "light",
  layout: "horizontal",
  dynamicHeader: false,
  buttonsStyle: "static",
  dataStyle: "table",
  invoicesStyle: "table",
  navBrowser: true,
  textSize: 1,
};

// Helper function to get initial settings from localStorage
const getInitialSettings = () => {
  const storedSettings = secureLocalStorage.getItem("SETTINGS");
  return storedSettings
    ? jsonParse(storedSettings as string)
    : DEFAULT_SETTINGS;
};

// Create Jotai atoms
const settingsAtom = atom(getInitialSettings());

// Derived atom for textSize
export const textSizeAtom = atom(
  (get) => get(settingsAtom).textSize,
  (get, set, newTextSize) => {
    const currentSettings = get(settingsAtom);
    const updatedSettings = { ...currentSettings, textSize: newTextSize };
    secureLocalStorage.setItem("SETTINGS", updatedSettings);
    set(settingsAtom, updatedSettings);
  }
);
