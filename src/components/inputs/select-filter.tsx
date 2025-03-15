import { Box, Stack, Typography, useTheme } from "@mui/material";
import { CSSProperties, useEffect, useRef, useState } from "react";
import RoundedBox from "../box/rounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type option = {
  label: string;
  value: number | string;
};

type props = {
  disabled?: boolean;
  value: any;
  loading?: boolean;
  options: option[];
  onChange: Function;
  placeholder?: string;
  borderBottom?: string;
  borderRadius?: string;
  fontSize?: string;
  top?: string;
  backgroundColor?: string;
  optionsWidth?: string;
  shadow?: string;
};

const SelectFilter = ({
  value,
  options,
  onChange,
  disabled = false,
  loading = false,
  placeholder = "",
  borderBottom = "none",
  borderRadius = "10px",
  fontSize = "16px",
  top = "55px",
  backgroundColor = "default",
  optionsWidth = "100%",
  shadow = "0 0 10px rgba(0,0,0,.2)",
}: props) => {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <RoundedBox
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor:
          backgroundColor === "default"
            ? theme.palette.background.paper
            : backgroundColor,
        position: "relative",
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.5 : 1,
      }}
      className="select-filter"
      innerRef={ref}
    >
      <Box
        sx={{
          flexDirection: "row",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor:
            backgroundColor === "default"
              ? theme.palette.background.paper
              : backgroundColor,
          justifyContent: "space-between",
          cursor: "pointer",
          padding: "0px 15px",
          overflow: "hidden",
          borderBottom: borderBottom,
          borderRadius: borderRadius,
          pointerEvents: loading ? "none" : "auto",
        }}
        onClick={handleClick}
      >
        <Stack direction={"row"} width={"calc(100% - 32px)"}>
          <Typography
            fontSize={fontSize}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            color={theme.palette.text.strong}
          >
            {options.filter((option) => option.value === value)[0]
              ? options.filter((option) => option.value === value)[0].label
              : placeholder}
          </Typography>
        </Stack>
        <KeyboardArrowDownIcon />
      </Box>
      {open && (
        <RoundedBox
          sx={{
            flexDirection: "column",
            position: "absolute",
            top: top,
            left: "0px",
            padding: "10px",
            backgroundColor:
              backgroundColor === "default"
                ? theme.palette.background.paper
                : backgroundColor,
            width: optionsWidth,
            boxShadow: shadow,
            maxHeight: "400px",
            overflow: "hidden",
            overflowY: "auto",
            zIndex: 100,
          }}
        >
          {options.map((option, index) => (
            <Stack
              key={option.label}
              sx={{
                padding: "10px 10px",
                width: "100%",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor:
                    value === option.value
                      ? theme.palette.primary.main
                      : theme.palette.primary.light,
                },
                borderTopLeftRadius: index === 0 ? '8px' : '0px',
                borderTopRightRadius: index === 0 ? '8px' : '0px',
                borderBottomLeftRadius: index === options.length - 1 ? '8px' : '0px',
                borderBottomRightRadius: index === options.length - 1 ? '8px' : '0px',
                backgroundColor:
                  value === option.value
                    ? theme.palette.primary.light
                    : "transparent",
              }}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              <Typography
                fontSize={fontSize}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                color={
                  value === option.value
                    ? theme.palette.common.white
                    : theme.palette.text.strong
                }
              >
                {option.label}
              </Typography>
            </Stack>
          ))}
        </RoundedBox>
      )}
    </RoundedBox>
  );
};

export default SelectFilter;
