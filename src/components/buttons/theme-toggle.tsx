import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "src/lib/theme";

export const ThemeToggle = () => {
  const { mode, toggleMode } = useTheme();

  return mode === "light" ? (
    <Brightness4Icon onClick={toggleMode} sx={{ cursor: 'pointer' }} />
  ) : (
    <Brightness7Icon onClick={toggleMode} sx={{ cursor: 'pointer' }} />
  );
};
