//data/hooks/useProducts

"use client"

import { useState, useEffect } from "react";

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image_url: string | null;
  created_at: string;
  category_id: string | null;
  homepage: boolean;
  supplier?: string | null;
  is_local_supplier?: boolean;
  separate_delivery?: boolean;
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("שגיאה בשליפת מוצרים");

      const data: Product[] = await res.json();
      setProducts(data);
    } catch (err: unknown) {
      const e = err instanceof Error ? err : new Error("Unknown error");
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Partial<Product>) => {
    try {
      setLoading(true);
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error("שגיאה בהוספת מוצר");

      const data: Product = await res.json();
      setProducts((prev) => [...prev, data]);
      return data;
    } catch (err: unknown) {
      const e = err instanceof Error ? err : new Error("Unknown error");
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      setLoading(true);

      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("שגיאה בעדכון מוצר");

      const data: Partial<Product> = await res.json();

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...data } : p))
      );

      return data;
    } catch (err: unknown) {
      const e = err instanceof Error ? err : new Error("Unknown error");
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);

      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("שגיאה במחיקת מוצר");

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      const e = err instanceof Error ? err : new Error("Unknown error");
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const getHomepageProducts = () => products.filter((p) => p.homepage);

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getHomepageProducts,
  };
}
