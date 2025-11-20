"use client"

import { useState, useEffect, useRef } from "react";
import { useCategories } from "@/app/data/hooks/useCategories";
import Link from "next/link";

export default function HorizontalCategoryNav() {
  const { mainCategories, getChildren, loading } = useCategories();
  const [openCatId, setOpenCatId] = useState<string | null>(null);
  const navRef = useRef<HTMLUListElement>(null);

  if (loading) return <div>טוען קטגוריות...</div>;

  return (
    <nav className="bg-white shadow-md relative">
      <ul
        className="flex gap-6 px-6 py-4 relative justify-start font-sans text-lg"
      >
        {mainCategories.map((cat) => {
          const children = getChildren(cat.id);

          return (
            <li
              key={cat.id}
              className="relative"
              onMouseEnter={() => setOpenCatId(cat.id)}
              onMouseLeave={() => setOpenCatId(null)}
            >
              {/* קטגוריה ראשית עם אפקט קובייתי */}
              <button
                className="
                  px-5 py-3 bg-white border border-gray-200 rounded-lg shadow-sm
                  text-gray-800 font-semibold text-lg
                  hover:bg-orange-100 hover:text-orange-700
                  transform hover:-translate-y-1 transition-all duration-200
                  flex items-center justify-center
                  min-w-[100px]
                "
              >
                {cat.name}
              </button>

              {/* Dropdown של תתי קטגוריות */}
              {children.length > 0 && openCatId === cat.id && (
                <ul
                  className="
                    absolute top-full mt-2 bg-white shadow-lg rounded-md
                    min-w-[160px] z-10
                  "
                  style={{ right: 0 }}
                >
                  {children.map((sub) => (
                    <li key={sub.id}>
                      <Link
                        href="#"
                        className="
                          block px-4 py-2 text-gray-600 hover:bg-orange-100 
                          hover:text-orange-700 transition-colors whitespace-nowrap
                        "
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>

  );
}



// "use client"

// import { useState } from "react";
// import { useCategories,Category } from "@/app/data/hooks/useCategories";
// import Link from "next/link";

// export default function HorizontalCategoryNav() {
//   const { mainCategories, getChildren, loading } = useCategories();
//   const [openCatId, setOpenCatId] = useState<string | null>(null);

//   if (loading) return <div>טוען קטגוריות...</div>;

//   return (
//     <nav className="bg-white shadow-md">
//       <ul className="flex gap-4 px-6 py-3 relative">
//         {mainCategories.map((cat) => {
//           const children = getChildren(cat.id);

//           return (
//             <li
//               key={cat.id}
//               className="relative"
//               onMouseEnter={() => setOpenCatId(cat.id)}
//               onMouseLeave={() => setOpenCatId(null)}
//             >
//               <button className="px-4 py-2 text-gray-700 hover:text-orange-700 transition-colors">
//                 {cat.name}
//               </button>

//               {/* Dropdown של תתי קטגוריות */}
//               {children.length > 0 && openCatId === cat.id && (
//                 <ul className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md min-w-[160px] z-10">
//                   {children.map((sub) => (
//                     <li key={sub.id}>
//                       <Link
//                         href="#"
//                         className="block px-4 py-2 text-gray-600 hover:bg-orange-100 hover:text-orange-700 transition-colors"
//                       >
//                         {sub.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           );
//         })}
//       </ul>
//     </nav>
//   );
// }

