"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchIcon from "@/public/svgFiles/general/SearchIcon";

type Product = {
  id: string;
  name: string;
  slug: string;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

type SubCategory = {
  id: string;
  name: string;
  slug: string;
  parent_id: string;
};

interface Props {
  products: any[];
  categories: any[];
  subcategories: any[];
}


export default function ProductSearch({
  products,
  categories,
  subcategories,
}: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // סינון תוצאות
  const results = useMemo(() => {
    if (query.length < 3) return null;

    const term = query.toLowerCase();

    const matchedProducts = products
      .filter((p) => p.name.toLowerCase().includes(term))
      .slice(0, 6);

    const matchedCategories = categories
      .filter((c) => c.name.toLowerCase().includes(term))
      .slice(0, 3);

    const matchedSubcategories = subcategories
      .filter((c) => c.name.toLowerCase().includes(term))
      .slice(0, 3);

    return {
      products: matchedProducts,
      categories: matchedCategories,
      subcategories: matchedSubcategories,
    };
  }, [query, products, categories, subcategories]);

  // סגירה בלחיצה מחוץ
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // מעבר לדף תוצאות
  function goToResults() {
    if (query.length < 3) return;
    router.push(`/home?search=${encodeURIComponent(query)}`);
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative w-80">

        <SearchIcon
            size={22}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />

      {/* שדה חיפוש */}
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
          border
          border-gray-300
          rounded-xl
          px-4
          py-2
          focus:ring-2
          focus:ring-brand-green
          focus:outline-none
        "
      />

      {/* dropdown */}
      {open && results && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">

          {/* קטגוריות */}
          {results.categories.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs text-gray-400 font-semibold">
                קטגוריות
              </div>

              {results.categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/home/${cat.slug}`}
                  className="block px-4 py-2 hover:bg-brand-cream transition"
                  onClick={() => setOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </>
          )}

          {/* תתי קטגוריות */}
          {results.subcategories.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs text-gray-400 font-semibold border-t">
                תתי קטגוריות
              </div>

              {results.subcategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/home/${cat.slug}`}
                  className="block px-4 py-2 hover:bg-brand-cream transition"
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
              <div className="px-4 py-2 text-xs text-gray-400 font-semibold border-t">
                מוצרים
              </div>

              {results.products.map((p) => (
                <Link
                  key={p.id}
                  href={`/home/product/${p.slug}`}
                  className="block px-4 py-2 hover:bg-brand-cream transition"
                  onClick={() => setOpen(false)}
                >
                  {p.name}
                </Link>
              ))}
            </>
          )}

          {/* מעבר לכל התוצאות */}
          <button
            onClick={goToResults}
            className="w-full bg-brand-green text-white py-2 text-sm hover:bg-green-700 transition"
          >
            לכל התוצאות
          </button>
        </div>
      )}
    </div>
  );
}