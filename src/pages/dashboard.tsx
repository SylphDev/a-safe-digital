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
  };
  const { session } = useProtectedRoute();
  const [users, setUsers] = useState<UserData[]>([]);
  const [ageDistribution, setAgeDistribution] = useState<
    Record<number, number>
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
    const fetchUsers = async () => {
      const res = await axios.get(`/api/users?page=${page}&limit=10`);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    };
    fetchUsers();
  }, [page]);
  useEffect(() => {
    console.log({ ageDistribution });
  }, [ageDistribution]);

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
        <Stack sx={{ width: "100%", marginBottom: "20px" }}>
          <CustomLineGraph
            data={ageDistribution}
            tooltipLabelCallback={(tooltipItem) =>
              `Users aged ${tooltipItem.label}: ${tooltipItem.raw}`
            }
          />
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

// Protect this page from unauthenticated users
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
