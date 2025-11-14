"use client"

import { useProducts } from "@/app/data/hooks/useProducts";
import { useState } from "react";

import AddProductModal from "./AddProductModal"; // וודא נתיב נכון
import EditProductModal from "./EditProductModal"; // נניח ששם הקובץ שלך


export default function ProductsTable() {
  const { products, loading, error, deleteProduct } = useProducts();
  const [isAdding, setIsAdding] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);


  const handleEditClick = (product: any) => {
      setSelectedProduct(product);
      setIsEditOpen(true);
    };








  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">ניהול מוצרים</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          ➕ הוסף מוצר
        </button>
      </div>
      {/* מודאל הוספת מוצר */}
      <AddProductModal isOpen={isAdding} onClose={() => setIsAdding(false)} />


      {loading && <p>טוען מוצרים...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && products.length === 0 && (
        <p className="text-gray-500 text-center">אין מוצרים להצגה.</p>
      )}

      {!loading && products.length > 0 && (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full text-sm text-right rtl">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3">שם</th>
                <th className="p-3">תיאור</th>
                <th className="p-3">מחיר</th>
                <th className="p-3">מלאי</th>
                <th className="p-3">קטגוריה</th>
                <th className="p-3">בעמוד הבית</th>
                <th className="p-3">ספק</th>
                <th className="p-3">ספק מקומי</th>
                <th className="p-3">אספקה נפרדת</th>
                <th className="p-3 text-center">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.description}</td>
                  <td className="p-3">{p.price} ₪</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3">{p.category_id}</td>
                  <td className="p-3">
                    {p.homepage ? (
                      <span className="text-green-600 font-semibold">✔</span>
                    ) : (
                      <span className="text-gray-400">✖</span>
                    )}
                  </td>
                  <td className="p-3">{p.supplier || "—"}</td>
                  <td className="p-3">
                    {p.is_local_supplier ? (
                      <span className="text-green-600 font-semibold">✔</span>
                    ) : (
                      <span className="text-gray-400">✖</span>
                    )}
                  </td>
                  <td className="p-3">
                    {p.separate_delivery ? (
                      <span className="text-green-600 font-semibold">✔</span>
                    ) : (
                      <span className="text-gray-400">✖</span>
                    )}
                  </td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                  onClick={() => handleEditClick(p)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition"
                >
                  ערוך
                </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                    >
                      מחק
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🟦 טופס עריכה נפתח כאן */}
      {selectedProduct && (
        <EditProductModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          product={selectedProduct}
        />
      )}



    </div>
  );
}
