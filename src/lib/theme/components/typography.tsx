import { Components } from "@mui/material/styles";

export function typography(): Components {
  return {
    MuiTypography: {
      styleOverrides: {
        root: {
          letterSpacing: "-0.02em",
        },
      },
    },
  };
}
