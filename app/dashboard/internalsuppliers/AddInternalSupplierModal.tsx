"use client";

import { useState, ChangeEvent, FormEvent } from "react";

export type InternalSupplierInput = {
  name: string;
  phone: string;
  address: string;
  notes: string;
  is_local_supplier: boolean;
  separate_delivery: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InternalSupplierInput) => Promise<void>;
};

export default function AddInternalSupplierModal({ isOpen, onClose, onSubmit }: Props) {
 const [loading, setLoading] = useState<boolean>(false);


  const [formData, setFormData] = useState<InternalSupplierInput>({
    name: "",
    phone: "",
    address: "",
    notes: "",
    is_local_supplier: false,
    separate_delivery: false,
  });

  /** ✅ ללא ANY — טיפוס מלא */
 const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const target = e.target as HTMLInputElement | HTMLTextAreaElement;
  const { name, value, type } = target;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox"
      ? (target as HTMLInputElement).checked
      : value,
  }));
};

  /** ✅ ללא ANY — טיפוס מלא */
 const handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void> =
  async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onSubmit(formData);
      onClose();
    } finally {
      setLoading(false);
    }
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
        {/* Header */}
        <div className="bg-green-600 text-white p-4 flex justify-between items-center rounded-t-xl">
          <h2 className="text-xl font-semibold">הוספת ספק פנימי</h2>

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

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* שם ספק */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">שם ספק</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="הקלד שם ספק"
                className="w-full border rounded-lg p-3 transition focus:bg-orange-50 focus:border-orange-400"
                required
              />
            </div>

            {/* טלפון */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">טלפון</label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="050-0000000"
                className="w-full border rounded-lg p-3 transition focus:bg-orange-50 focus:border-orange-400"
                required
              />
            </div>

            {/* כתובת */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">כתובת</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="רחוב / מס' בית / עיר"
                className="w-full border rounded-lg p-3 transition focus:bg-orange-50 focus:border-orange-400"
              />
            </div>

            {/* הערות */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">הערות</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="רשום הערות אם יש..."
                className="w-full border rounded-lg p-3 h-24 resize-none transition focus:bg-orange-50 focus:border-orange-400"
              />
            </div>

            {/* צ'קבוקסים */}
            <div className="flex flex-wrap gap-6 mt-6 justify-between">
              <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_local_supplier"
                  checked={formData.is_local_supplier}
                  onChange={handleChange}
                  className="w-6 h-6 accent-green-600 cursor-pointer"
                />
                ספק מקומי
              </label>

              <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="separate_delivery"
                  checked={formData.separate_delivery}
                  onChange={handleChange}
                  className="w-6 h-6 accent-purple-600 cursor-pointer"
                />
                אספקה נפרדת
              </label>
            </div>

            {/* פוטר */}
            <div className="p-4 bg-gray-50 border-t flex justify-between items-center mt-6">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    name: "",
                    phone: "",
                    address: "",
                    notes: "",
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
                {loading ? "שומר..." : "שמור ספק"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
