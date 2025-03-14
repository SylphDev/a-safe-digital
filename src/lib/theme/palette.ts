import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export type ColorSchema =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    neutral: string;
    opacity: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
  interface TypeText {
    white: string;
    aqua: string;
    icon: string;
    light: string;
    normal: string;
    medium: string;
    dark: string;
    strong: string;
    blue: string;
    lighter: string;
  }
}

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#ACB9C9",
  600: "#637381",
  700: "#454F5B",
  800: "#2f363e",
  900: "#161C24",
};

const PRIMARY = {
  lighter: "#E8F5E9",
  light: "#81C784",
  main: "#4CAF50",
  dark: "#388E3C",
  darker: "#1B5E20",
  contrastText: "#FFFFFF",
};

const SECONDARY = {
  lighter: "#5AE1E234",
  light: "#29BEFF",
  main: "#5AE1E2",
  dark: "#6fdef657",
  darker: "#6fdef6",
  contrastText: "#000000",
};

const INFO = {
  lighter: "#CAFDF5",
  light: "#61F3F3",
  main: "#00B8D9",
  dark: "#006C9C",
  darker: "#003768",
  contrastText: "#FFFFFF",
};

const SUCCESS = {
  lighter: "#D3FCD2",
  light: "#77ED8B",
  main: "#22C55E",
  dark: "#118D57",
  darker: "#065E49",
  contrastText: "#ffffff",
};

const WARNING = {
  lighter: "#FFF5CC",
  light: "#FFD666",
  main: "#FFAB00",
  dark: "#B76E00",
  darker: "#7A4100",
  contrastText: GREY[800],
};

const ERROR = {
  lighter: "#FFE9D5",
  light: "#FFAC82",
  main: "#FF5630",
  dark: "#B71D18",
  darker: "#7A0916",
  contrastText: "#FFFFFF",
};

const COMMON = {
  common: {
    black: "#000000",
    white: "#FFFFFF",
  },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.2),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export function palette(mode: "light" | "dark") {
  const light = {
    ...COMMON,
    mode: "light",
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
      white: "#FFFFFF",
      aqua: SECONDARY.main,
      icon: "#5dceff",
      light: "#E6ECF6",
      lighter: "#D4E1F1",
      normal: "#ACB9C9",
      dark: "#8091a7",
      medium: "#616F81",
      strong: "#2F363E",
      blue: PRIMARY.main,
    },
    background: {
      paper: "#FFFFFF",
      default: "#f6f7fb",
      neutral: "#F4F6F8",
      opacity: "#eef8ff",
    },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  };

  const dark = {
    ...COMMON,
    mode: "dark",
    text: {
      primary: "#FFFFFF",
      secondary: GREY[500],
      disabled: GREY[600],
      white: "#FFFFFF",
      icon: "#FFFFFF",
      aqua: "#FFFFFF",
      light: "#76879D",
      lighter: "#D4E1F1",
      normal: "#ABC1CE",
      medium: "#DBE6EA",
      dark: "#ebf1f3",
      strong: "#FFFFFF",
      blue: COMMON.common.white,
    },
    background: {
      paper: "#1F232B",
      default: "#10141C",
      neutral: GREY[500],
      opacity: alpha(GREY[500], 0.12),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  };

  return mode === "light" ? light : dark;
}
