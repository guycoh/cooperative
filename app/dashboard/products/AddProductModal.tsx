"use client";

import { useState, FormEvent } from "react";
import { useProducts,Product } from "@/app/data/hooks/useProducts";
import { useCategories } from "@/app/data/hooks/useCategories";


type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddProductModal({ isOpen, onClose }: Props) {
  const { addProduct } = useProducts();

  const [formData, setFormData] = useState({
   
    name: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
    category_id: "",
    homepage: false,
    supplier: "",
    is_local_supplier: false,
    separate_delivery: false,

  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { getHierarchicalCategories } = useCategories();
  const categories = getHierarchicalCategories();




  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (name === "image_url") {
        setPreviewUrl(value);
      }
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const productData: Partial<Product> = {
    name: formData.name,
    description: formData.description,
    price: parseFloat(formData.price),
    stock: parseInt(formData.stock),
    category_id: formData.category_id,
    homepage: formData.homepage,
    supplier: formData.supplier || null,
    is_local_supplier: formData.is_local_supplier,
    separate_delivery: formData.separate_delivery,
    image_url: formData.image_url, // <-- כאן קישור התמונה
  };

  await addProduct(productData);
  onClose();
};

  return (
   
    <div
      className={`fixed inset-0 bg-black/30 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      dir="rtl"
    >
      <div
        className={`fixed top-0 left-0 h-full w-full md:w-[70%] lg:w-[50%] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header ירוק */}
        <div className="bg-green-600 text-white p-4 flex justify-between items-center rounded-t-xl">
          <h2 className="text-xl font-semibold">הקמת מוצר חדש</h2>

          <button
            onClick={onClose}
            type="button"
            className="transform transition-all duration-300 hover:scale-110 hover:rotate-20 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white hover:text-green-200"
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

            {/* שורה עליונה: שני שדות + תמונה */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2 grid grid-rows-2 gap-4">
                {/* שם המוצר */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">שם המוצר</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="הקלד שם מוצר"
                    className="w-full border rounded-lg p-2 transition focus:bg-orange-50 focus:border-orange-400"
                    required
                  />
                </div>

                {/* מחיר */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">מחיר</label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="הקלד מחיר"
                    className="w-full border rounded-lg p-2 transition focus:bg-orange-50 focus:border-orange-400"
                    required
                  />
                </div>
              </div>

              {/* תמונה */}
              <div className="md:col-span-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 h-full min-h-[170px]">
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

            {/* שדות נוספים */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">קטגוריה</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 transition focus:bg-orange-50 focus:border-orange-400"
                disabled={loading}
              >
                <option value="">בחר קטגוריה...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* מלאי */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">מלאי</label>
                <input
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="כמות במלאי"
                  className="w-full border rounded-lg p-2 transition focus:bg-orange-50 focus:border-orange-400"
                />
              </div>

              {/* ספק */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">שם ספק (אם קיים)</label>
                <input
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  placeholder="שם ספק"
                  className="w-full border rounded-lg p-2 transition focus:bg-orange-50 focus:border-orange-400"
                />
              </div>

              {/* כתובת תמונה */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">כתובת תמונה (URL)</label>
                <input
                  name="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full border rounded-lg p-2 transition focus:bg-orange-50 focus:border-orange-400"
                />
              </div>

              {/* תיאור */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">תיאור המוצר</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="כתוב תיאור מפורט"
                  className="w-full border rounded-lg p-2 h-24 resize-none transition focus:bg-orange-50 focus:border-orange-400"
                />
              </div>
            </div>
              {/* צ'קבוקסים */}
              <div className="flex flex-wrap gap-6 mt-6 justify-between">

                {/* הצג בדף הבית */}
                <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="homepage"
                    checked={formData.homepage}
                    onChange={handleChange}
                    className="w-6 h-6 accent-blue-600 cursor-pointer"
                  />
                  הצג בדף הבית
                </label>

                {/* ספק מקומי – ירוק מיוחד */}
                <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_local_supplier"
                    checked={formData.is_local_supplier}
                    onChange={handleChange}
                    className="w-7 h-7 accent-[#1ebe6f] cursor-pointer"
                  />
                  ספק מקומי
                </label>

                {/* משלוח נפרד – סגול */}
                <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="separate_delivery"
                    checked={formData.separate_delivery}
                    onChange={handleChange}
                    className="w-7 h-7 accent-purple-600 cursor-pointer"
                  />
                  משלוח נפרד
                </label>

              </div>


            {/* פוטר עם כפתורים בתוך form */}
            <div className="p-4 bg-gray-50 border-t flex justify-between items-center mt-6">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                 
                    name: "",
                    price: "",
                    stock: "",
                    category_id: "",
                    supplier: "",
                    image_url: "",
                    description: "",
                    homepage: false,
                    is_local_supplier: false,
                    separate_delivery: false,
                  })
                }
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                נקה טופס
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                {loading ? "שומר..." : "שמור מוצר"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}
