// Accordion component for expanding/collapsing content sections
import { type ReactNode } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

// Props for the Accordion component
interface AccrodionProps {
  children: ReactNode;
  title: string;
  isOpen: boolean;
  icon: ReactNode;
  onClick: () => void;
}

// Main Accordion component
const Accrodion = ({
  onClick,
  children,
  title,
  isOpen,
  icon,
}: AccrodionProps) => {
  return (
    <div>
      {/* Accordion header: clickable area to toggle open/close */}
      <div
        onClick={onClick}
        className="flex items-center justify-between p-2 mx-8 cursor-pointer"
      >
        <div className="flex items-center justify-between">
          {/* Icon next to the title */}
          <div className="text-[30px] text-gold-background">{icon}</div>
          {/* Accordion title */}
          <div className="text-[30px] text-3xl text-black m-5 font-bold">
            {title}
          </div>
        </div>

        {/* Arrow icon indicating open/closed state */}
        <div
          className={` text-[30px] ${
            isOpen ? "text-gold-background" : "text-black"
          }`}
        >
          <FaArrowAltCircleLeft
            className={`${
              isOpen ? "-rotate-90" : ""
            } transition-all duration-[0.35s]`}
          />
        </div>
      </div>
      {/* Animate the children with framer-motion when open/closed */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Divider below the accordion */}
      <hr />
    </div>
  );
};

export default Accrodion;
