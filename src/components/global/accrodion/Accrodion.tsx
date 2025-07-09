// Accordion component for expanding/collapsing content sections
import { type ReactNode } from "react";
import {
  FaArrowAltCircleLeft,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import type { IconType } from "react-icons/lib";
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";

// Props for the Accordion component
interface AccrodionProps<T extends FieldValues> {
  children: ReactNode;
  title: string;
  isOpen: boolean;
  icon: IconType;
  onClick: () => void;
  accordionFields: string[];
  requiredFields: string[];
  form: UseFormReturn<T>;
}

// Main Accordion component
function Accrodion<T extends FieldValues>({
  onClick,
  children,
  title,
  isOpen,
  icon: Icon,
  accordionFields,
  requiredFields,
  form,
}: AccrodionProps<T>) {
  const {
    watch,
    formState: { errors },
  } = form;

  const hasError = accordionFields.some((field) => errors[field]);

  const isValid =
    !hasError &&
    accordionFields.every(
      (field) =>
        !requiredFields?.includes(field) ||
        watch(field as PathValue<T, Path<T>>)
    );

  return (
    <div className="rounded-[15px] flex flex-col bg-secondary-bg">
      {/* Accordion header: clickable area to toggle open/close */}
      <div
        onClick={onClick}
        className={`flex shadow-accordion-shadow ${
          hasError ? "bg-error" : "bg-primary"
        } transition-all rounded-[15px] items-center justify-between py-[22px] px-[48px] cursor-pointer`}
      >
        <div className="flex items-center gap-[16px]">
          {/* Icon next to the title */}
          <Icon className="text-inverse-fg size-[30px]" />
          {/* Accordion title */}
          <div className="text-[32px] font-medium text-inverse-fg">{title}</div>
        </div>

        {/* Arrow icon indicating open/closed state */}
        {hasError ? (
          <FaTimesCircle
            className={`text-inverse-fg transition-all duration-[0.35s] size-[50px]`}
          />
        ) : isValid ? (
          <FaCheckCircle
            className={`text-inverse-fg transition-all duration-[0.35s] size-[50px]`}
          />
        ) : (
          <FaArrowAltCircleLeft
            className={`${
              isOpen ? "-rotate-90" : ""
            } text-inverse-fg transition-all duration-[0.35s] size-[50px]`}
          />
        )}
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
    </div>
  );
}

export default Accrodion;
