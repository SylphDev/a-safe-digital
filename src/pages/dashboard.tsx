import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import FullLayout from "src/layouts/fullLayout";
import axios from "axios";
import { Stack, Typography, useTheme } from "@mui/material";
import { useProtectedRoute } from "src/hooks/useProtectedRoute";
import { VisibilityState } from "@tanstack/table-core";
import { useColumns } from "src/hooks/useColumns";
import TableComponent from "src/components/table";
import { useMediaQuery } from "@mui/system";
import CustomLineGraph from "src/components/graphs/line";
import CustomBarGraph from "src/components/graphs/bar";
import CustomSemiCircularGraph from "src/components/graphs/semi-circular";

interface UserData {
  id: number;
  name: string;
  email: string;
  age: number;
  country: string;
}

export default function Dashboard() {
  const theme = useTheme();
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
  const [users, setUsers] = useState<UserData[]>([]);
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
  const [totalPages, setTotalPages] = useState(1);
  const userColumns = useColumns().columns;
  const [columns, setColumns] = useState(userColumns);
  const [visibility, setVisibility] =
    useState<VisibilityState>(defaultVisibility);

  useEffect(() => {
    const fetchAgeDistribution = async () => {
      const res = await axios.get("/api/age-distribution");
      setAgeDistribution(res.data);
    };
    fetchAgeDistribution();
  }, []);
  useEffect(() => {
    const fetchUsersByCountry = async () => {
      const res = await axios.get("/api/users-by-country");
      setUsersByCountry(res.data);
    };
    fetchUsersByCountry();
  }, []);
  useEffect(() => {
    const fetchPremiumDistribution = async () => {
      const res = await axios.get("/api/premium-users");
      setPremiumDistribution(res.data);
    };
    fetchPremiumDistribution();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`/api/users?page=${page}&limit=10`);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    };
    fetchUsers();
  }, [page]);

  useEffect(() => {
    setVisibility(defaultVisibility);
  }, [isTablet, isSmallScreen]);

  return (
    <FullLayout>
      <Stack>
        <Typography
          variant="h3"
          color={theme.palette.text.strong}
          sx={{ marginBottom: "10px" }}
        >
          Age Distribution of your Users
        </Typography>
        <Stack sx={{ width: "100%", marginBottom: "40px" }}>
          <CustomLineGraph
            data={ageDistribution}
            tooltipLabelCallback={(tooltipItem) =>
              `Users aged ${tooltipItem.label}: ${tooltipItem.raw}`
            }
          />
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
          <Stack
            sx={{
              width: isTablet ? "47%" : "100%",
              marginBottom: isTablet ? "0px" : "20px",
            }}
          >
            <Typography variant="h3" color={theme.palette.text.strong}>
              Country Distribution of your Users
            </Typography>
            <Stack sx={{ width: "100%", marginBottom: "20px" }}>
              <CustomBarGraph
                data={usersByCountry}
                tooltipLabelCallback={(tooltipItem) =>
                  `Users living in ${tooltipItem.label}: ${tooltipItem.raw}`
                }
              />
            </Stack>
          </Stack>
          <Stack sx={{ width: isTablet ? "47%" : "100%" }}>
            <Typography variant="h3" color={theme.palette.text.strong}>
              Premium Distribution of your Users
            </Typography>
            <Stack sx={{ width: "100%", marginBottom: "20px" }}>
              <CustomSemiCircularGraph
                data={premiumDistribution}
                tooltipLabelCallback={(tooltipItem) =>
                  `${tooltipItem.label} users: ${tooltipItem.raw}`
                }
              />
            </Stack>
          </Stack>
        </Stack>
        <Typography
          variant="h3"
          color={theme.palette.text.strong}
          sx={{ marginBottom: "10px" }}
        >
          Users
        </Typography>
        <Stack sx={{ width: "100%", marginBottom: "20px" }}>
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
}

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
