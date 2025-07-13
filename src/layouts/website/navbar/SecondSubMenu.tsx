type Props = {
  isOpen: boolean;
  items: any[];
  activeSubTab: string | null;
  setActiveSubTab: (label: string) => void;
  offsetTop: number;
};

function Secondmenu({ isOpen, items, activeSubTab, setActiveSubTab, offsetTop }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute right-full w-70 rounded-lg shadow-lg z-30"
      style={{ top: `${offsetTop}px` }}
    >
      {items.map((sub, idx) => (
        <button
          key={idx}
          onClick={() => setActiveSubTab(sub.label)}
          className={`w-full text-right cursor-pointer text-[12px] px-4 py-2 border-t border-white ${activeSubTab === sub.label ? "bg-primary text-white" : "bg-quaternary-bg text-white"
            } hover:bg-primary hover:text-white`}
        >
          {sub.label}
        </button>
      ))}
    </div>
  );
}

export default Secondmenu;
