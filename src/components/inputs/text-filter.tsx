import { Stack, TextField, useTheme } from "@mui/material";
import { ChangeEvent } from "react";
import RoundedBox from "../box/rounded";

type props = {
  name: string;
  placeholder: string;
  value: string;
  onChange: Function;
  size?: number;
  maxLength?: boolean;
  type?: "text" | "number";
  loading: boolean;
};

const TextFilter = ({
  name,
  placeholder,
  value,
  onChange,
  loading,
  maxLength = true,
  type = "text",
}: props) => {
  const theme = useTheme();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (typeof event.target.value === "string" && type === "text") {
      if (maxLength) {
        if (event.target.value.length <= 8) {
          onChange(event.target.value);
        }
      } else {
        if (event.target.value.length <= 50) {
          onChange(event.target.value);
        }
      }
    } else {
      if (maxLength) {
        if (parseFloat(event.target.value) <= 9999999) {
          onChange(event.target.value);
        }
      } else {
        if (parseFloat(event.target.value) <= 999999999999) {
          onChange(event.target.value);
        }
      }
    }
  };

  return (
    <RoundedBox
      sx={{
        height: "100%",
        width: "100%",
        padding: "10px",
        backgroundColor: theme.palette.background.paper,
        opacity: loading ? "0.5" : "1",
      }}
    >
      <Stack
        key={name}
        alignItems={"center"}
        justifyContent={"flex-start"}
        sx={{
          height: "100%",
          width: "100%",
        }}
        direction={"row"}
      >
        <TextField
          variant="standard"
          placeholder={placeholder}
          id={name}
          value={value}
          onChange={(e) => handleInputChange(e)}
          sx={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            border: "none",
            width: "100%",
            "& .MuiInputBase-input": {
              padding: "6px !important",
            },
            "& .MuiInputBase-root:before": {
              borderBottom: "none !important",
            },
            "& .MuiInputBase-root:after": {
              borderBottom: "none !important",
            },
            "& .MuiInputBase-root:hover:not(.Mui-disabled):before": {
              borderBottom: "none !important",
            },
          }}
        />
      </Stack>
    </RoundedBox>
  );
};

export default TextFilter;
