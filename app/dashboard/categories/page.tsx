
"use client"

import { useEffect, useState } from "react";
import React from "react";


type Category = {
  id: string;
  name: string;
  description: string | null;
  parent_id: string | null;
  created_at: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMain, setNewMain] = useState({ name: "", description: "" });
  const [newSubCategory, setNewSubCategory] = useState<{ [key: string]: string }>({});
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [editValues, setEditValues] = useState<{ [key: string]: { name: string; description: string | null } }>({});
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
    setLoading(false);
  };

  const addMainCategory = async () => {
    if (!newMain.name.trim()) return alert("יש להזין שם קטגוריה ראשית");
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newMain.name,
        description: newMain.description || null,
        parent_id: null,
      }),
    });
    if (res.ok) {
      setNewMain({ name: "", description: "" });
      await fetchCategories();
    }
  };

  const addSubCategory = async (parentId: string) => {
    const name = newSubCategory[parentId]?.trim();
    if (!name) return alert("יש להזין שם תת קטגוריה");
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description: `תת קטגוריה של ${categories.find((c) => c.id === parentId)?.name || ""}`,
        parent_id: parentId,
      }),
    });
    if (res.ok) {
      await fetchCategories();
      setNewSubCategory((prev) => ({ ...prev, [parentId]: "" }));
    }
  };

  const updateCategory = async (id: string) => {
    const updates = editValues[id];
    const res = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      await fetchCategories();
      setEditMode((prev) => ({ ...prev, [id]: false }));
    }
  };

  const startEdit = (cat: Category) => {
    setEditMode((prev) => ({ ...prev, [cat.id]: true }));
    setEditValues((prev) => ({
      ...prev,
      [cat.id]: { name: cat.name, description: cat.description },
    }));
  };

    const deleteCategory = async (id: string) => {
    if (!confirm("האם אתה בטוח שברצונך למחוק את הקטגוריה הזו?")) return;

    const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
    });

    if (res.ok) {
        await fetchCategories();
    } else {
        alert("אירעה שגיאה בעת המחיקה");
    }
    };







  const toggleRow = (id: string) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) return <p className="text-center mt-10">טוען...</p>;

  const mainCategories = categories.filter((cat) => cat.parent_id === null);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-orange-600">ניהול קטגוריות</h1>

      {/* הוספת קטגוריה ראשית */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">הוסף קטגוריה ראשית</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="שם קטגוריה"
            value={newMain.name}
            onChange={(e) => setNewMain({ ...newMain, name: e.target.value })}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <input
            type="text"
            placeholder="תיאור (לא חובה)"
            value={newMain.description}
            onChange={(e) => setNewMain({ ...newMain, description: e.target.value })}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <button
            onClick={addMainCategory}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
          >
            הוסף
          </button>
        </div>
      </div>

      {/* טבלת קטגוריות */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full text-right border-collapse">
          <thead className="bg-orange-100 text-gray-800">
            <tr>
              <th className="p-3 w-10"></th>
              <th className="p-3">שם קטגוריה</th>
              <th className="p-3">תיאור</th>
              <th className="p-3 w-32">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {mainCategories.map((cat) => {
              const subCategories = categories.filter((sub) => sub.parent_id === cat.id);
              const isEditing = editMode[cat.id];
              const editVal = editValues[cat.id] || {};
              const isOpen = openRows[cat.id];

              return (
             
                 <React.Fragment key={cat.id}>
                  <tr  className="border-t hover:bg-gray-50 transition">
                    <td className="p-3 text-center">
                      <button
                        onClick={() => toggleRow(cat.id)}
                        className="text-orange-500 hover:text-orange-600 font-bold text-lg"
                      >
                        {isOpen ? "−" : "+"}
                      </button>
                    </td>

                    <td className="p-3 font-medium text-gray-800">
                      {isEditing ? (
                        <input
                          value={editVal.name || ""}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              [cat.id]: { ...editVal, name: e.target.value },
                            }))
                          }
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                      ) : (
                        cat.name
                      )}
                    </td>

                    <td className="p-3 text-gray-600">
                      {isEditing ? (
                        <input
                          value={editVal.description || ""}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              [cat.id]: { ...editVal, description: e.target.value },
                            }))
                          }
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                      ) : (
                        cat.description || "-"
                      )}
                    </td>

                   <td className="p-3 text-center">
                        {isEditing ? (
                            <div className="flex gap-2 justify-center">
                            <button
                                onClick={() => updateCategory(cat.id)}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                            >
                                שמור
                            </button>
                            <button
                                onClick={() => setEditMode((prev) => ({ ...prev, [cat.id]: false }))}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm"
                            >
                                ביטול
                            </button>
                            </div>
                        ) : (
                            <div className="flex gap-2 justify-center">
                            <button
                                onClick={() => startEdit(cat)}
                                className="text-blue-600 hover:underline text-sm"
                            >
                                ערוך
                            </button>
                            <button
                                onClick={() => deleteCategory(cat.id)}
                                className="text-red-600 hover:underline text-sm"
                            >
                                מחק
                            </button>
                            </div>
                        )}
                   </td>

                  </tr>

                  {/* שורת תתי קטגוריות נפתחת */}
                  {isOpen && (
                    <tr className="bg-green-100 border-t transition-all duration-300">
                      <td colSpan={4} className="p-4">
                        <h3 className="font-semibold text-orange-600 mb-3">תתי קטגוריות:</h3>
                        {subCategories.length > 0 ? (
                          <ul className="space-y-2">
                            {subCategories.map((sub) => {
                              const subIsEditing = editMode[sub.id];
                              const subVal = editValues[sub.id] || {};
                              return (
                                <li
                                  key={sub.id}
                                  className="flex justify-between items-center bg-white border rounded p-2"
                                >
                                  {subIsEditing ? (
                                    <div className="flex flex-col flex-1 gap-1">
                                      <input
                                        value={subVal.name || ""}
                                        onChange={(e) =>
                                          setEditValues((prev) => ({
                                            ...prev,
                                            [sub.id]: { ...subVal, name: e.target.value },
                                          }))
                                        }
                                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                                      />
                                      <input
                                        value={subVal.description || ""}
                                        onChange={(e) =>
                                          setEditValues((prev) => ({
                                            ...prev,
                                            [sub.id]: { ...subVal, description: e.target.value },
                                          }))
                                        }
                                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                                      />
                                      <div className="flex gap-2 mt-1">
                                        <button
                                          onClick={() => updateCategory(sub.id)}
                                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs"
                                        >
                                          שמור
                                        </button>
                                        <button
                                          onClick={() =>
                                            setEditMode((prev) => ({ ...prev, [sub.id]: false }))
                                          }
                                          className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded text-xs"
                                        >
                                          ביטול
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                   <>
                                    <span>{sub.name}</span>
                                    <div className="flex gap-2">
                                        <button
                                        onClick={() => startEdit(sub)}
                                        className="text-blue-600 hover:underline text-sm"
                                        >
                                        ערוך
                                        </button>
                                        <button
                                        onClick={() => deleteCategory(sub.id)}
                                        className="text-red-600 hover:underline text-sm"
                                        >
                                        מחק
                                        </button>
                                    </div>
                                    </>

                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          <p className="text-gray-400 italic">אין תתי קטגוריות</p>
                        )}

                        {/* הוספת תת קטגוריה */}
                        <div className="mt-4 flex gap-2">
                          <input
                            type="text"
                            placeholder="הוסף תת קטגוריה..."
                            value={newSubCategory[cat.id] || ""}
                            onChange={(e) =>
                              setNewSubCategory((prev) => ({ ...prev, [cat.id]: e.target.value }))
                            }
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                          />
                          <button
                            onClick={() => addSubCategory(cat.id)}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
                          >
                            הוסף
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                   </React.Fragment>

              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}












