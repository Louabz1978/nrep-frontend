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
    <nav className="w-full bg-[#1C2026] h-16 flex items-center px-12 justify-start text-white">
      <div className="flex items-center gap-4">
        {tabs.map((tab, index) => {
          const hasPermission = tab.permission? checkPermissions([tab.permission as "Add Item" | "Add User"]): true;
          if (!hasPermission) return null;          
          if (tab.submenu || tab.hasMenu) {
            return (
              <div key={index} className="relative">
                <button
                  onClick={() => {
                    setMenuOpen((prev) => !prev);
                    setActiveTab(tab.label);
                    setActiveSubMenu(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded transition-colors bg-[#1C2026] duration-200 cursor-pointer ${
                    activeTab === tab.label ? "text-[#D4AF37]" : "text-white"
                  } hover:text-[#D4AF37] focus:outline-none`}
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
                  className={`absolute -left-10 top-12 mt-2 w-48 bg-[#1C2026] rounded-lg  z-20 border-t border-white transition-all duration-300 ease-in-out ${
                    menuOpen ? "opacity-100" : "opacity-0  "
                  }`}
                >
                  {tab.submenu?.map((item, idx) => (
                    <div key={idx}>
                      {item.nested ? (
                        <>
                          <button
                            onClick={() => handleSubMenuToggle(item.label)}
                            className={`w-full text-right cursor-pointer px-4 py-2 bg-[#1C2026] border-t border-white flex justify-between items-center transition-colors duration-200 ${
                              activeSubMenu === item.label
                                ? "text-[#D4AF37]"
                                : "text-white"
                            } hover:text-[#D4AF37] focus:outline-none`}
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
                              className={`absolute right-full w-48 bg-[#1C2026] rounded-lg shadow-lg z-30 transition-all duration-500 ${
                                activeSubMenu === item.label
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                              style={{
                                top: `${idx * 48}px`,
                                border: "1px solid white ",
                              }}
                            >
                              {item.nested.map((sub, subIdx) => (
                                <button
                                  key={subIdx}
                                  onClick={() => setActiveSubTab(sub)}
                                  className={`w-full text-right text-2xl px-4 cursor-pointer border-t border-white py-2 bg-[#1C2026] hover:text-[#D4AF37] transition-colors duration-200  ${
                                    activeSubTab === sub
                                      ? "text-[#D4AF37] bg-[#1C2026] "
                                      : "text-white"
                                  } focus:outline-none`}
                                >
                                  <span
                                    className={`${
                                      activeSubTab === sub
                                        ? "border-b-2 border-[#D4AF37]"
                                        : "border-none"
                                    }`}
                                  >
                                    {sub}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={() => setActiveSubTab(item.label)}
                          className={`w-full text-right px-4 py-2 hover:bg-[#1C2026] transition-colors duration-200 rounded-lg ${
                            activeSubTab === item.label
                              ? "text-[#D4AF37] font-semibold bg-[#1C2026]"
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
              className={`transition-colors text-2xl duration-200 hover:text-[#D4AF37] ${
                activeTab === tab.label ? "text-[#D4AF37]" : "text-white"
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
