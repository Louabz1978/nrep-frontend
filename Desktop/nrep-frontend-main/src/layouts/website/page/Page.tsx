import type { ReactNode } from "react";

function Page({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex-1 flex flex-col bg-primary transition-all duration-[0.3s] scroll-bar">
      {children}
    </div>
  );
}

export default Page;
