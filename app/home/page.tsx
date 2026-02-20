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
   
    
      {/* כותרת */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-green-700 mb-3">
         כלכלה מקומית מקיימת
        </h1>
        <p className="text-gray-600 text-lg">
         כל חבר אצלנו הוא גם יצרן וגם צרכן
        </p>
      </div>

      {/* גריד מוצרים */}
      
      <div className="max-w-[1600px] mx-auto px-4 ">

        {homepageProducts.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            אין מוצרים להצגה בדף הבית כרגע
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              2xl:grid-cols-5
              gap-5 
              md:gap-6
              2xl:gap-8
            "
          >
            {homepageProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>


    </main>
  );
}
