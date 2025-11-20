"use client";

import { useState, useMemo } from "react";
import { useInternalSuppliers , InternalSupplier   } from "@/app/data/hooks/useInternalSuppliers";

import SearchIcon from "@/public/svgFiles/SearchIcon";
import PlusIcon from "@/public/svgFiles/PlusIcon";

import AddInternalSupplierModal from "./AddInternalSupplierModal"; // ← הוספנו ייבוא
import EditInternalSupplierModal from "./EditInternalSupplierModal";

export default function InternalSuppliersTable() {
  const {
    data,
    page,
    totalPages,
    loading,
    error,
    goToPage,
    create,
    update,
    remove,
    refresh,
  } = useInternalSuppliers(10);

  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false); // ← מצב מודל

const [editModalOpen, setEditModalOpen] = useState(false);
const [selectedSupplier, setSelectedSupplier] = useState<InternalSupplier | null>(null);







  // חיפוש
  const filteredData = useMemo(() => {
    return data
      .filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.phone?.includes(search)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [data, search]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">ספקים פנימיים</h2>

      {/* חיפוש + כפתור הוספה */}
      <div className="flex items-center gap-3 mb-4 w-full md:w-1/2">
        <div className="relative flex-1">
          <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />

          <input
            type="text"
            placeholder="חיפוש לפי שם או טלפון..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-12 pl-3 py-3 text-lg border rounded focus:outline-none focus:bg-orange-100 transition"
          />
        </div>

        {/* כפתור הוספה — יפתח את המודל */}
        <button
          onClick={() => setIsAddOpen(true)}
          className="
            flex items-center justify-center
            bg-green-500 text-white
            w-12 h-12 rounded-lg shadow-md
            hover:bg-green-600 active:scale-95 transition
          "
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>

      {/* טבלה */}
      {loading ? (
        <p>טוען...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <table className="min-w-full border-collapse border border-gray-400 shadow-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-700 font-semibold">
                <th className="p-3 border border-gray-400 text-right">שם</th>
                <th className="p-3 border border-gray-400 text-right">כתובת</th>
                <th className="p-3 border border-gray-400 text-right">טלפון</th>
                <th className="p-3 border border-gray-400 text-right">פעולות</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((supplier, index) => (
                <tr
                  key={supplier.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-orange-50 transition`}
                >
                  <td className="p-3 border border-gray-300">{supplier.name}</td>
                  <td className="p-3 border border-gray-300">{supplier.address}</td>
                  <td className="p-3 border border-gray-300">{supplier.phone}</td>

                  <td className="p-3 border border-gray-300">
                    <div className="flex gap-2">
                     <button
                        className="
                            px-3 py-1
                            bg-green-600 text-white
                            rounded-md
                            hover:bg-green-700
                            transition
                        "
                        onClick={() => {
                            setSelectedSupplier(supplier);
                            setEditModalOpen(true);
                        }}
                        >
                        עדכן
                    </button>

                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                        onClick={() => remove(supplier.id)}
                      >
                        מחק
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* פאגינציה */}
          <div className="mt-4 flex items-center gap-2">
            <button
              className="px-2 py-1 border rounded disabled:opacity-50"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
            >
              קודם
            </button>

            <span>
              {page} / {totalPages}
            </span>

            <button
              className="px-2 py-1 border rounded disabled:opacity-50"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
            >
              הבא
            </button>

            <button className="px-2 py-1 border rounded ml-auto" onClick={refresh}>
              רענן
            </button>
          </div>
        </>
      )}

      {/* 🌟 מודל ההוספה המשולב */}
      <AddInternalSupplierModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={async (values) => {
          await create(values);
          setIsAddOpen(false);
        }}
      />

        <EditInternalSupplierModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        supplier={selectedSupplier}
        onSave={(id, updatedData) => update(id, updatedData)}
        />












    </div>
  );
}
