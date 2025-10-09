import type { CSSProperties, ReactNode } from "react";

interface FormSectionHeaderProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}
function FormSectionHeader({
  children,
  className,
  style,
}: FormSectionHeaderProps) {
  return (
    <h3
      style={style}
      className={`font-bold text-header-fg text-size28 col-span-full w-full text-center ${className}`}
    >
      {children}
    </h3>
  );
}

export default FormSectionHeader;
