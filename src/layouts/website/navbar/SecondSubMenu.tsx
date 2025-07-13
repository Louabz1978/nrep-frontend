import type { TabType } from "@/data/website/navbar";
import { Link } from "react-router-dom";

type Props = {
  isOpen: boolean;
  items: TabType[];
  activeSubTab: string | null;
  setActiveSubTab: (label: string) => void;
  offsetTop: number;
};

function Secondmenu({ isOpen, items, activeSubTab, offsetTop }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute right-full w-70 rounded-lg flex flex-col shadow-lg z-30"
      style={{ top: `${offsetTop}px` }}
    >
      {items.map((sub, idx) => (
        <Link
          key={idx}
          to={sub.to ?? ""}
          className={`w-full text-right cursor-pointer text-[12px] px-4 py-2 border-t border-border ${
            activeSubTab === sub.label
              ? "bg-primary text-inverse-fg"
              : "bg-quaternary-bg text-inverse-fg"
          } hover:bg-secondary hover:text-inverse-fg`}
        >
          {sub.label}
        </Link>
      ))}
    </div>
  );
}

export default Secondmenu;
