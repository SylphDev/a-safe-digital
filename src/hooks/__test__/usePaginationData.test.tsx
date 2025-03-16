import { renderHook, waitFor } from "@testing-library/react";
import { usePaginatedData } from "../usePaginatedData";

beforeEach(() => {
  jest.resetAllMocks();
});

test("fetches and paginates data", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({ users: [{ id: 1, name: "Alice" }], totalPages: 5 }),
    })
  ) as jest.Mock;

  const { result } = renderHook(() =>
    usePaginatedData("/api/users", { page: 1, limit: 10 })
  );

  await waitFor(() => expect(result.current.data).toHaveLength(1));

  expect(result.current.totalPages).toBe(5);
});

test("handles API errors correctly", async () => {
  global.fetch = jest.fn(() =>
    Promise.reject(new Error("Failed to fetch"))
  ) as jest.Mock;

  const { result } = renderHook(() =>
    usePaginatedData("/api/users", { page: 1, limit: 10 })
  );

  await waitFor(() =>
    expect(result.current.error).toBe("Failed to fetch data.")
  );

  expect(result.current.data).toEqual([]);
});

test("returns empty data when API has no users", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ users: [], totalPages: 1 }),
    })
  ) as jest.Mock;

  const { result } = renderHook(() =>
    usePaginatedData("/api/users", { page: 1, limit: 10 })
  );

  await waitFor(() => expect(result.current.data).toEqual([]));

  expect(result.current.totalPages).toBe(1);
});

test("does not refetch data when parameters remain the same", async () => {
  const fetchMock = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({ users: [{ id: 1, name: "Alice" }], totalPages: 5 }),
    })
  );

  global.fetch = fetchMock as jest.Mock;

  const { result, rerender } = renderHook(() =>
    usePaginatedData("/api/users", { page: 1, limit: 10 })
  );

  await waitFor(() => expect(result.current.data).toHaveLength(1));

  rerender();

  expect(fetchMock).toHaveBeenCalledTimes(1);
});
