import { Stack, useTheme } from "@mui/material";
import React, { ReactElement } from "react";
import { ThemeToggle } from "src/components/buttons/theme-toggle";
import { useProtectedRoute } from "src/hooks/useProtectedRoute";
import { signOut } from "next-auth/react";
import SignOut from "src/components/buttons/signout";
import { useRouter } from "next/router";
import { paths } from "src/router/paths";

type props = {
  children: ReactElement;
};

const FullLayout = ({ children }: props) => {
  const theme = useTheme();
  const { status } = useProtectedRoute();
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push(paths.signin);
  };
  return (
    <Stack
      sx={{
        width: "100dvw",
        height: "100dvh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Stack
        sx={{
          width: "100%",
          height: "45px",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "10px",
        }}
      >
        {status === "authenticated" && router.pathname !== paths.signin && (
          <Stack sx={{ height: "100%", marginRight: "20px" }}>
            <SignOut onClick={handleSignOut} />
          </Stack>
        )}
        <ThemeToggle />
      </Stack>
      <Stack
        sx={{
          width: "100%",
          height: "calc(100% - 45px)",
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default FullLayout;
