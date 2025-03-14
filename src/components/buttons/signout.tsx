import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";

type props = {
  onClick: Function;
};

const SignOut = ({ onClick }: props) => {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        cursor: "pointer",
      }}
      onClick={() => onClick()}
    >
      <Typography
        sx={{
          "&:hover": { color: theme.palette.primary.main },
          color: theme.palette.text.strong,
        }}
      >
        Sign Out
      </Typography>
    </Stack>
  );
};

export default SignOut;
