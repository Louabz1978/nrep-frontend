import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { useUser } from "@/stores/useUser";
import { TbListSearch } from "react-icons/tb";
import { MdKeyboardArrowDown, MdSettingsInputComponent } from "react-icons/md";
import { tabs } from "@/data/website/navbar"; // Your menu data source
import handleClickOutside from "@/utils/handleClickOutside"; // Utility to detect clicks outside menu

function Navbar() {
  // Get permission checker function from your user store
  const { checkPermissions } = useUser();

  // React Router hook to get current URL path
  const location = useLocation();

  // State to track if main dropdown menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  // State to track which submenu (level 1 dropdown) is open
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  // State to track which top-level tab is active (selected)
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // State to track which submenu tab (level 2) is active
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);

  // Reference to the whole menu container, for click outside detection
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Function to check if the current location matches the menu item or its subitems
  const isPathMatch = (item: any): boolean => {
    if (item.to === location.pathname) return true;
    // If the item has submenu, check recursively inside it
    if (item.submenu) return item.submenu.some(isPathMatch);
    return false;
  };

  // Check if the current tab or any of its children matches the path
  const isCurrentPath = (tab: any): boolean => isPathMatch(tab);

  // Decide the CSS class for the tab's text color depending on active/open state
  const getTabStyle = (tab: any) => {
    const isCurrent = isCurrentPath(tab); // true if this tab or its submenu is active path
    const isOpen = menuOpen && activeTab === tab.label; // true if menu dropdown is open and this tab is active
    return isCurrent || isOpen ? "text-primary" : "text-white";
  };

  // Toggle submenu open/close on click (for level 1 submenu)
  const handleSubMenuToggle = (label: string) => {
    // If clicking same submenu, close it, else open new one
    setActiveSubMenu(activeSubMenu === label ? null : label);
  };

  // Hook utility to close the menu if clicking outside of the menu container
  handleClickOutside(menuRef, () => {
    setMenuOpen(false);
    setActiveTab(null);
    setActiveSubMenu(null);
    setActiveSubTab(null);
  });

  // When URL changes, update activeTab, activeSubMenu, activeSubTab accordingly
  useEffect(() => {
    // Find the top-level tab which matches current path (or any of its subitems)
    const currentTab = tabs.find(isPathMatch);

    if (currentTab) {
      setActiveTab(currentTab.label);

      // Find submenu under current tab that matches current path
      const currentSubMenu = currentTab.submenu?.find(isPathMatch);

      if (currentSubMenu) {
        setActiveSubMenu(currentSubMenu.label);

        if (currentSubMenu.submenu) {
          // If submenu has nested submenu (level 2), find the subtab that matches current path
          const currentSubTab = currentSubMenu.submenu.find(
            (sub) => sub.to === location.pathname
          );
          if (currentSubTab) setActiveSubTab(currentSubTab.label);
        } else {
          // If no deeper submenu, set activeSubTab to current submenu itself
          setActiveSubTab(currentSubMenu.label);
        }
      } else {
        // No submenu matching path found, reset submenu states
        setActiveSubMenu(null);
        setActiveSubTab(null);
      }
    } else {
      // No tab matches path, reset all active states
      setActiveTab(null);
      setActiveSubMenu(null);
      setActiveSubTab(null);
    }
  }, [location.pathname]);

  return (
    <nav
      className="w-full bg-quaternary-bg relative h-[72px] shadow-navbar-shadow flex items-center gap-[32px] px-[48px] py-[19px] text-quaternary-fg"
      ref={menuRef} // Used to detect clicks outside this container
    >
      {/* Loop over each tab from tabs data */}
      {tabs.map((tab, index) => {
        // Check if user has permission to see this tab
        const hasPermission = tab.permission ? checkPermissions(tab.permission) : true;
        if (!hasPermission) return null; // Skip tab if no permission

        if (tab.submenu) {
          // Tab has submenu (dropdown)
          return (
            <div key={index} className="relative">
              {/* Button that toggles the dropdown open/close */}
              <button
                onClick={() => {
                  const newState = !menuOpen;
                  setMenuOpen(newState);
                  setActiveTab(tab.label);
                  if (!newState) {
                    setActiveSubMenu(null);
                    setActiveSubTab(null);
                  }
                }}
                className={`group flex flex-col items-center px-4 py-2 rounded transition-colors bg-quaternary-bg duration-200 cursor-pointer focus:outline-none ${getTabStyle(tab)} hover:text-primary`}
              >
                <div className="flex items-center gap-2">
                  <TbListSearch className="w-8 h-8 transition-colors duration-200 group-hover:text-primary" />
                  <span className="text-2xl transition-colors duration-200 group-hover:text-primary">{tab.label}</span>
                  <FiChevronDown
                    className={`w-8 h-8 transition-transform duration-200 group-hover:text-primary ${
                      menuOpen && activeTab === tab.label ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {/* underline bar below the tab */}
                <span
                  className={`block h-1 w-full mt-1 rounded-full transition-all duration-200 ${
                    (menuOpen && activeTab === tab.label) || (menuOpen && tab.to === location.pathname)
                      ? "bg-primary"
                      : "group-hover:bg-primary"
                  }`}
                ></span>
              </button>

              {/* Submenu container */}
              <div
                className={`absolute top-13 mt-2 w-100 text-right right-41 rounded-lg z-20 border-b border-white transition-all duration-300 ease-in-out ${
                  menuOpen && activeTab === tab.label ? "block" : "hidden"
                }`}
              >
                {/* Loop submenu items */}
                {tab.submenu.map((item, idx) => (
                  <div key={idx}>
                    {item.submenu ? (
                      <>
                        {/* Submenu item with nested submenu */}
                        <button
                          onClick={() => handleSubMenuToggle(item.label)}
                          className={`group w-full text-right cursor-pointer px-4 py-2 bg-quaternary-bg border-b border-white flex flex-col items-end transition-colors duration-200 focus:outline-none ${
                            activeSubMenu === item.label || item.to === location.pathname
                              ? "text-primary"
                              : "text-white"
                          } hover:text-primary`}
                        >
                          <div className="flex justify-between items-center gap-2">
                            <span className="text-[16px] rounded transition-colors duration-200 group-hover:text-primary">{item.label}</span>
                            <MdKeyboardArrowDown
                              className={`w-8 h-8 transition-transform duration-200 group-hover:text-primary ${
                                activeSubMenu === item.label ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </button>

                        {/* Nested submenu (level 2) */}
                        {activeSubMenu === item.label && (
                          <div
                            className="absolute right-full w-70 rounded-lg shadow-lg z-30 transition-all duration-500 block"
                            style={{ top: `${idx * 50}px` }}
                          >
                            {item.submenu.map((sub, subIdx) => (
                              <button
                                key={subIdx}
                                onClick={() => setActiveSubTab(sub.label)}
                                className={`group w-full text-right text-[12px] px-4 cursor-pointer border-t border-white py-2 transition-colors duration-200 focus:outline-none ${
                                  activeSubTab === sub.label || sub.to === location.pathname
                                    ? "bg-primary text-white"
                                    : "bg-quaternary-bg text-white"
                                } hover:bg-primary`}
                              >
                                <span className="transition-colors duration-200">{sub.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      // Simple submenu item (link)
                      <Link
                        to={item.to}
                        onClick={() => setActiveSubTab(item.label)}
                        className={`group w-full text-right px-4 py-2 transition-colors duration-200 rounded-lg focus:outline-none ${
                          activeSubTab === item.label || item.to === location.pathname
                            ? "text-primary"
                            : "text-white"
                        } hover:text-primary`}
                      >
                        <span className="group-hover:text-primary transition-colors duration-200">{item.label}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // Simple tab without submenu
        return tab.to ? (
          <Link
            key={index}
            to={tab.to}
            onClick={() => setActiveTab(tab.label)}
            className={`group flex flex-col items-center transition-colors text-2xl duration-200 focus:outline-none ${getTabStyle(tab)} hover:text-primary`}
          >
            <div className="flex align-center gap-3">
              <MdSettingsInputComponent className="w-8 h-8 transition-colors duration-200 group-hover:text-primary" />
              <span className="group-hover:text-primary transition-colors duration-200">{tab.label}</span>
            </div>
            <span
              className={`block h-1 w-full mt-1 rounded-full transition-all duration-200 ${
                activeTab === tab.label || tab.to === location.pathname ? "bg-primary" : "group-hover:bg-primary"
              }`}
            ></span>
          </Link>
        ) : null;
      })}
    </nav>
  );
}

export default Navbar;
