import { Stack, Typography, useTheme } from "@mui/material";
import React, { ReactElement } from "react";
import { ThemeToggle } from "src/components/buttons/theme-toggle";
import { useProtectedRoute } from "src/hooks/useProtectedRoute";
import { signOut } from "next-auth/react";
import SignOut from "src/components/buttons/signout";
import { useRouter } from "next/router";
import { paths } from "src/router/paths";
import { useMediaQuery } from "@mui/system";

type props = {
  fullHeight?: boolean;
  fullPadding?: boolean;
  children: ReactElement;
};

const FullLayout = ({
  children,
  fullHeight = false,
  fullPadding = false,
}: props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.up("sm"));
  const { status, session } = useProtectedRoute();
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push(paths.signin);
  };
  return (
    <Stack
      sx={{
        width: "100dvw",
        minHeight: "100dvh",
        height: fullHeight ? "100dvh" : "auto",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default,
        padding: fullPadding
          ? "0px"
          : `${isSmallScreen ? "10px" : isTablet ? "20px" : "30px"}`,
      }}
    >
      <Stack
        sx={{
          width: "100%",
          height: "45px",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: fullPadding
            ? "0px"
            : `${isSmallScreen ? "10px" : isTablet ? "20px" : "30px"}`,
          padding: fullPadding ? "10px 10px" : "0px 0px 10px 0px",
        }}
      >
        <Stack>
          {status === "authenticated" &&
            router.pathname !== "/" &&
            session &&
            session.user && (
              <Typography variant="h6">Hello, {session.user.name}!</Typography>
            )}
        </Stack>
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {status === "authenticated" && router.pathname !== "/" && (
            <Stack sx={{ height: "100%", marginRight: "20px", width: '65px' }}>
              <SignOut onClick={handleSignOut} status={status} />
            </Stack>
          )}
          <ThemeToggle />
        </Stack>
      </Stack>
      <Stack
        sx={{
          width: "100%",
          height: "-webkit-fill-available",
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default FullLayout;
