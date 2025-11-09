import TabButton from "./TabButton";
import FirstMenu from "../FirstMenu";

interface DropdownTabProps {
  tab: any;
  index: number;
  menuOpen: boolean;
  activeTab: string | null;
  activeSubMenu: string | null;
  activeSubTab: string | null;
  setMenuOpen: (open: boolean) => void;
  setActiveTab: (label: string) => void;
  setActiveSubMenu: (label: string | null) => void;
  setActiveSubTab: (label: string | null) => void;
  getTabStyle: (tab: any) => string;
  location: any;
}

function DropdownTab({
  tab,
  index,
  menuOpen,
  activeTab,
  activeSubMenu,
  activeSubTab,
  setMenuOpen,
  setActiveTab,
  setActiveSubMenu,
  setActiveSubTab,
  getTabStyle,
  location,
}: DropdownTabProps) {
  const handleTabClick = () => {
    const newState = !menuOpen;
    setMenuOpen(newState);
    setActiveTab(tab.label);
    if (!newState) {
      setActiveSubMenu(null);
      setActiveSubTab(null);
    }
  };

  return (
    <div key={index} className="relative">
      <TabButton
        tab={tab}
        isOpen={menuOpen}
        activeTab={activeTab}
        onClick={handleTabClick}
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

export default DropdownTab; 