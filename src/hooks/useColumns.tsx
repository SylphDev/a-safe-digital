import { useTheme } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import Cell from 'src/components/table/cell';
import TableHeader from 'src/components/table/table-header';
import { UserData } from 'src/data/mockUser';

export const useColumns = () => {
  const theme = useTheme();
  const columns: ColumnDef<UserData>[] = [
    {
      id: 'id',
      accessorFn: (row) => row.id,
      header: () => <TableHeader color={theme.palette.common.white} header={'Id'} />,
      cell: (info) => <Cell text={info.getValue() as string} maxWidth={75} />,
    },
    {
      id: 'name',
      accessorFn: (row) => row.name,
      header: () => <TableHeader color={theme.palette.common.white} header={'Name'} />,
      cell: (info) => <Cell text={info.getValue() as string} maxWidth={75} />,
    },
    {
      id: 'email',
      accessorFn: (row) => row.email,
      header: () => <TableHeader color={theme.palette.common.white} header={'Email'} />,
      cell: (info) => <Cell text={info.getValue() as string} maxWidth={75} />,
    },
    {
      id: 'age',
      accessorFn: (row) => row.age,
      header: () => <TableHeader color={theme.palette.common.white} header={'Age'} />,
      cell: (info) => <Cell text={info.getValue() as string} maxWidth={75} />,
    },
    {
      id: 'country',
      accessorFn: (row) => row.country,
      header: () => <TableHeader color={theme.palette.common.white} header={'Country'} />,
      cell: (info) => <Cell text={info.getValue() as string} maxWidth={75} />,
    },
  ];
  return { columns };
};
