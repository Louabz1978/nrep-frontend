import type { ReactNode } from "react";

interface FormSectionHeaderProps {
  children: ReactNode;
}
function FormSectionHeader({ children }: FormSectionHeaderProps) {
  return (
    <h3 className="font-bold text-size40 text-primary-fg mb-[16px] mt-[40px] col-span-full w-full text-center">
      {children}
    </h3>
  );
}

export default FormSectionHeader;
