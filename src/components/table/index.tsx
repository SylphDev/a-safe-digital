import { Stack, Theme, Typography, useTheme } from '@mui/material';
import {
  Row,
  RowData,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Dispatch, Fragment, SetStateAction } from 'react';
import '@tanstack/react-table';
import Pagination from './pagination';
import RoundedBox from '../box/rounded';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    show: boolean;
  }
}

type props = {
  columns: any[];
  data: any[];
  canExpand: (row: Row<any>) => boolean;
  renderSubComponent: any;
  visibility: VisibilityState;
  onChangeVisibility: Dispatch<SetStateAction<VisibilityState>>;
  page: number;
  totalPages: number;
  onChangePage: any;
  type?: 'primary' | 'secondary';
  outsideTheme?: Theme;
  id?: string;
};

const TableComponent = ({
  columns,
  data,
  canExpand,
  renderSubComponent,
  visibility,
  onChangeVisibility,
  page,
  totalPages,
  onChangePage,
  type = 'primary',
  outsideTheme,
  id = 'table',
}: props) => {
  const theme = outsideTheme ? outsideTheme : useTheme();
  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: canExpand,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      columnVisibility: visibility,
    },
    onColumnVisibilityChange: onChangeVisibility,
  });
  return (
    <RoundedBox
      sx={{
        width: '100%',
      }}
    >
      <RoundedBox
        sx={{
          width: '100%',
          overflow: 'hidden',
          overflowX: 'auto',
          overflowY: 'auto',
          boxShadow: '0 0 10px rgba(0, 0, 0, .05);',
        }}
      >
        {columns.length > 0 && data.length > 0 && (
          <table style={{ width: '100%' }} id={id}>
            <thead
              style={{
                backgroundColor:
                  type === 'primary'
                    ? theme.palette.primary.dark
                    : theme.palette.background.default,
              }}
            >
              {table.getHeaderGroups().map((headerGroup: any) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header: any) => {
                    return (
                      <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody style={{ backgroundColor: theme.palette.background.paper }}>
              {table.getRowModel().rows.map((row: any, tableIndex: number) => (
                <Fragment key={row.id}>
                  <tr
                    style={{
                      borderBottom:
                        tableIndex !== table.getRowModel().rows.length - 1
                          ? `1px solid ${theme.palette.background.default}`
                          : 'none',
                    }}
                  >
                    {row.getVisibleCells().map((cell: any) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                  {row.getIsExpanded() && (
                    <tr>
                      <td colSpan={row.getVisibleCells().length}>{renderSubComponent(row)}</td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
        {columns.length > 0 && data.length === 0 && (
          <>
            <table style={{ width: '100%' }}>
              <thead style={{ backgroundColor: theme.palette.background.default }}>
                {table.getHeaderGroups().map((headerGroup: any) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header: any) => {
                      return (
                        <th key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
            </table>
            <Stack
              sx={{
                backgroundColor: theme.palette.background.paper,
                textAlign: 'center',
                padding: '20px',
              }}
            >
              <Typography variant="subtitle2" color={theme.palette.text.normal}>
                {'Theres no data for display'}
              </Typography>
            </Stack>
          </>
        )}
      </RoundedBox>
      {columns.length > 0 && data.length > 0 && totalPages > 1 && (
        <Pagination page={page} onChangePage={onChangePage} totalPages={totalPages} />
      )}
    </RoundedBox>
  );
};

export default TableComponent;