import type { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
  noPadding?: boolean;
}

function Page({ children, noPadding }: PageProps) {
  return (
    <main
      className={`flex flex-col flex-1 overflow-auto min-h-[calc(100svh_-_64px)] ${
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
