//data/hooks/useExternalSuppliers

"use client"

import { useState, useEffect, useCallback } from "react";

export type ExternalSupplier = {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  delivery_day?: string;
  delivery_from?: string;
  delivery_to?: string;
};

/** טיפוס לתשובות API */
type SupplierListResponse = {
  data: ExternalSupplier[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
  error?: string;
};

type SupplierItemResponse = {
  data: ExternalSupplier;
  error?: string;
};

type CreateUpdateResponse = {
  data: ExternalSupplier;
  error?: string;
};

type DeleteResponse = {
  success: boolean;
  error?: string;
};

/** 🛡 פונקציית עזר חסינת ANY */
const handleError = (err: unknown): string => {
  if (err instanceof Error) return err.message;
  return "Unknown error";
};

export function useExternalSuppliers(initialLimit = 25) {
  const [data, setData] = useState<ExternalSupplier[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** --- Fetch list --- */
  const fetchData = useCallback(
    async (p = page, l = limit) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/external_suppliers?page=${p}&limit=${l}`);
        const json: SupplierListResponse = await res.json();

        if (!res.ok) throw new Error(json.error || "Failed to fetch suppliers");

        setData(json.data);
        setTotal(json.total);
        setTotalPages(json.totalPages);
        setPage(json.page);
        setLimit(json.limit);
      } catch (err: unknown) {
        setError(handleError(err));
      } finally {
        setLoading(false);
      }
    },
    [page, limit]
  );

  /** load first page */
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
      const res = await fetch(`/api/external_suppliers/${id}`);
      const json: SupplierItemResponse = await res.json();

      if (!res.ok) throw new Error(json.error || "Failed to fetch supplier");

      return json;
    } catch (err: unknown) {
      setError(handleError(err));
      return null;
    } finally {
      setLoading(false);
    }
  };

  /** --- Create Supplier --- */
  const create = async (
    supplier: Omit<ExternalSupplier, "id">
  ): Promise<CreateUpdateResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/external_suppliers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supplier),
      });

      const json: CreateUpdateResponse = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to create supplier");

      fetchData();

      return json;
    } catch (err: unknown) {
      setError(handleError(err));
      return null;
    } finally {
      setLoading(false);
    }
  };

  /** --- Update Supplier --- */
  const update = async (
    id: string,
    supplier: Partial<ExternalSupplier>
  ): Promise<CreateUpdateResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/external_suppliers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supplier),
      });

      const json: CreateUpdateResponse = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update supplier");

      fetchData();

      return json;
    } catch (err: unknown) {
      setError(handleError(err));
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
      const res = await fetch(`/api/external_suppliers/${id}`, {
        method: "DELETE",
      });

      const json: DeleteResponse = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to delete supplier");

      fetchData();

      return json.success;
    } catch (err: unknown) {
      setError(handleError(err));
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
