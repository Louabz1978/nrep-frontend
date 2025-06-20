import type { ReactNode } from "react";

function Page({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex-1 flex flex-col bg-background transition-all duration-[0.3s]">
      {children}
    </div>
  );
}

export default Page;
