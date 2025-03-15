import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import FullLayout from "src/layouts/fullLayout";
import axios from "axios";
import { Stack, useTheme } from "@mui/material";
import { useProtectedRoute } from "src/hooks/useProtectedRoute";
import { VisibilityState } from "@tanstack/table-core";
import { useColumns } from "src/hooks/useColumns";
import TableComponent from "src/components/table";
import { useMediaQuery } from "@mui/system";

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
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const userColumns = useColumns().columns;
  const [columns, setColumns] = useState(userColumns);
  const [visibility, setVisibility] =
    useState<VisibilityState>(defaultVisibility);

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
        <h1>Welcome to your Dashboard</h1>
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
