import type { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

function Page({ children }: PageProps) {
  return (
    <main className="flex flex-col flex-1 overflow-auto md:p-container-padding-desktop p-container-padding-mobile">
      {children}
    </main>
  );
}

export default Page;
