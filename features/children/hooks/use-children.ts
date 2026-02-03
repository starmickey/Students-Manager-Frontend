"use client";

import { useEffect, useState } from "react";
import { getChildren, type Child } from "@/lib/api/children";
import type { PaginatedResponse } from "@/lib/api/shared/pagination.types";
import useLoadingTime from "@/lib/hooks/use-loading-time";

interface Params {
  page: number;
  pageSize: number;
  sortBy: string;
  order: "asc" | "desc";
}

export function useChildren({ page, pageSize, sortBy, order }: Params) {
  const [data, setData] = useState<Child[]>([]);
  const [pagination, setPagination] = useState<
    PaginatedResponse<Child>["pagination"] | null
  >(null);
  const { loading, setLoading, loadingTime } = useLoadingTime();
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setError(null);

    getChildren({ page, pageSize, sortBy, order })
      .then((res) => {
        setData(res.data);
        setPagination(res.pagination);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page, pageSize, sortBy, order, refreshKey]);

  const refresh = () => {
    setRefreshKey((key) => key + 1);
  };

  return { data, pagination, loading, error, loadingTime, refresh };
}
