// import { Link } from "react-router-dom";
// import { MdSettingsInputComponent } from "react-icons/md";

// /**
//  * Props interface for SimpleTab component
//  */
// interface SimpleTabProps {
//   tab: any; // Tab data object containing label, to (route), etc.
//   activeTab: string | null; // Currently active tab label
//   setActiveTab: (label: string) => void; // Function to set active tab
//   getTabStyle: (tab: any) => string; // Function to get CSS classes based on tab state
//   location: any; // Current location object from react-router
// }

// /**
//  * SimpleTab Component
//  * 
//  * Renders a simple navigation tab that links directly to a route.
//  * This component is used for tabs that don't have submenus.
//  * 
//  * Features:
//  * - Direct navigation using React Router Link
//  * - Active state highlighting
//  * - Hover effects and smooth transitions
//  * - Settings icon for visual consistency
//  * - Underline indicator for active state
//  */
// function SimpleTab({ tab, activeTab, setActiveTab, getTabStyle, location }: SimpleTabProps) {
//   return (
//     <Link
//       to={tab.to}
//       onClick={() => setActiveTab(tab.label)}
//       className={`group flex flex-col items-center transition-colors text-2xl duration-200 focus:outline-none ${getTabStyle(tab)} hover:text-primary`}
//     >
//       {/* Tab content with settings icon and label */}
//       <div className="flex align-center gap-3">
//         <MdSettingsInputComponent className="w-8 h-8 transition-colors duration-200 group-hover:text-primary" />
//         <span className="group-hover:text-primary transition-colors duration-200">{tab.label}</span>
//       </div>
      
//       {/* Active state underline indicator */}
//       <span
//         className={`block h-1 w-full mt-1 rounded-full transition-all duration-200 ${
//           activeTab === tab.label || tab.to === location.pathname ? "bg-primary" : "group-hover:bg-primary"
//         }`}
//       ></span>
//     </Link>
//   );
// }

// export default SimpleTab; 