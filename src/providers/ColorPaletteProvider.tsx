import { useEffect } from "react";
import { useAtom } from "jotai";
import { colorPaletteAtom } from "@/stores/colorPalett";

export const ColorPaletteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [palette] = useAtom(colorPaletteAtom);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      Object.entries(palette).forEach(([key, value]) => {
        const cssVarName = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
        root.style.setProperty(cssVarName, value);
      });
    }
  }, [palette]);

  return <>{children}</>;
};
