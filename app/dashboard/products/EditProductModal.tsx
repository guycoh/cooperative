"use client"

import { useState, useEffect, FormEvent } from "react";
import { useProducts, Product } from "@/app/data/hooks/useProducts";
import { useCategories } from "@/app/data/hooks/useCategories";

type EditProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
};

export default function EditProductModal({
  isOpen,
  onClose,
  product,
}: EditProductModalProps) {
  const { updateProduct, loading } = useProducts();
  const { getHierarchicalCategories, loading: categoriesLoading } = useCategories();

  const [categories, setCategories] = useState<{ id: string; label: string }[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [isReadyToShow, setIsReadyToShow] = useState(false);

  // טען נתונים בעת פתיחה
  useEffect(() => {
    if (isOpen && product) {
      const cats = getHierarchicalCategories();
      setCategories(cats);

      setFormData(product);
      setPreviewUrl(product.image_url || null);

      // השהייה קטנה לאנימציה חלקה
      const timer = setTimeout(() => setIsReadyToShow(true), 80);
      return () => clearTimeout(timer);
    } else {
      setIsReadyToShow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;
    const fieldValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product?.id) return;
    await updateProduct(product.id, formData);
    onClose();
  };

  if (!isOpen || !product) return null;

  return (
        <div
        className={`fixed inset-0 bg-black/10 z-50 transition-opacity duration-500 ease-in-out ${
            isReadyToShow ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        >
        {/* צד שמאל באנימציה */}
        <div
            className={`fixed top-0 left-0 h-full w-[70%] max-w-[900px] bg-white shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${
            isReadyToShow ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            {/* Header כחול */}
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">עריכת מוצר</h2>
            <button
                onClick={onClose}
                type="button"
                className="hover:scale-110 transition-transform duration-300"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white hover:text-blue-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            </div>

            {/* תוכן הטופס */}
            <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* שם + מחיר + תמונה */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    <div className="md:col-span-2 grid grid-rows-2 gap-4">
                        <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            שם המוצר
                        </label>
                        <input
                            name="name"
                            value={formData.name || ""}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2 transition focus:bg-orange-50 focus:border-orange-400"
                        />
                        </div>

                        <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            מחיר
                        </label>
                        <input
                            name="price"
                            type="number"
                            step="0.01"
                            value={formData.price ?? ""}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2 transition focus:bg-orange-50 focus:border-orange-400"
                        />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 h-full min-h-[170px]">
                        {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="תצוגת תמונה"
                            className="w-32 h-32 object-cover rounded-lg shadow-md border"
                            onError={() => setPreviewUrl(null)}
                        />
                        ) : (
                        <div className="text-gray-400 text-center text-sm">
                            <div className="text-3xl mb-1">🖼️</div>
                            <p>אין תמונה</p>
                        </div>
                        )}
                    </div>
                    </div>

                    {/* קטגוריה */}
                    <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                        קטגוריה
                    </label>
                    <select
                        name="category_id"
                        value={formData.category_id || ""}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 transition focus:bg-orange-50 focus:border-orange-400"
                        disabled={categoriesLoading}
                    >
                        <option value="">בחר קטגוריה...</option>
                        {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.label}
                        </option>
                        ))}
                    </select>
                    </div>

                    {/* שדות נוספים */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                        מלאי
                        </label>
                        <input
                        name="stock"
                        type="number"
                        value={formData.stock ?? ""}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 transition focus:bg-orange-50 focus:border-orange-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                        ספק
                        </label>
                        <input
                        name="supplier"
                        value={formData.supplier || ""}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 transition focus:bg-orange-50 focus:border-orange-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                        כתובת תמונה (URL)
                        </label>
                        <input
                        name="image_url"
                        type="url"
                        value={formData.image_url || ""}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 transition focus:bg-orange-50 focus:border-orange-400"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                        תיאור המוצר
                        </label>
                        <textarea
                        name="description"
                        value={formData.description || ""}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 h-24 resize-none transition focus:bg-orange-50 focus:border-orange-400"
                        />
                    </div>
                    </div>

                    {/* צ׳קבוקסים */}
                    <div className="flex flex-wrap gap-4 mt-6 justify-between">
                    {[
                        { name: "homepage", label: "הצג בדף הבית" },
                        { name: "is_local_supplier", label: "ספק מקומי" },
                        { name: "separate_delivery", label: "משלוח נפרד" },
                    ].map((item) => (
                        <label key={item.name} className="flex items-center gap-2 text-gray-700">
                        <input
                            type="checkbox"
                            name={item.name}
                            checked={formData[item.name as keyof Product] as boolean || false}
                            onChange={handleChange}
                        />
                        {item.label}
                        </label>
                    ))}
                    </div>

                    {/* פוטר */}
                    <div className="p-4 bg-gray-50 border-t flex justify-between items-center mt-6">
                    <button
                        type="button"
                        onClick={() => setFormData(product)}
                        className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition font-semibold"
                    >
                        אפס שינויים
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                        {loading ? "שומר..." : "עדכן מוצר"}
                    </button>
                    </div>
                </form>
                </div>
        </div>
        </div>
  );
}


