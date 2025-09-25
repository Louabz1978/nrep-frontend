import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

interface PopupProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

function Popup({ open, onClose, children, className = "" }: PopupProps) {
  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary-overlay backdrop-blur-[30px]"
      onClick={onClose}
    >
      <div
        className={twMerge(
          "relative max-h-[90dvh] min-w-[300px] overflow-auto rounded-[18px] bg-tertiary-bg p-6 shadow-navbar-shadow sm:w-max w-[90vw] max-w-[90vw]",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </motion.div>
  );
}

export default Popup;
