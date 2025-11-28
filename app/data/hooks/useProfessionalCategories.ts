"use client";

import { useState, useEffect, useCallback } from "react";

export type ProfessionalCategory = {
  id: string;
  aaprofessional: string;
  link: string | null;
};

export function useProfessionalCategories() {
  const [categories, setCategories] = useState<ProfessionalCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // GET
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/professional-categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data: ProfessionalCategory[] = await res.json();
      setCategories(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  // POST
  const addCategory = useCallback(async (cat: Omit<ProfessionalCategory, "id">) => {
    try {
      setLoading(true);
      const res = await fetch("/api/professional-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cat),
      });
      if (!res.ok) throw new Error("Failed to add category");
      const newCategory: ProfessionalCategory = await res.json();
      setCategories((prev) => [...prev, newCategory]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  // DELETE
  const deleteCategory = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/professional-categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete category");
      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  // PUT
  const updateCategory = useCallback(
    async (id: string, updated: Partial<ProfessionalCategory>) => {
      try {
        setLoading(true);
        const res = await fetch(`/api/professional-categories/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });
        if (!res.ok) throw new Error("Failed to update category");
        const updatedCat: ProfessionalCategory = await res.json();
        setCategories((prev) =>
          prev.map((c) => (c.id === id ? updatedCat : c))
        );
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Load initial
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    addCategory,
    deleteCategory,
    updateCategory,
  };
}
