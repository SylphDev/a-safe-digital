import { Box, Typography, useTheme } from "@mui/material";

type props = {
  text: string | number;
  border?: boolean;
  align?: string;
  minWidth?: string | number;
  maxWidth?: string | number;
  width?: string | number;
  weight?: number;
  size?: string;
};

const Cell = ({
  text,
  border = true,
  width = "100%",
  maxWidth = "none",
  minWidth = "auto",
  align = "center",
  weight = 400,
  size = "12px",
}: props) => {
  const theme = useTheme();
  return (
    <Box
      width={"100%"}
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        textAlign: align,
        width: width,
        minWidth: minWidth,
        maxWidth: maxWidth,
        padding: "9px",
        borderRight: border
          ? `1px solid ${theme.palette.background.paper}`
          : "none",
      }}
    >
      <Typography
        variant="caption"
        fontSize={size}
        color={theme.palette.text.medium}
        fontWeight={weight}
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Cell;
