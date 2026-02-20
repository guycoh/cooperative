"use client";

import { useEffect, useState } from "react";

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image_url: string | null;
  created_at: string;
  category_id: string;
  homepage: boolean;
  supplier: string | null;
  is_local_supplier: boolean;
  separate_delivery: boolean;
};

export function useProductsBySlug(slug?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/products-by-category?slug=${encodeURIComponent(slug)}`
        );

        const json = await res.json();

        // 👇 כאן התיקון החשוב
        const productsArray =
          Array.isArray(json)
            ? json
            : json.products || json.data || [];

        setProducts(productsArray);
      } catch (err) {
        console.error("fetch products error", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  return { products, loading };
}
