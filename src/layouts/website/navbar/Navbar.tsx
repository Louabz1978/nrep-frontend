import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "@/stores/useUser";
import { tabs, type TabType } from "@/data/website/navbar";
import handleClickOutside from "@/utils/handleClickOutside";
import FirstMenu from "./FirstMenu";
import DropdownButton from "./components/DropdownButton";

function Navbar() {
  const { checkPermissions } = useUser();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const isPathMatch = (item: TabType): boolean => {
    if (item.to === location.pathname) return true;
    else if (item.submenu) return item.submenu.some(isPathMatch);
    return false;
  };

  const isCurrentPath = (tab: TabType): boolean => isPathMatch(tab);

  const getTabStyle = (tab: TabType): string => {
    const isCurrent = isCurrentPath(tab);
    const isOpen = menuOpen && activeTab === tab.label;
    return isCurrent || isOpen
      ? "text-primary"
      : "text-inverse-fg hover:text-secondary";
  };

  handleClickOutside(menuRef, () => {
    setMenuOpen(false);
    setActiveTab(null);
    setActiveSubMenu(null);
    setActiveSubTab(null);
  });

  useEffect(() => {
    const currentTab = tabs.find(isPathMatch);
    if (currentTab) {
      setActiveTab(currentTab.label);
      const currentSubMenu = currentTab.submenu?.find(isPathMatch);
      if (currentSubMenu) {
        setActiveSubMenu(currentSubMenu.label);
        if (currentSubMenu.submenu) {
          const currentSubTab = currentSubMenu.submenu.find(
            (sub) => sub.to === location.pathname
          );
          if (currentSubTab) setActiveSubTab(currentSubTab.label);
        } else {
          setActiveSubTab(currentSubMenu.label);
        }
      } else {
        setActiveSubMenu(null);
        setActiveSubTab(null);
      }
    } else {
      setActiveTab(null);
      setActiveSubMenu(null);
      setActiveSubTab(null);
    }
  }, [location.pathname]);

  return (
    <nav
      className="w-full bg-quaternary-bg relative h-[72px] shadow-navbar-shadow flex items-center gap-[32px] px-[48px] py-[19px] text-quaternary-fg"
      ref={menuRef}
    >
      {tabs.map((tab, index) => {
        const hasPermission = tab.permission
          ? checkPermissions(tab.permission)
          : true;
        if (!hasPermission) return null;

        if (tab.submenu) {
          return (
            <div key={index} className="relative">
              <DropdownButton
                tab={tab}
                menuOpen={menuOpen}
                activeTab={activeTab}
                onClick={() => {
                  const newState = !menuOpen;
                  setMenuOpen(newState);
                  setActiveTab(tab.label);
                  if (!newState) {
                    setActiveSubMenu(null);
                    setActiveSubTab(null);
                  }
                }}
                getTabStyle={getTabStyle}
                location={location}
              />

              <FirstMenu
                isOpen={menuOpen && activeTab === tab.label}
                items={tab.submenu}
                activeSubMenu={activeSubMenu}
                activeSubTab={activeSubTab}
                setActiveSubMenu={setActiveSubMenu}
                setActiveSubTab={setActiveSubTab}
              />
            </div>
          );
        }

        return tab.to ? (
          <Link
            key={index}
            to={tab.to}
            onClick={() => setActiveTab(tab.label)}
            className={`group flex flex-col items-center transition-colors text-2xl duration-200 focus:outline-none ${getTabStyle(
              tab
            )}`}
          >
            <div className="flex align-center gap-3">
              {tab.icon ? (
                <tab.icon className="w-8 h-8 transition-colors duration-200" />
              ) : null}
              <span className="transition-colors duration-200">
                {tab.label}
              </span>
            </div>
            <span
              className={`block h-1 w-full mt-1 rounded-full transition-all duration-200 ${
                activeTab === tab.label || tab.to === location.pathname
                  ? "bg-primary"
                  : "group-hover:bg-secondary"
              }`}
            ></span>
          </Link>
        ) : null;
      })}
    </nav>
  );
}

export default Navbar;
