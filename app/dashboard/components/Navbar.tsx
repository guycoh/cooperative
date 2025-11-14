// components/Navbar.tsx
"use client";

import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white w-full h-16 flex items-center px-6 shadow-md">
      {/* לוגו או כיתוב */}
      <div className="text-xl font-bold">
        DASHBOARD
      </div>

      {/* מרחב בין לוגו לניווט */}
      <div className="flex-1"></div>

      {/* קישורים נוספים אם רוצים */}
      <div className="space-x-4">
        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link href="/profile" className="hover:text-gray-300">
          Profile
        </Link>
        <Link href="/settings" className="hover:text-gray-300">
          Settings
        </Link>
      </div>
    </nav>
  );
}
