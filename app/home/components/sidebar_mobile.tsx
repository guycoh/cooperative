"use client";

import { useCategories } from "@/app/data/hooks/useCategories";
import { categoryIconMap } from "@/app/data/hooks/categoryIconMap";
import Link from "next/link";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SideMenu({ isOpen, onClose }: Props) {
  const { mainCategories, loading } = useCategories();

  return (
    <>
      {/* Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`md:hidden fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl
        transform transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-bold text-lg">קטגוריות</span>

          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full
              text-gray-500 transition-all duration-200
              hover:bg-red-50 hover:text-red-600
              focus:ring-2 focus:ring-red-500 active:scale-90"
          >
            ✕
          </button>
        </div>

        {/* Content */}
       <nav className="flex flex-col p-4 space-y-2 overflow-y-auto">
  {loading && (
    <span className="text-sm text-gray-400">טוען...</span>
  )}

  {mainCategories.map((cat) => {
    const Icon = categoryIconMap[cat.id];

    return (
      <Link
        key={cat.id}
        href={`/home/${cat.slug}`}
        onClick={onClose}
        className="
          flex items-center gap-3 p-2 rounded-lg
          text-green-700
          hover:bg-green-50 hover:text-green-800
          transition
        "
      >
        {Icon && (
          <Icon
            size={26}
            className="shrink-0 text-green-600"
          />
        )}

        <span className="font-medium">
          {cat.name}
        </span>
      </Link>
    );
  })}


{/* קו מפריד */}
      <div className="border-t border-gray-200 my-4" />

      {/* קישורים נוספים */}
      <Link
        href="/professionals"
        onClick={onClose}
        className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition"
      >
        מקצוענים בקהילה
      </Link>

      <Link
        href="/auth/login"
        onClick={onClose}
        className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition"
      >
        כניסה למערכת
      </Link>

      <Link
        href="/auth/signup"
        onClick={onClose}
        className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition"
      >
        הרשמה
      </Link>

      <Link
        href="/profile"
        onClick={onClose}
        className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition"
      >
        הפרופיל שלי
      </Link>













</nav>

      </aside>
    </>
  );
}






// "use client";

// type Props = {
//   isOpen: boolean;
//   onClose: () => void;
// };

// export default function SideMenu({ isOpen, onClose }: Props) {
//   return (
//     <>
//       {/* Overlay — רק מתחת ל-md */}
//       <div
//         className={`md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
//         ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
//         onClick={onClose}
//       />

//       {/* Sidebar */}
//       <aside
//         className={`md:hidden fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl
//         transform transition-transform duration-300 ease-out
//         ${isOpen ? "translate-x-0" : "translate-x-full"}`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b">
//           <span className="font-bold text-lg">תפריט</span>

//           {/* Close button */}
//           <button
//             onClick={onClose}
//             aria-label="סגור תפריט"
//             className="
//               w-10 h-10 flex items-center justify-center rounded-full
//               text-gray-500 transition-all duration-200
//               hover:bg-red-50 hover:text-red-600
//               focus:outline-none focus:ring-2 focus:ring-red-500
//               active:scale-90
//             "
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
//             </svg>
//           </button>
//         </div>

//         {/* Content (placeholder) */}
//         <nav className="flex flex-col p-4 space-y-3 text-gray-700">
//           {/* נכניס כאן קטגוריות בהמשך */}
//         </nav>
//       </aside>
//     </>
//   );
// }
