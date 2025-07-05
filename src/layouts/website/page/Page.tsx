import type { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

function Page({ children }: PageProps) {
  return <main className="flex flex-col flex-1 overflow-auto">{children}</main>;
}

export default Page;
