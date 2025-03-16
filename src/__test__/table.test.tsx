import { render, screen } from "@testing-library/react";
import { ColumnDef } from "@tanstack/react-table";
import TableComponent from "src/components/table";

describe("TableComponent", () => {
  test("Renders a table with correct data", () => {
    const mockData = [
      { id: 1, name: "Alice", email: "alice@example.com" },
      { id: 2, name: "Bob", email: "bob@example.com" },
    ];
    const columns: ColumnDef<{ id: number; name: string; email: string }>[] = [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => info.getValue(),
      },
    ];
    render(
      <TableComponent
        columns={columns}
        data={mockData}
        canExpand={() => false}
        renderSubComponent={() => null}
        visibility={{ id: true, name: true, email: true }}
        onChangePage={() => {}}
        page={0}
        totalPages={1}
        onChangeVisibility={() => {}}
      />
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
  });

  test("Displays a 'no data' message when data is empty", () => {
    const columns: ColumnDef<{ id: number; name: string; email: string }>[] = [
      { accessorKey: "name", header: "Name", cell: (info) => info.getValue() },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => info.getValue(),
      },
    ];
    render(
      <TableComponent
        columns={columns}
        data={[]}
        canExpand={() => false}
        renderSubComponent={() => null}
        visibility={{ id: true, name: true, email: true }}
        onChangePage={() => {}}
        page={0}
        totalPages={1}
        onChangeVisibility={() => {}}
      />
    );
    expect(screen.getByText("Theres no data for display")).toBeInTheDocument();
  });

  test("Updates column visibility correctly", async () => {
    const columns: ColumnDef<{ id: number; name: string; email: string }>[] = [
      { accessorKey: "name", header: "Name", cell: (info) => info.getValue() },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => info.getValue(),
      },
    ];
    const onChangeVisibility = jest.fn();
    render(
      <TableComponent
        columns={columns}
        data={[{ id: 1, name: "Alice", email: "alice@example.com" }]}
        canExpand={() => false}
        renderSubComponent={() => null}
        visibility={{ id: true, name: true, email: false }}
        onChangePage={() => {}}
        page={0}
        totalPages={1}
        onChangeVisibility={onChangeVisibility}
      />
    );
    expect(screen.queryByText("alice@example.com")).not.toBeInTheDocument();
  });
});
