import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import SecondSubmenu from "./SecondSubMenu";
import type { UserTabType } from "@/data/endUser/navBar";

/**
 * Props interface for FirstMenu component
 */
type Props = {
  isOpen: boolean; // Whether the submenu is visible
  items: UserTabType[]; // Array of submenu items
  activeSubMenu: string | null; // Currently active submenu label
  activeSubTab: string | null; // Currently active sub-submenu item label
  setActiveSubMenu: (label: string | null) => void; // Function to set active submenu
  setActiveSubTab: (label: string | null) => void; // Function to set active sub-submenu
};

function FirstMenu({
  isOpen,
  items,
  activeSubMenu,
  activeSubTab,
  setActiveSubMenu,
  setActiveSubTab,
}: Props) {
  return (
    <div
      className={`absolute top-13 mt-2 w-100 text-right right-41 rounded-lg z-20 border-b border-border transition-all cursor-pointer duration-300 ease-in-out ${
        isOpen ? "block" : "hidden"
      }`}
    >
      {/* Map through each submenu item */}
      {items.map((item, idx) => (
        <div key={idx}>
          {/* Check if item has nested submenu */}
          {item.submenu ? (
            <>
              {/* Button for item with nested submenu */}
              <button
                onClick={() =>
                  setActiveSubMenu(
                    activeSubMenu === item.label ? null : item.label
                  )
                }
                className={`group w-full text-right px-4 py-2 bg-quaternary-bg cursor-pointer border-b border-border flex flex-col items-end focus:outline-none ${
                  activeSubMenu === item.label
                    ? "text-primary"
                    : "text-inverse-fg"
                } hover:text-secondary`}
              >
                {/* Button content with label and dropdown arrow */}
                <div className="flex justify-between items-center gap-2">
                  <span>{item.label}</span>
                  <MdKeyboardArrowDown
                    className={`w-8 h-8 transition-transform duration-200 ${
                      activeSubMenu === item.label ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Render nested submenu (SecondSubmenu component) */}
              <SecondSubmenu
                isOpen={activeSubMenu === item.label}
                items={item.submenu}
                activeSubTab={activeSubTab}
                setActiveSubTab={setActiveSubTab}
                offsetTop={idx * 50}
              />
            </>
          ) : (
            /* Direct link for simple menu item */
            <Link
              to={item.to ?? ""}
              onClick={() => setActiveSubTab(item.label)}
              className={`group w-full text-right px-4 py-2 focus:outline-none ${
                activeSubTab === item.label ? "text-primary" : "text-inverse-fg"
              } hover:text-secondary`}
            >
              <span>{item.label}</span>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

export default FirstMenu;
