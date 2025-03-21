import { Stack, Typography, useTheme } from "@mui/material";
import FullLayout from "src/layouts/fullLayout";
import SignInLayout from "src/layouts/signinLayout";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "src/context/FormContext";
import { FormUserInput } from "src/components/inputs/form-user";
import { FormPasswordInput } from "src/components/inputs/form-password";
import { useEffect, useState } from "react";
import LoadingButton from "src/components/buttons/loading";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { paths } from "src/router/paths";
import Head from "next/head";

const SignIn = () => {
  const theme = useTheme();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required"),
  });

  const getDefaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: getDefaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res?.error) {
      setError(res?.error);
      setLoading(false);
    }
    if (res) {
      if (res.ok) {
        router.push(paths.dashboard);
      }
    }
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.push(paths.dashboard);
    }
  }, [status, router]);

  return (
    <>
      <Head>
        <title>Sign In | AS Test</title>
        <meta
          name="description"
          content="Login to A-Safe Digital Test to access your dashboard."
        />
      </Head>
      <FullLayout fullHeight fullPadding>
        <SignInLayout>
          <Stack
            sx={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack
              sx={{
                width: "70%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: theme.palette.text.strong,
                  textAlign: "center",
                  marginBottom: "40px",
                }}
              >
                Welcome to A-Safe Technical Test
              </Typography>
              <FormProvider
                id={"login-form"}
                methods={methods}
                onSubmit={onSubmit}
                styles={{ width: "100%", height: "100%" }}
              >
                <Stack sx={{ width: "100%", marginBottom: "20px" }}>
                  <FormUserInput
                    name="email"
                    label={"Email"}
                    placeholder="user@example.com"
                  />
                </Stack>
                <Stack sx={{ width: "100%", marginBottom: "60px" }}>
                  <FormPasswordInput
                    autocomplete="current-password"
                    name="password"
                    label={"Password"}
                    showButton={true}
                    placeholder="password"
                  />
                </Stack>
                <LoadingButton
                  size="medium"
                  disableRipple
                  type="submit"
                  sx={{
                    width: "100%",
                    height: "45px",
                    fontWeight: 600,
                    pointerEvents: isSubmitting || loading ? "none" : "auto",
                    opacity: isSubmitting || loading ? "0.5" : "1",
                  }}
                  text={"Login"}
                  loading={isSubmitting || loading}
                  id={"login-button"}
                />
                <Stack
                  sx={{
                    height: "24px",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                    marginTop: "5px",
                  }}
                >
                  {error && (
                    <Typography
                      variant="caption"
                      color={theme.palette.error.main}
                    >
                      {error}
                    </Typography>
                  )}
                </Stack>
              </FormProvider>
            </Stack>
          </Stack>
        </SignInLayout>
      </FullLayout>
    </>
  );
};

export default SignIn;
