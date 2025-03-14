import { Theme } from "@mui/material/styles";
import { ButtonProps } from "@mui/material/Button";

const COLORS = [
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "error",
] as const;

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    soft: true;
  }
}

export function button(theme: Theme) {
  const lightMode = theme.palette.mode === "light";

  const rootStyles = (ownerState: ButtonProps) => {
    const containedVariant = ownerState.variant === "contained";
    const outlinedVariant = ownerState.variant === "outlined";
    const smallSize = ownerState.size === "small";
    const mediumSize = ownerState.size === "medium";
    const largeSize = ownerState.size === "large";

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        ...(containedVariant && {
          color: lightMode
            ? theme.palette[color].contrastText
            : theme.palette[color].contrastText,
          backgroundColor: theme.palette[color].main,
          "&:hover": {
            backgroundColor: theme.palette[color].main,
            opacity: 0.8,
          },
        }),
        ...(outlinedVariant && {
          color: theme.palette[color].main,
          backgroundColor: theme.palette.background.default,
          border: `2px solid ${theme.palette[color].main}`,
          "&:hover": {
            backgroundColor: theme.palette.background.default,
            border: `2px solid ${theme.palette[color].main}`,
            opacity: 0.8,
          },
        }),
      }),
    }));

    const size = {
      ...(smallSize && {
        height: 30,
        fontSize: 13,
        paddingLeft: 8,
        paddingRight: 8,
      }),
      ...(mediumSize && {
        height: 40,
        paddingLeft: 12,
        paddingRight: 12,
      }),
      ...(largeSize && {
        height: 48,
        fontSize: 15,
        paddingLeft: 16,
        paddingRight: 16,
      }),
    };

    const shadows = {
      ...(containedVariant && {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
      }),
    };

    return [...colorStyle, size, shadows];
  };

  return {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonProps }) =>
          rootStyles(ownerState),
      },
    },
  };
}
