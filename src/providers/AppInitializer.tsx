import { useTheme } from "@/hooks/global/useTheme";
import { spaceSizeAtom, textSizeAtom } from "@/stores/settings";
import { useAtom } from "jotai";
import { useEffect, type ReactNode } from "react";

function AppInitializer({ children }: { children: ReactNode }) {
  useTheme();

  const [textSize, setTextSize] = useAtom(textSizeAtom);

  // Apply text size whenever it changes
  useEffect(() => {
    document
      .querySelector(":root")
      ?.style.setProperty("--text-factor", textSize);
  }, [textSize]);

  const [spaceSize, setSpaceSize] = useAtom(spaceSizeAtom);

  // Apply space size whenever it changes
  useEffect(() => {
    if (spaceSize)
      document
        .querySelector(":root")
        ?.style.setProperty("--space-factor", spaceSize);
  }, [spaceSize]);

  return children;
}

export default AppInitializer;
