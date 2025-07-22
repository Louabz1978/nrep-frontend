import type { ReactNode } from "react";

interface FormSectionHeaderProps {
  children: ReactNode;
  className?: string;
}
function FormSectionHeader({ children, className }: FormSectionHeaderProps) {
  return (
    <h3
      className={`font-bold text-header-fg text-size28 col-span-full w-full text-center ${className}`}
    >
      {children}
    </h3>
  );
}

export default FormSectionHeader;
