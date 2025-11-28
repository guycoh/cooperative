"use client"

import { useState, useEffect, useCallback } from "react";

export type ProfessionalCategory = {
  id: number;
  aaprofessional: string;
  link: string;
};

export function useProfessionalCategories() {
  const [categories, setCategories] = useState<ProfessionalCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ GET - Fetch all categories
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/professional_categories");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch categories");
      setCategories(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ POST - Add new category
  const addCategory = useCallback(async (category: { aaprofessional: string; link: string }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/professional_categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add category");
      setCategories(prev => [...prev, data]);
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ PUT - Update category
  const updateCategory = useCallback(async (category: ProfessionalCategory) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/professional_categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update category");
      setCategories(prev => prev.map(c => (c.id === data.id ? data : c)));
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ DELETE - Remove category
  const deleteCategory = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/professional_categories?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete category");
      setCategories(prev => prev.filter(c => c.id !== id));
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
}
