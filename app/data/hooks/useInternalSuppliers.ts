"use client";

import { useState, useEffect, useCallback } from "react";

export type InternalSupplier = {
  id: string;
  name: string;
  address?: string;
  phone?: string;
};

export function useInternalSuppliers(initialLimit = 25) {
  const [data, setData] = useState<InternalSupplier[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (p = page, l = limit) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/internal_suppliers?page=${p}&limit=${l}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to fetch suppliers");
      setData(json.data);
      setTotal(json.total);
      setTotalPages(json.totalPages);
      setPage(json.page);
      setLimit(json.limit);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const goToPage = (p: number) => {
    if (p < 1) p = 1;
    else if (p > totalPages) p = totalPages;
    fetchData(p, limit);
  };

  const getOne = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/internal_suppliers/${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to fetch supplier");
      return json;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const create = async (supplier: Omit<InternalSupplier, "id">) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/internal_suppliers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supplier),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to create supplier");
      fetchData(); // רענון אחרי יצירה
      return json;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, supplier: Partial<InternalSupplier>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/internal_suppliers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supplier),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update supplier");
      fetchData(); // רענון אחרי עדכון
      return json;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/internal_suppliers/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to delete supplier");
      fetchData(); // רענון אחרי מחיקה
      return json.success;
    } catch (err: any) {
      setError(err.message);
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
