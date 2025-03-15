import React, { RefObject } from "react";
import { SxProps } from "@mui/system";
import { Box } from "@mui/material";

type props = {
  sx?: SxProps;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  onClick?: VoidFunction;
  innerRef?: RefObject<HTMLDivElement | null> | null;
};

const RoundedBox = ({
  sx,
  children,
  className = "",
  id = "",
  onClick = () => {},
  innerRef = null,
}: props) => {
  return (
    <Box
      ref={innerRef}
      sx={{
        ...sx,
        borderRadius: "10px",
      }}
      onClick={onClick}
      className={className}
      id={id}
    >
      {children}
    </Box>
  );
};

export default RoundedBox;
