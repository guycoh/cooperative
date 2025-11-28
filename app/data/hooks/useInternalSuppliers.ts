//data/hooks/useInternalSuppliers.ts

"use client"

import { useState, useEffect, useCallback } from "react";

export type InternalSupplier = {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  notes?: string;
  is_local_supplier: boolean;
  separate_delivery: boolean;
};








/** טיפוסי API Responses */
type SupplierListResponse = {
  data: InternalSupplier[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
  error?: string;
};

type SupplierItemResponse = {
  data: InternalSupplier;
  error?: string;
};

type CreateUpdateResponse = {
  data: InternalSupplier;
  error?: string;
};

type DeleteResponse = {
  success: boolean;
  error?: string;
};

export function useInternalSuppliers(initialLimit = 25) {
  const [data, setData] = useState<InternalSupplier[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** --- Fetch List --- */
  const fetchData = useCallback(
    async (p = page, l = limit) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/internal_suppliers?page=${p}&limit=${l}`);
        const json: SupplierListResponse = await res.json();

        if (!res.ok) throw new Error(json.error || "Failed to fetch suppliers");

        setData(json.data);
        setTotal(json.total);
        setTotalPages(json.totalPages);
        setPage(json.page);
        setLimit(json.limit);
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [page, limit]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const goToPage = (p: number) => {
    if (p < 1) p = 1;
    else if (p > totalPages) p = totalPages;
    fetchData(p, limit);
  };

  /** --- Get One Supplier --- */
  const getOne = async (id: string): Promise<SupplierItemResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/internal_suppliers/${id}`);
      const json: SupplierItemResponse = await res.json();

      if (!res.ok) throw new Error(json.error || "Failed to fetch supplier");

      return json;
    } catch (err: unknown) {
      const e = err instanceof Error ? err : new Error("Unknown error");
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /** --- Create Supplier --- */
  const create = async (
    supplier: Omit<InternalSupplier, "id">
  ): Promise<CreateUpdateResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/internal_suppliers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supplier),
      });

      const json: CreateUpdateResponse = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to create supplier");

      fetchData();
      return json;
    } catch (err: unknown) {
      const e = err instanceof Error ? err : new Error("Unknown error");
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /** --- Update Supplier --- */
  const update = async (
    id: string,
    supplier: Partial<InternalSupplier>
  ): Promise<CreateUpdateResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/internal_suppliers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supplier),
      });

      const json: CreateUpdateResponse = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update supplier");

      fetchData();
      return json;
    } catch (err: unknown) {
      const e = err instanceof Error ? err : new Error("Unknown error");
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /** --- Delete Supplier --- */
  const remove = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/internal_suppliers/${id}`, {
        method: "DELETE",
      });

      const json: DeleteResponse = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to delete supplier");

      fetchData();
      return json.success;
    } catch (err: unknown) {
      const e = err instanceof Error ? err : new Error("Unknown error");
      setError(e.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => fetchData(page, limit);

  return {
    data,
    page,
    limit,
    total,
    totalPages,
    loading,
    error,
    goToPage,
    getOne,
    create,
    update,
    remove,
    refresh,
  };
}
