import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "src/lib/theme";

export const ThemeToggle = () => {
  const { mode, toggleMode } = useTheme();

  return (
    <IconButton onClick={toggleMode} color="inherit">
      {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
};
