import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

function PageContainer({
  children,
  className,
  containerClassName,
}: PageContainerProps) {
  return (
    <div
      className={`flex-1 w-full flex flex-col items-center ${containerClassName}`}
    >
      <div
        className={`w-full max-w-container-max-width-desktop flex-1 flex flex-col ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export default PageContainer;
