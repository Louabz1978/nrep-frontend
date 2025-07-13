import type { ReactNode } from "react";

interface FormSectionHeaderProps {
  children: ReactNode;
  textSize?: string;
}
function FormSectionHeader({ children, textSize }: FormSectionHeaderProps) {
  return (
    <h3
      className={`font-bold ${
        textSize ? textSize : "text-size40"
      } text-primary-fg mb-[16px] mt-[40px] col-span-full w-full text-center`}
    >
      {children}
    </h3>
  );
}

export default FormSectionHeader;
