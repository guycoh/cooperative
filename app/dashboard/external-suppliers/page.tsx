"use client";

import { useState, useMemo } from "react";
import { useExternalSuppliers, ExternalSupplier } from "@/app/data/hooks/useExternalSuppliers";

import SearchIcon from "@/public/svgFiles/SearchIcon";
import PlusIcon from "@/public/svgFiles/PlusIcon";



export default function ExternalSuppliersPage() {
  const { data, loading, error, page, totalPages, goToPage, create, update, remove, refresh } =
    useExternalSuppliers(20);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<ExternalSupplier | null>(null);

  // חיפוש + מיון
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
      <h2 className="text-xl font-bold mb-4">ספקים חיצוניים</h2>

      {/* חיפוש + כפתור הוספה */}
      <div className="flex items-center gap-3 mb-4 w-full md:w-1/2">

        {/* חיפוש */}
        <div className="relative flex-1">
          <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />

          <input
            type="text"
            placeholder="חיפוש לפי שם או טלפון..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              pr-12
              pl-3
              py-3
              text-lg
              border
              rounded
              focus:outline-none
              focus:bg-orange-100
              transition
            "
          />
        </div>

        {/* כפתור הוספה */}
        <button
          onClick={() => {
            setSelectedSupplier(null);
            setShowModal(true);
          }}
          className="
            flex items-center justify-center
            bg-green-500
            text-white
            w-12 h-12
            rounded-lg
            shadow-md
            hover:bg-green-600
            active:scale-95
            transition
          "
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>

      {/* הצגת טבלה */}
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
                <th className="p-3 border border-gray-400 text-right">טלפון</th>
                <th className="p-3 border border-gray-400 text-right">כתובת</th>
                <th className="p-3 border border-gray-400 text-right">יום אספקה</th>
                <th className="p-3 border border-gray-400 text-right">משעה</th>
                <th className="p-3 border border-gray-400 text-right">עד שעה</th>
                <th className="p-3 border border-gray-400 text-right">פעולות</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((supplier, index) => (
                <tr
                  key={supplier.id}
                  className={`
                    ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    hover:bg-orange-50
                    transition
                  `}
                >
                  <td className="p-3 border border-gray-300">{supplier.name}</td>
                  <td className="p-3 border border-gray-300">{supplier.phone}</td>
                  <td className="p-3 border border-gray-300">{supplier.address}</td>
                  <td className="p-3 border border-gray-300">{supplier.delivery_day}</td>
                  <td className="p-3 border border-gray-300">{supplier.delivery_from}</td>
                  <td className="p-3 border border-gray-300">{supplier.delivery_to}</td>

                  <td className="p-3 border border-gray-300">
                    <div className="flex gap-2">

                      {/* עריכה */}
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        onClick={() => {
                          setSelectedSupplier(supplier);
                          setShowModal(true);
                        }}
                      >
                        ערוך
                      </button>

                      {/* מחיקה */}
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

            <button
              className="px-2 py-1 border rounded ml-auto"
              onClick={() => refresh()}
            >
              רענן
            </button>
          </div>
        </>
      )}

      {/* המודל */}
     
    </div>
  );
}
