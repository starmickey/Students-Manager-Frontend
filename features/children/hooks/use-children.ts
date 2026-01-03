"use client";

import { useEffect, useState } from "react";
import { http } from "@/lib/http/http-client";
import type { Child } from "@/lib/api/children";
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setError(null);

    http<PaginatedResponse<Child>>(
      `/children?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&order=${order}`,
      { method: "GET" }
    )
      .then((res) => {
        setData(res.data);
        setPagination(res.pagination);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page, pageSize, sortBy, order]);

  return { data, pagination, loading, error, loadingTime };
}
