import type { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
  noPadding?: boolean;
}

function Page({ children, noPadding }: PageProps) {
  return (
    <main
      className={`flex flex-col flex-1 overflow-auto ${
        noPadding
          ? "" // no padding
          : "md:p-container-padding-desktop p-container-padding-mobile"
      }`}
    >
      {children}
    </main>
  );
}

export default Page;
