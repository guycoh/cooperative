// components/Sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "דשבורד", href: "/", icon: "🏠" },
    { name: "פרופיל", href: "/profile", icon: "👤" },
    { name: "קטגוריות", href: "/dashboard/categories", icon: "⚙️" },
    { name: "הגדרות", href: "/settings", icon: "⚙️" },
    { name: "ספקים פנימיים", href: "/dashboard/internalsuppliers", icon: "⚙️" },
    { name: "מוצרים", href: "/dashboard/products", icon: "📦" },
    { name: "לקוחות", href: "/clients", icon: "🧑‍🤝‍🧑" },
    { name: "טבלת יישובים", href: "/dashboard/settlements", icon: "🧑‍🤝‍🧑" },
  
  ];

  return (
    <>
      {/* Sidebar – יושב מעל הדף ולא מכסה אותו */}
      <aside
        className={`fixed top-16 right-0 h-[calc(100vh-4rem)] bg-gray-800 text-white z-40 
        transition-transform duration-300 shadow-2xl border-l border-gray-700
        ${open ? "translate-x-0" : "translate-x-full"} w-64 flex flex-col`}
        dir="rtl"
      >
        <div className="mt-6 flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-md transition-colors duration-200"
              onClick={() => setOpen(false)}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </aside>

      {/* כפתור פתיחה/סגירה קבוע בצד ימין מתחת ל־Navbar */}
      <button
        className="fixed top-[4rem] right-4 z-50 p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition-transform duration-300"
        onClick={() => setOpen(!open)}
      >
        <span
          className={`inline-block transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          ◀
        </span>
      </button>
    </>
  );
}

