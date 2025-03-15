import { Components, Theme } from "@mui/material/styles";
import { inputBaseClasses } from "@mui/material/InputBase";
import { inputLabelClasses } from "@mui/material/InputLabel";

export function textField(theme: Theme): Components {
  const color = {
    input: theme.palette.text.strong,
    border: theme.palette.text.lighter,
    placeholder: theme.palette.text.normal,
    label: theme.palette.text.normal,
  };

  const font = {
    label: theme.typography.subtitle2,
    value: theme.typography.body2,
  };

  return {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          position: "absolute",
          bottom: "-18px",
          variants: [],
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          ...font.label,
          fontWeight: 400,
          color: color.label,
          zIndex: 4,
          "&$error": {
            color: color.label,
          },
          "&.Mui-focused": {
            color: `${color.label} !important`,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          [`&.${inputBaseClasses.disabled}`]: {
            "& svg": {
              color: theme.palette.text.normal,
            },
          },
          "&focus-within::after": {
            transform: "none",
          },
        },
        input: {
          ...font.value,
          "&::placeholder": {
            opacity: 1,
            color: color.placeholder,
          },
          "&:-webkit-autofill": {
            transitionDelay: "9999s",
            transitionProperty: "background-color, color",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: color.input,
          [`&.${inputLabelClasses.error}:before`]: {
            borderColor: color.border,
          },
          [`&.${inputLabelClasses.error}:after`]: {
            borderColor: color.border,
          },
          [`&.${inputLabelClasses.focused}:after`]: {
            transform: "none",
            borderBottom: `1px solid ${color.border}`,
          },
        },
        input: {
          padding: "6px 12px 12px 12px !important",
        },
        underline: {
          [`&.${inputLabelClasses.focused}`]: {
            borderColor: "transparent",
            transition: "none",
          },
          "&:before": {
            borderColor: color.border,
            transition: "none",
          },
          "&:after": {
            borderColor: color.border,
            transition: "none",
          },
          [`&:hover:not(.${inputLabelClasses.disabled}):before`]: {
            borderColor: color.border,
            borderBottom: `1px solid ${color.border}`,
            transition: "none",
          },
          [`&:hover:not(.${inputLabelClasses.disabled}, .${inputLabelClasses.error}):before`]:
            {
              borderColor: color.border,
              borderBottom: `1px solid ${color.border}`,
              transition: "none",
            },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          textAlign: "left",
          color: theme.palette.text.medium,
          "&:focus": { backgroundColor: "transparent" },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          left: "10px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: "6px 12px",
          "& fieldset": {
            border: `1px solid ${color.border} !important`,
          },
          "&:hover fieldset": {
            border: `1px solid ${color.border} !important`,
            transition: "none",
            outline: "none",
          },
          "&.Mui-focused:before": {
            border: `1px solid ${color.border} !important`,
            transition: "none",
          },
          "&.Mui-focused:after": {
            border: `1px solid ${color.border} !important`,
            transition: "none",
          },
        },
        input: {
          "&::placeholder": {
            opacity: 1,
            color: theme.palette.text.normal,
          },
        },
      },
    },
  };
}
