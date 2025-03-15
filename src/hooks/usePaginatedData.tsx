import { useState, useEffect } from "react";

type Params = {
  page?: number;
  limit?: number;
  search?: string;
  premium?: boolean;
};

export function usePaginatedData<T>(
  endpoint: string,
  { page = 0, limit = 10, search = "", premium }: Params
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(search ? { search } : {}),
          ...(premium !== undefined ? { premium: premium.toString() } : {}),
        });

        const response = await fetch(`${endpoint}?${query.toString()}`);
        const result = await response.json();

        setData(result.users);
        setTotalPages(result.totalPages);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, page, limit, search, premium]);

  return { data, loading, error, totalPages, setLoading };
}
