import { FiChevronDown } from "react-icons/fi";
import { TbListSearch } from "react-icons/tb";

/**
 * Props interface for DropdownButton component
 */
interface DropdownButtonProps {
  tab: any; // Tab data object
  menuOpen: boolean; // Whether the dropdown menu is open
  activeTab: string | null; // Currently active tab label
  onClick: () => void; // Click handler function
  getTabStyle: (tab: any) => string; // Function to get CSS classes based on tab state
  location: any; // Current location object from react-router
}

function DropdownButton({ 
  tab, 
  menuOpen, 
  activeTab, 
  onClick, 
  getTabStyle, 
  location 
}: DropdownButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group flex flex-col items-center px-4 py-2 rounded transition-colors bg-quaternary-bg duration-200 cursor-pointer focus:outline-none ${getTabStyle(tab)} hover:text-primary`}
    >
      {/* Button content with icon, label, and chevron */}
      <div className="flex items-center gap-2">
        <TbListSearch className="w-8 h-8 transition-colors duration-200 group-hover:text-primary" />
        <span className="text-2xl transition-colors duration-200 group-hover:text-primary">
          {tab.label}
        </span>
        <FiChevronDown
          className={`w-8 h-8 transition-transform duration-200 group-hover:text-primary ${
            menuOpen && activeTab === tab.label ? "rotate-180" : ""
          }`}
        />
      </div>
      
      {/* Active state underline indicator */}
      <span
        className={`block h-1 w-full mt-1 rounded-full transition-all duration-200 ${
          (menuOpen && activeTab === tab.label) || (menuOpen && tab.to === location.pathname)
            ? "bg-primary"
            : "group-hover:bg-primary"
        }`}
      ></span>
    </button>
  );
}

export default DropdownButton; 