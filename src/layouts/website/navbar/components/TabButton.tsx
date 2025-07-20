import { FiChevronDown } from "react-icons/fi";
import { TbListSearch } from "react-icons/tb";
import { MdSettingsInputComponent } from "react-icons/md";

/**
 * Props interface for TabButton component
 */
interface TabButtonProps {
  tab: any; // Tab data object
  isOpen: boolean; // Whether the dropdown menu is open
  activeTab: string | null; // Currently active tab label
  onClick: () => void; // Click handler function
  getTabStyle: (tab: any) => string; // Function to get CSS classes based on tab state
  location: any; // Current location object from react-router
}

/**
 * TabButton Component
 * 
 * Renders a navigation tab button that can be either:
 * - A dropdown button (with chevron icon) for tabs with submenus
 * - A simple display element for tabs without submenus
 * 
 * Features:
 * - Dynamic styling based on active state
 * - Hover effects and transitions
 * - Icon integration (search icon for dropdowns, settings icon for simple tabs)
 * - Underline indicator for active state
 */
function TabButton({ tab, isOpen, activeTab, onClick, getTabStyle, location }: TabButtonProps) {
  // Render dropdown button if tab has submenu
  if (tab.submenu) {
    return (
      <button
        onClick={onClick}
        className={`group flex flex-col items-center px-4 py-2 rounded transition-colors bg-quaternary-bg duration-200 cursor-pointer focus:outline-none ${getTabStyle(tab)} hover:text-primary`}
      >
        {/* Button content with icon, label, and chevron */}
        <div className="flex items-center gap-2">
          <TbListSearch className="w-8 h-8 transition-colors duration-200 group-hover:text-primary" />
          <span className="text-2xl transition-colors duration-200 group-hover:text-primary">{tab.label}</span>
          <FiChevronDown
            className={`w-8 h-8 transition-transform duration-200 group-hover:text-primary ${
              isOpen && activeTab === tab.label ? "rotate-180" : ""
            }`}
          />
        </div>
        
        {/* Active state underline indicator */}
        <span
          className={`block h-1 w-full mt-1 rounded-full transition-all duration-200 ${
            (isOpen && activeTab === tab.label) || (isOpen && tab.to === location.pathname)
              ? "bg-primary"
              : "group-hover:bg-primary"
          }`}
        ></span>
      </button>
    );
  }

  // Render simple tab display (no click handler, just visual)
  return (
    <div className="group flex flex-col items-center transition-colors text-2xl duration-200 focus:outline-none">
      {/* Tab content with settings icon and label */}
      <div className="flex align-center gap-3">
        <MdSettingsInputComponent className="w-8 h-8 transition-colors duration-200 group-hover:text-primary" />
        <span className="group-hover:text-primary transition-colors duration-200">{tab.label}</span>
      </div>
      
      {/* Active state underline indicator */}
      <span
        className={`block h-1 w-full mt-1 rounded-full transition-all duration-200 ${
          activeTab === tab.label || tab.to === location.pathname ? "bg-primary" : "group-hover:bg-primary"
        }`}
      ></span>
    </div>
  );
}

export default TabButton; 