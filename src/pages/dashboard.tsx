import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useState, useEffect, Suspense } from "react";
import FullLayout from "src/layouts/fullLayout";
import axios from "axios";
import { Stack, Typography, useTheme } from "@mui/material";
import { VisibilityState } from "@tanstack/table-core";
import { useColumns } from "src/hooks/useColumns";
import { useMediaQuery } from "@mui/system";
import { useRouter } from "next/router";
import { paths } from "src/router/paths";
import RoundedBox from "src/components/box/rounded";
import TextFilter from "src/components/inputs/text-filter";
import SelectFilter from "src/components/inputs/select-filter";
import { UserData } from "src/data/mockUser";
import { usePaginatedData } from "src/hooks/usePaginatedData";
import dynamic from "next/dynamic";
import LoadingIcon from "src/components/loading-icon";

const CustomLineGraph = dynamic(() => import("src/components/graphs/line"), {
  ssr: false,
});
const CustomBarGraph = dynamic(() => import("src/components/graphs/bar"), {
  ssr: false,
});
const CustomSemiCircularGraph = dynamic(
  () => import("src/components/graphs/semi-circular"),
  { ssr: false }
);
const TableComponent = dynamic(() => import("src/components/table"), {
  ssr: false,
});

const Dashboard = () => {
  const theme = useTheme();
  const router = useRouter();
  const isTablet = useMediaQuery(theme.breakpoints.up("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const defaultVisibility: VisibilityState = {
    id: true,
    name: true,
    email: true,
    age: isSmallScreen,
    country: isTablet,
    premium: isTablet,
  };
  const [nameEmail, setNameEmail] = useState<string>("");
  const [loadingGraphs, setLoadingGraphs] = useState<boolean>(false);
  const [premium, setPremium] = useState<"premium" | "free" | "all">("all");
  const [ageDistribution, setAgeDistribution] = useState<
    Record<number, number>
  >({});
  const [usersByCountry, setUsersByCountry] = useState<Record<string, number>>(
    {}
  );
  const [premiumDistribution, setPremiumDistribution] = useState<
    Record<string, number>
  >({});
  const [page, setPage] = useState(0);
  const userColumns = useColumns().columns;
  const [columns, setColumns] = useState(userColumns);
  const [visibility, setVisibility] =
    useState<VisibilityState>(defaultVisibility);
  const onChangePremium = (e: any) => {
    setPage(0);
    setPremium(e);
  };
  const onChangeNameEmail = (e: any) => {
    setPage(0);
    setNameEmail(e);
  };
  const {
    data: users,
    loading,
    totalPages,
  } = usePaginatedData<UserData>("/api/users", {
    page,
    limit: 10,
    search: nameEmail,
    premium: premium !== "all" ? premium === "premium" : undefined,
  });
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoadingGraphs(true);
      try {
        const [ageRes, countryRes, premiumRes] = await Promise.all([
          axios.get("/api/age-distribution"),
          axios.get("/api/users-by-country"),
          axios.get("/api/premium-users"),
        ]);
        setAgeDistribution(ageRes.data);
        setUsersByCountry(countryRes.data);
        setPremiumDistribution(premiumRes.data);
      } catch (error) {
        router.push(paths.error);
      }
      setLoadingGraphs(false);
    };
    fetchDashboardData();
  }, []);

  useEffect(() => {
    setVisibility(defaultVisibility);
  }, [isTablet, isSmallScreen]);

  return (
    <FullLayout>
      <Stack>
        <Stack
          sx={{
            width: "100%",
            marginBottom: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.palette.background.paper,
            padding: "20px",
          }}
        >
          <Typography
            variant="h3"
            color={theme.palette.text.strong}
            sx={{ marginBottom: "10px" }}
          >
            Age Distribution of your Users
          </Typography>
          <Stack
            sx={{
              width: "100%",
              height: "300px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!loadingGraphs && (
              <Suspense
                fallback={
                  <LoadingIcon
                    size={8}
                    border={0.9}
                    firstColor={theme.palette.primary.light}
                    secondColor={theme.palette.primary.light}
                  />
                }
              >
                <CustomLineGraph
                  data={ageDistribution}
                  tooltipLabelCallback={(tooltipItem) =>
                    `Users aged ${tooltipItem.label}: ${tooltipItem.raw}`
                  }
                />
              </Suspense>
            )}
            {loadingGraphs && (
              <LoadingIcon
                size={8}
                border={0.9}
                firstColor={theme.palette.primary.light}
                secondColor={theme.palette.primary.light}
              />
            )}
          </Stack>
        </Stack>
        <Stack
          sx={{
            width: "100%",
            marginBottom: "20px",
            flexDirection: isTablet ? "row" : "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <RoundedBox
            sx={{
              width: isTablet ? "48.5%" : "100%",
              marginBottom: isTablet ? "0px" : "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.palette.background.paper,
              padding: "20px",
            }}
          >
            <Typography variant="h3" color={theme.palette.text.strong}>
              Country Distribution of your Users
            </Typography>
            <Stack
              sx={{
                width: "100%",
                height: "300px",
                marginBottom: "20px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!loadingGraphs && (
                <Suspense
                  fallback={
                    <LoadingIcon
                      size={8}
                      border={0.9}
                      firstColor={theme.palette.primary.light}
                      secondColor={theme.palette.primary.light}
                    />
                  }
                >
                  <CustomBarGraph
                    data={usersByCountry}
                    tooltipLabelCallback={(tooltipItem) =>
                      `Users living in ${tooltipItem.label}: ${tooltipItem.raw}`
                    }
                  />
                </Suspense>
              )}
              {loadingGraphs && (
                <LoadingIcon
                  size={8}
                  border={0.9}
                  firstColor={theme.palette.primary.light}
                  secondColor={theme.palette.primary.light}
                />
              )}
            </Stack>
          </RoundedBox>
          <RoundedBox
            sx={{
              width: isTablet ? "48.5%" : "100%",
              marginBottom: isTablet ? "0px" : "20px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: theme.palette.background.paper,
              padding: "20px",
            }}
          >
            <Typography variant="h3" color={theme.palette.text.strong}>
              Premium Distribution of your Users
            </Typography>
            <Stack
              sx={{
                width: "100%",
                height: "300px",
                marginBottom: "20px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!loadingGraphs && (
                <Suspense
                  fallback={
                    <LoadingIcon
                      size={8}
                      border={0.9}
                      firstColor={theme.palette.primary.light}
                      secondColor={theme.palette.primary.light}
                    />
                  }
                >
                  <CustomSemiCircularGraph
                    data={premiumDistribution}
                    tooltipLabelCallback={(tooltipItem) =>
                      `${tooltipItem.label} users: ${tooltipItem.raw}`
                    }
                  />
                </Suspense>
              )}
              {loadingGraphs && (
                <LoadingIcon
                  size={8}
                  border={0.9}
                  firstColor={theme.palette.primary.light}
                  secondColor={theme.palette.primary.light}
                />
              )}
            </Stack>
          </RoundedBox>
        </Stack>
        <Typography
          variant="h3"
          color={theme.palette.text.strong}
          sx={{ marginBottom: "10px" }}
        >
          Users
        </Typography>
        <Stack sx={{ width: "100%" }}>
          <Stack
            sx={{
              flexDirection: !isSmallScreen ? "column" : "row",
              alignItems: "center",
              justifyContent: "flex-start",
              marginBottom: "10px",
            }}
          >
            <Stack
              sx={{
                width: !isSmallScreen ? "100%" : "260px",
                height: "45px",
                marginBottom: !isSmallScreen ? "10px" : "0px",
              }}
            >
              <TextFilter
                name={"email-name"}
                placeholder={"Name or email"}
                value={nameEmail}
                onChange={onChangeNameEmail}
                loading={loading}
              />
            </Stack>
            <Stack
              sx={{
                width: !isSmallScreen ? "100%" : "160px",
                height: "45px",
                marginLeft: !isSmallScreen ? "0px" : "15px",
              }}
            >
              <SelectFilter
                value={premium}
                loading={loading}
                onChange={onChangePremium}
                fontSize="14px"
                options={[
                  {
                    value: "all",
                    label: "Suscription",
                  },
                  {
                    value: "free",
                    label: "Free",
                  },
                  {
                    value: "premium",
                    label: "Premium",
                  },
                ]}
              />
            </Stack>
          </Stack>
          <TableComponent
            columns={columns}
            data={users}
            renderSubComponent={() => {}}
            visibility={visibility}
            onChangeVisibility={setVisibility}
            canExpand={() => false}
            page={page}
            totalPages={totalPages}
            onChangePage={setPage}
          />
        </Stack>
      </Stack>
    </FullLayout>
  );
};

export default Dashboard;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
