import { Stack, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import React, { ReactElement } from "react";

type props = {
  children: ReactElement;
};

const SignInLayout = ({ children }: props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          width: "50%",
          height: "100%",
          display: isSmallScreen ? "none" : "flex",
          backgroundColor: theme.palette.background.paper,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack sx={{ height: '280px' }}>
          <Image src="/images/lock2.png" alt="Lock" width={280} height={280} />
        </Stack>
      </Stack>
      <Stack
        sx={{
          width: isSmallScreen ? "100%" : "50%",
          height: "100%",
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default SignInLayout;
