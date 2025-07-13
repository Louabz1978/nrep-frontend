import type { TabType } from "@/data/website/navbar";

type Props = {
  isOpen: boolean;
  items: TabType[];
  activeSubTab: string | null;
  setActiveSubTab: (label: string) => void;
  offsetTop: number;
};

function Secondmenu({
  isOpen,
  items,
  activeSubTab,
  setActiveSubTab,
  offsetTop,
}: Props) {
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
          className={`w-full text-right cursor-pointer text-[12px] px-4 py-2 border-t border-border ${
            activeSubTab === sub.label
              ? "bg-primary text-inverse-fg"
              : "bg-quaternary-bg text-inverse-fg"
          } hover:bg-secondary hover:text-inverse-fg`}
        >
          {sub.label}
        </button>
      ))}
    </div>
  );
}

export default Secondmenu;
