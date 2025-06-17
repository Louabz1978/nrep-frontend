import { useTheme } from "@/hooks/global/useTheme";
import { type ReactNode } from "react";

function AppInitializer({ children }: { children: ReactNode }) {
  useTheme();

  return children;
}

export default AppInitializer;
