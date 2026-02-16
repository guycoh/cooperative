"use client";

import { useState } from "react";
import { useCategories } from "@/app/data/hooks/useCategories";
import Link from "next/link";
import { categoryIconMap } from "@/app/data/hooks/categoryIconMap";

export default function HorizontalCategoryNav() {
  const { mainCategories, getChildren, loading } = useCategories();
  const [openCatId, setOpenCatId] = useState<string | null>(null);

  if (loading) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm hidden md:block border-b border-green-100">
      <ul className="flex justify-start gap-3 px-6 py-2 h-16">
        {mainCategories.map((cat) => {
          const children = getChildren(cat.id);
          const IconComponent = categoryIconMap[cat.id];

          return (
            <li
              key={cat.id}
              className="relative flex-shrink-0"
              onMouseEnter={() => setOpenCatId(cat.id)}
              onMouseLeave={() => setOpenCatId(null)}
            >
              {/* כפתור קטגוריה */}
             <Link
  href={`/home/category/${cat.slug}`}
  className="
    w-20 h-16
    flex flex-col items-center justify-center gap-1
    bg-white border border-green-200 rounded-xl
    shadow-sm
    text-green-700
    hover:bg-green-50 hover:border-green-300 hover:text-green-800
    transition-all duration-200
    text-xs
    focus:outline-none focus:ring-2 focus:ring-green-300
  "
>
  {IconComponent && (
    <IconComponent size={20} className="text-green-600" />
  )}

  <span className="text-center leading-tight font-medium">
    {cat.name}
  </span>
</Link>

              {/* Dropdown לילדים */}
              {children.length > 0 && openCatId === cat.id && (
                <ul
                  className="
                    absolute top-full mt-2 right-0
                    bg-white shadow-lg rounded-xl
                    border border-green-100
                    min-w-[170px] z-20 overflow-hidden
                  "
                >
                  {children.map((sub) => (
                    <li key={sub.id}>
                      <Link
                        href="#"
                        className="
                          block px-4 py-2
                          text-green-700
                          hover:bg-green-50 hover:text-green-900
                          transition-colors
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










// "use client";

// import { useState } from "react";
// import { useCategories } from "@/app/data/hooks/useCategories";
// import Link from "next/link";

// import { categoryIconMap } from "@/app/data/hooks/categoryIconMap"; // ה-map עם כל האייקונים

// export default function HorizontalCategoryNav() {
//   const { mainCategories, getChildren, loading } = useCategories();
//   const [openCatId, setOpenCatId] = useState<string | null>(null);

//   if (loading) return null;

//   return (
//   <nav className="sticky top-0 z-50 bg-white shadow-md hidden md:block">
//   <ul className="flex justify-start gap-3 px-6 py-2 h-16">
//     {mainCategories.map((cat) => {
//       const children = getChildren(cat.id);
//       const IconComponent = categoryIconMap[cat.id];

//       return (
//         <li
//           key={cat.id}
//           className="relative flex-shrink-0"
//           onMouseEnter={() => setOpenCatId(cat.id)}
//           onMouseLeave={() => setOpenCatId(null)}
//         >
//           {/* כפתור קטגוריה */}
//           <button
//             className="
//               w-20 h-16
//               flex flex-col items-center justify-center gap-1
//               bg-white border border-gray-200 rounded-lg shadow-sm
//               hover:bg-orange-50 hover:text-orange-600
//               transition-all duration-200
//               text-xs
//             "
//           >
//             {/* SVG */}
//             {IconComponent && <IconComponent size={20} className="text-orange-500" />}

//             {/* שם קטגוריה */}
//             <span className="text-center leading-tight">{cat.name}</span>
//           </button>

//           {/* Dropdown לילדים */}
//           {children.length > 0 && openCatId === cat.id && (
//             <ul className="
//                 absolute top-full mt-1 right-0
//                 bg-white shadow-lg rounded-lg
//                 min-w-[160px] z-20 overflow-hidden
//               ">
//               {children.map((sub) => (
//                 <li key={sub.id}>
//                   <Link
//                     href="#"
//                     className="
//                       block px-4 py-2 text-gray-600
//                       hover:bg-orange-50 hover:text-orange-600
//                       transition-colors
//                     "
//                   >
//                     {sub.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </li>
//       );
//     })}
//   </ul>
// </nav>


//   );
// }



// "use client"

// import { useState } from "react";
// import { useCategories } from "@/app/data/hooks/useCategories";
// import Link from "next/link";

// export default function HorizontalCategoryNav() {
//   const { mainCategories, getChildren, loading } = useCategories();
//   const [openCatId, setOpenCatId] = useState<string | null>(null);


//   if (loading) return <div>טוען קטגוריות...</div>;

//   return (
//     <nav className="bg-white shadow-md relative">
//       <ul
//         className="flex gap-6 px-6 py-4 relative justify-start font-sans text-lg"
//       >
//         {mainCategories.map((cat) => {
//           const children = getChildren(cat.id);

//           return (
//             <li
//               key={cat.id}
//               className="relative"
//               onMouseEnter={() => setOpenCatId(cat.id)}
//               onMouseLeave={() => setOpenCatId(null)}
//             >
//               {/* קטגוריה ראשית עם אפקט קובייתי */}
//               <button
//                 className="
//                   px-5 py-3 bg-white border border-gray-200 rounded-lg shadow-sm
//                   text-gray-800 font-semibold text-lg
//                   hover:bg-orange-100 hover:text-orange-700
//                   transform hover:-translate-y-1 transition-all duration-200
//                   flex items-center justify-center
//                   min-w-[100px]
//                 "
//               >
//                 {cat.name}
//               </button>

//               {/* Dropdown של תתי קטגוריות */}
//               {children.length > 0 && openCatId === cat.id && (
//                 <ul
//                   className="
//                     absolute top-full mt-2 bg-white shadow-lg rounded-md
//                     min-w-[160px] z-10
//                   "
//                   style={{ right: 0 }}
//                 >
//                   {children.map((sub) => (
//                     <li key={sub.id}>
//                       <Link
//                         href="#"
//                         className="
//                           block px-4 py-2 text-gray-600 hover:bg-orange-100 
//                           hover:text-orange-700 transition-colors whitespace-nowrap
//                         "
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

