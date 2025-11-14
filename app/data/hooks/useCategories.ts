//data/hooks/useCategories

"use client";
import { useState, useEffect } from "react";

export type Category = {
  id: string;
  name: string;
  description: string | null;
  parent_id: string | null;
  created_at: string;
};

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 טעינה ראשונית
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
    setLoading(false);
  };

  const createCategory = async (category: Partial<Category>) => {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    const data = await res.json();
    if (res.ok) setCategories((prev) => [...prev, data]);
    return data;
  };

  const updateCategory = async (id: string, updates: Partial<Category>) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (res.ok)
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? { ...cat, ...data } : cat))
      );
    return data;
  };

  const deleteCategory = async (id: string) => {
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  // 🧩 קטגוריות ראשיות בלבד
  const mainCategories = categories.filter((cat) => cat.parent_id === null);

  // 🧩 תתי קטגוריות לפי parent_id
  const getChildren = (parentId: string) =>
    categories.filter((cat) => cat.parent_id === parentId);

  // 🧩 בניית רשימה היררכית (ל־select options)
  const getHierarchicalCategories = () => {
    const result: { id: string; label: string }[] = [];

    mainCategories.forEach((mainCat) => {
      // קטגוריה ראשית
      result.push({ id: mainCat.id, label: mainCat.name });

      // תתי קטגוריות
      const subCats = getChildren(mainCat.id);
      subCats.forEach((sub) => {
        result.push({ id: sub.id, label: `— ${sub.name}` });
      });
    });

    return result;
  };

  return {
    categories,
    mainCategories,
    loading,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getChildren,
    getHierarchicalCategories, // ✅ הפונקציה החדשה
  };
}














// "use client";
// import { useState, useEffect } from "react";

// export type Category = {
//   id: string;
//   name: string;
//   description: string | null;
//   parent_id: string | null;
//   created_at: string;
// };

// export function useCategories() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(false);

//   // 🔹 טעינה ראשונית
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     setLoading(true);
//     const res = await fetch("/api/categories");
//     const data = await res.json();
//     setCategories(data);
//     setLoading(false);
//   };

//   const createCategory = async (category: Partial<Category>) => {
//     const res = await fetch("/api/categories", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(category),
//     });
//     const data = await res.json();
//     if (res.ok) setCategories((prev) => [...prev, data]);
//     return data;
//   };
//   const updateCategory = async (id: string, updates: Partial<Category>) => {
//     const res = await fetch(`/api/categories/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updates),
//     });
//     const data = await res.json();
//     if (res.ok)
//       setCategories((prev) =>
//         prev.map((cat) => (cat.id === id ? { ...cat, ...data } : cat))
//       );
//     return data;
//   };

//   const deleteCategory = async (id: string) => {
//     const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
//     if (res.ok) setCategories((prev) => prev.filter((cat) => cat.id !== id));
//   };

//   // 🧩 פונקציה להבאת תתי קטגוריות של קטגוריה מסוימת
//   const getChildren = (parentId: string) =>
//     categories.filter((cat) => cat.parent_id === parentId);

//   // 🧩 קטגוריות ראשיות בלבד
//   const mainCategories = categories.filter((cat) => cat.parent_id === null);

//   return {
//     categories,
//     mainCategories,
//     loading,
//     fetchCategories,
//     createCategory,
//     updateCategory,
//     deleteCategory,
//     getChildren,
//   };
// }
