import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import LoadingIcon from "../loading-icon";

type props = {
  onClick: Function;
  status: "authenticated" | "loading" | "unauthenticated";
};

const SignOut = ({ onClick, status }: props) => {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={() => onClick()}
    >
      {status === "authenticated" && (
        <Typography
          sx={{
            "&:hover": { color: theme.palette.primary.main },
            color: theme.palette.text.strong,
          }}
        >
          Sign Out
        </Typography>
      )}
      {status === "loading" && (
        <Typography
          sx={{
            "&:hover": { color: theme.palette.primary.main },
            color: theme.palette.text.strong,
          }}
        >
          <LoadingIcon
            size={1.5}
            border={0.2}
            firstColor={theme.palette.primary.main}
            secondColor={theme.palette.primary.main}
          />
        </Typography>
      )}
    </Stack>
  );
};

export default SignOut;
