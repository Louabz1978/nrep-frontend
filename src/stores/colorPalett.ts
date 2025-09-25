// src/stores/colorPalett.ts
import { atomWithStorage } from "jotai/utils";

export type ColorPalette = {
  /* color pallet */
  primary: string;
  secondary: string;

  /* backgrounds */
  primaryBg: string;
  secondaryBg: string;
  tertiaryBg: string;
  quaternaryBg: string;
  quinaryBg: string;
  senaryBg: string;
  popupBg: string;
  digitalGreenBg: string;
  layoutBg: string;
  goldenMedium: string;
  goldenBold: string;

  /* foreground */
  primaryFg: string;
  secondaryFg: string;
  quaternaryFg: string;
  headerFg: string;
  inverseFg: string;

  /* status*/
  success: string;
  error: string;

  /* borders */
  primaryBorder: string;
  secondaryBorder: string;
  tertiaryBorder: string;
  quaternaryBorder: string;

  /* input */
  inputBg: string;
  placeholder: string;
  placeholderSecondary: string;

  /* icons */
  primaryIcon: string;

  /* overlay */
  primaryOverlay: string;
};

export const defaultColorPalette: ColorPalette = {
  primary: "#005bbb",
  secondary: "#a3d3f5",
  primaryBg: "#e5e5e5",
  secondaryBg: "#d1d1d6",
  tertiaryBg: "#ffffff",
  quaternaryBg: "#333333",
  quinaryBg: "#ada7a7",
  senaryBg: "#1c2026",
  popupBg: "#14191e",
  digitalGreenBg: "#6cbf84",
  layoutBg: "#002623",
  goldenMedium: "#b9a779",
  goldenBold: "#988561",
  primaryFg: "#333333",
  secondaryFg: "#000000",
  quaternaryFg: "#ffffff",
  inverseFg: "#ffffff",
  headerFg: "#333333",
  success: "#34c759",
  error: "#c1272d",
  primaryBorder: "#333333",
  secondaryBorder: "#ada7a7",
  tertiaryBorder: "#d9d9d9",
  quaternaryBorder: "#828282",
  inputBg: "#ffffff",
  placeholder: "#ada7a7",
  placeholderSecondary: "#ada7a7",
  primaryIcon: "#b3b3b3",
  primaryOverlay: "#00000026",
};

export const colorPaletteAtom = atomWithStorage<ColorPalette>(
  "colorPalette",
  defaultColorPalette
);

export const colorPaletteEditedAtom = atomWithStorage(
  "colorPaletteEdited",
  false
);
