"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  category?: Category;
}

interface Props {
  products: Product[];
  categories: Category[];
}

export default function NavSearch({ products, categories }: Props) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(query);
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // סינון רק אם 3 תווים ומעלה
  const results = useMemo(() => {
    if (debounced.trim().length < 3) return null;

    const term = debounced.toLowerCase();

    const matchedProducts = products
      .filter((p) =>
        p.name.toLowerCase().includes(term)
      )
      .slice(0, 5);

    const matchedCategories = categories
      .filter((c) =>
        c.name.toLowerCase().includes(term)
      )
      .slice(0, 3);

    return {
      products: matchedProducts,
      categories: matchedCategories,
    };
  }, [debounced, products, categories]);

  // סגירה בלחיצה מחוץ
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // מעבר לדף תוצאות מלא
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length < 3) return;

    router.push(`/home?search=${encodeURIComponent(query)}`);
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative w-72">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="חפש מוצר או קטגוריה..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          className="
            w-full
            border border-green-200
            rounded-xl
            px-4 py-2 pr-10
            focus:outline-none
            focus:ring-2
            focus:ring-brand-green
          "
        />
      </form>

      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </span>

      {open && results && (
        <div className="absolute mt-2 w-full bg-white border border-green-100 rounded-xl shadow-lg z-50 overflow-hidden">

          {/* קטגוריות */}
          {results.categories.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs font-semibold text-gray-400">
                קטגוריות
              </div>

              {results.categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/home/${cat.slug}`}
                  className="block px-4 py-2 hover:bg-brand-cream transition text-brand-green"
                  onClick={() => setOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </>
          )}

          {/* מוצרים */}
          {results.products.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs font-semibold text-gray-400 border-t">
                מוצרים
              </div>

              {results.products.map((product) => (
                <Link
                  key={product.id}
                  href={`/home/product/${product.slug}`}
                  className="block px-4 py-2 hover:bg-brand-cream transition text-brand-green"
                  onClick={() => setOpen(false)}
                >
                  {product.name}
                </Link>
              ))}
            </>
          )}

          {/* מעבר לכל התוצאות */}
          <button
            onClick={handleSubmit}
            className="w-full text-center py-2 bg-brand-green text-white hover:bg-green-700 transition text-sm"
          >
            לכל התוצאות
          </button>
        </div>
      )}
    </div>
  );
}