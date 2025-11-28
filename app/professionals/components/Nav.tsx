"use client"

import Link from "next/link";


export default function Navbar() {
 

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-100 to-gray-200 shadow-md border-b border-gray-300/60">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800 tracking-tight">
         בעלי מקצוע בקהילה
        </Link>

        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="חפש בעל מקצוע..."
           
           
          
            className="
              w-full px-4 py-2 rounded-xl border border-gray-300
              bg-white shadow-inner text-gray-800
              focus:outline-none focus:ring-2 focus:ring-orange-400/60
              transition-all duration-200
            "
          />
        </div>

        {/* Button */}
        <Link
          href="/home"
          className="
            px-4 py-2 rounded-xl font-semibold 
            bg-orange-500 text-white 
            hover:bg-orange-600
            shadow-md hover:shadow-lg 
            transition-all duration-200
          "
        >
          לסופר הקהילתי
        </Link>

      </div>
    </nav>
  );
}
