"use client"

import Image from "next/image";
import { useProducts } from "@/app/data/hooks/useProducts";
import Link from "next/link";

import ProductCard from "./components/ProductCard";
import CartSidebar from "./components/CartSidebar";

export default function HomePage() {
  const { getHomepageProducts, loading, error } = useProducts();
  const homepageProducts = getHomepageProducts();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-green-700">
        טוען מוצרים...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        שגיאה בטעינת הנתונים: {error}
      </div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-8 md:px-12 lg:px-24">
    <CartSidebar />
    
      {/* כותרת */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-green-700 mb-3">
          המוצרים שלנו
        </h1>
        <p className="text-gray-600 text-lg">
          כאן תמצאו את המוצרים הנבחרים של הקואופרטיב שלנו
        </p>
      </div>

      {/* גריד מוצרים */}
      {homepageProducts.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          אין מוצרים להצגה בדף הבית כרגע
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {homepageProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
      )}

    </main>
  );
}
