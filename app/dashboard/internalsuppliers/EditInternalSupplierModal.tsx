

"use client"

import { useState, useEffect, ChangeEvent } from "react";
import type { InternalSupplier } from "@/app/data/hooks/useInternalSuppliers";

type EditSupplierForm = {
  name: string;
  phone: string;
  address: string;
};


type Props = {
  isOpen: boolean;
  onClose: () => void;
  supplier: InternalSupplier | null;
  onSave: (id: string, updatedData: Partial<InternalSupplier>) => void;
};

export default function EditInternalSupplierModal({
  isOpen,
  onClose,
  supplier,
  onSave,
}: Props) {
 
const [form, setForm] = useState<EditSupplierForm>({
  name: "",
  phone: "",
  address: "",
});



  // מילוי נתונים כשפותחים את המודל
  useEffect(() => {
    if (supplier) {
      setForm({
        name: supplier.name || "",
        phone: supplier.phone || "",
        address: supplier.address || "",
      });
    }
  }, [supplier]);

  if (!isOpen || !supplier) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveHandler = () => {
    onSave(supplier.id, form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden animate-fadeIn">

        {/* HEADER כחול */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">עריכת ספק</h2>
          <button onClick={onClose} className="text-white text-xl leading-none">×</button>
        </div>

        {/* הגוף */}
        <div className="p-4 space-y-4">
          <div>
            <label className="block mb-1 font-medium">שם ספק</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border p-2 rounded focus:bg-blue-50 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">טלפון</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border p-2 rounded focus:bg-blue-50 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">כתובת</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full border p-2 rounded focus:bg-blue-50 focus:outline-none"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 flex justify-end gap-2 border-t">
          <button
            onClick={onClose}
            className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            ביטול
          </button>

          <button
            onClick={saveHandler}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            שמור
          </button>
        </div>

      </div>
    </div>
  );
}
