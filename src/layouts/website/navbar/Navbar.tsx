import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { useUser } from "@/stores/useUser";
import { TbListSearch } from "react-icons/tb";
import { MdKeyboardArrowDown, MdSettingsInputComponent } from "react-icons/md";
import { tabs } from "@/data/website/navbar";

function Navbar() {
  const { checkPermissions } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);

  const handleSubMenuToggle = (label: string) => {
    setActiveSubMenu(activeSubMenu === label ? null : label);
  };

  return (
    <nav className="w-full bg-dark-gray h-16 flex items-center px-12 justify-start text-white">
      <div className="flex items-center gap-4">
        {tabs.map((tab, index) => {
          const hasPermission = tab.permission
            ? checkPermissions(tab.permission)
            : true;
          if (!hasPermission) return null;
          if (tab.submenu) {
            return (
              <div key={index} className="relative">
                <button
                  onClick={() => {
                    setMenuOpen((prev) => !prev);
                    setActiveTab(tab.label);
                    setActiveSubMenu(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded transition-colors bg-dark-gray duration-200 cursor-pointer ${
                    activeTab === tab.label ? "text-gold-background" : "text-white"
                  } hover:text-gold-background focus:outline-none`}
                >
                  <TbListSearch className="w-8 h-8" />
                  <span className="text-2xl">{tab.label}</span>
                  <FiChevronDown
                    className={`w-8 h-8 transition-transform duration-200 ${
                      menuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`absolute -left-10 top-12 mt-2 w-48 bg-dark-gray rounded-lg  z-20 border-t border-white transition-all duration-300 ease-in-out ${
                    menuOpen ? "block" : "hidden"
                  }`}
                >
                  {tab.submenu?.map((item, idx) => (
                    <div key={idx}>
                      {item.submenu ? (
                        <>
                          <button
                            onClick={() => handleSubMenuToggle(item.label)}
                            className={`w-full text-right cursor-pointer px-4 py-2 bg-dark-gray border-t border-white flex justify-between items-center transition-colors duration-200 ${
                              activeSubMenu === item.label
                                ? "text-gold-background"
                                : "text-white"
                            } hover:text-gold-background focus:outline-none`}
                          >
                            <span className="text-2xl">{item.label}</span>
                            <MdKeyboardArrowDown
                              className={`w-8 h-8 transition-transform duration-200 ${
                                activeSubMenu === item.label ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {activeSubMenu === item.label && (
                            <div
                              className={`absolute right-full w-48 bg-dark-gray rounded-lg shadow-lg z-30 transition-all duration-500 ${
                                activeSubMenu === item.label
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                              style={{
                                top: `${idx * 48}px`,
                                border: "1px solid white ",
                              }}
                            >
                              {item.submenu.map((sub, subIdx) => (
                                <button
                                  key={subIdx}
                                  onClick={() => setActiveSubTab(sub?.label)}
                                  className={`w-full text-right text-2xl px-4 cursor-pointer border-t border-white py-2 bg-dark-gray hover:text-gold-background transition-colors duration-200  ${
                                    activeSubTab === sub?.label
                                      ? "text-gold-background bg-dark-gray "
                                      : "text-white"
                                  } focus:outline-none`}
                                >
                                  <span
                                    className={`${
                                      activeSubTab === sub?.label
                                        ? "border-b-2 border-gold-background"
                                        : "border-none"
                                    }`}
                                  >
                                    {sub?.label}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={() => setActiveSubTab(item.label)}
                          className={`w-full text-right px-4 py-2 hover:bg-dark-gray transition-colors duration-200 rounded-lg ${
                            activeSubTab === item.label
                              ? "text-gold-background font-semibold bg-dark-gray"
                              : "text-white"
                          } focus:outline-none`}
                        >
                          {item.label}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          // Otherwise, render as Link
          return tab.to ? (
            <Link
              key={index}
              to={tab.to}
              onClick={() => setActiveTab(tab.label)}
              className={`transition-colors text-2xl duration-200 hover:text-gold-background ${
                activeTab === tab.label ? "text-gold-background" : "text-white"
              }`}
            >
              <div className="flex align-center gap-3">
                <MdSettingsInputComponent className="w-8 h-8" />
                {tab.label}
              </div>
            </Link>
          ) : null;
        })}
      </div>
    </nav>
  );
}

export default Navbar;
