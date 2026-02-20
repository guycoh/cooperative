// app/home/category/[slug]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/app/home/components/ProductCard";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url?: string | null;
  homepage: boolean;
  separate_delivery?: boolean;
  is_local_supplier?: boolean;
};

export default function CategoryPage() {
  const params = useParams();
  const slugParam = params?.slug;

  // תמיד להמיר ל string
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `/api/products/by-slug?slug=${encodeURIComponent(slug)}`
        );

        const data = await res.json();

        // אם ה-API מחזיר מערך
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* כותרת */}
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        קטגוריה: {slug ? decodeURIComponent(slug) : ""}
      </h1>

      {/* מצב טעינה */}
      {loading && <p className="text-gray-400">טוען מוצרים...</p>}

      {/* אין מוצרים */}
      {!loading && products.length === 0 && (
        <p className="text-gray-400">לא נמצאו מוצרים</p>
      )}

      {/* Grid מוצרים */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}










// export type Product = {
//   id: string
//   name: string
//   description: string | null
//   price: number
//   image_url?: string | null
//   homepage: boolean
//   separate_delivery?: boolean
//   is_local_supplier?: boolean
// }


// type Props = {
//   params: { slug: string };
// };

// export default async function CategoryPage({ params }: Props) {
//   const slug = decodeURIComponent(params.slug);

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/by-slug?slug=${slug}`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) {
//     return <div className="p-6">שגיאה בטעינת מוצרים</div>;
//   }

//   const products: Product[] = await res.json();

//   return (
//     <div className="p-6 space-y-6">

//       {/* כותרת */}
//       <h1 className="text-2xl font-bold text-gray-800">
//         קטגוריה: <span className="text-green-600">{slug}</span>
//       </h1>

//       {/* אין מוצרים */}
//       {products.length === 0 && (
//         <p className="text-gray-500">אין מוצרים בקטגוריה</p>
//       )}

//       {/* גריד */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>

//     </div>
//   );
// }









// type Props = {
//   params: {
//     slug?: string | string[];
//   };
// };

// export default function CategoryPage({ params }: Props) {
//   const rawSlug = params.slug;

//   // אם זה מערך — ניקח את הערך הראשון
//   const slug =
//     typeof rawSlug === "string"
//       ? rawSlug
//       : Array.isArray(rawSlug)
//       ? rawSlug[0]
//       : undefined;

//   return (
//     <div className="p-10">
//       <p>
//         Slug:{" "}
//         <span className="font-mono text-blue-600">
//           {slug ? decodeURIComponent(slug) : "אין slug"}
//         </span>
//       </p>
//     </div>
//   );
// }
