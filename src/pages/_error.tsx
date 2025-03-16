import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import FullLayout from "src/layouts/fullLayout";
import { signOut } from "next-auth/react";
import ErrorIcon from "@mui/icons-material/Error";
import { Typography, useTheme } from "@mui/material";
import LoadingButton from "src/components/buttons/loading";
import { paths } from "src/router/paths";

const ErrorPage: NextPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push(paths.signin);
  };
  return (
    <FullLayout fullHeight>
      <div style={{ textAlign: "center", padding: "50px" }}>
        <ErrorIcon fontSize="large" sx={{ color: theme.palette.text.strong }} />
        <Typography
          variant="h2"
          color={theme.palette.text.strong}
          sx={{ marginBottom: "20px" }}
        >
          Oops! Something went wrong.
        </Typography>
        <Typography
          variant="h4"
          color={theme.palette.text.strong}
          sx={{ marginBottom: "40px" }}
        >
          You will be redirected to the dashboard in 5 seconds.
        </Typography>
        <LoadingButton
          onClick={handleSignOut}
          text="Go to Login"
          loading={false}
          sx={{
            maxWidth: "300px",
          }}
        />
      </div>
    </FullLayout>
  );
};

export default ErrorPage;
