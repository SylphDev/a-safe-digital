import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import merge from "lodash/merge";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  ThemeOptions,
} from "@mui/material/styles";
import { palette } from "./palette"; // Your palette function
import { typography } from "./typography"; // Your typography configuration
import { darkMode } from "./dark-mode"; // Your dark mode overrides

// ----------------------------------------------------------------------

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem("themeMode") as ThemeMode;
    return savedMode || "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const darkModeOption = darkMode(mode);

  const baseOption = useMemo(
    () => ({
      palette: palette(mode),
      typography,
      shape: { borderRadius: 8 },
    }),
    [mode]
  );

  const memoizedValue = useMemo(
    () => merge(baseOption, darkModeOption),
    [baseOption, darkModeOption]
  );

  const theme = createTheme(memoizedValue as ThemeOptions);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
