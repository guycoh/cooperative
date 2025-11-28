"use client"



import { useProfessionalCategories } from "../data/hooks/useProfessionalCategories"; 

export default function ProfessionalCategoriesPage() {
  const { categories, loading, error } = useProfessionalCategories();

  if (loading) return <p className="text-center mt-20 text-xl animate-pulse">טוען קטגוריות...</p>;
  if (error) return <p className="text-center mt-20 text-red-500 text-xl">{error}</p>;

  return (
   <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <h1 className="text-4xl font-extrabold text-gray-700 mb-8 text-center tracking-tight">
      שירותים ובעלי מקצוע בקהילה
    </h1>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((cat) => (
        <a
          key={cat.id}
          href={cat.link ?? undefined}
          className="
            group block bg-white rounded-2xl shadow-md p-6 
            border border-gray-200
            transition-all duration-300 
            hover:-translate-y-2 hover:shadow-xl 
            hover:border-gray-300 hover:bg-gray-50
          "
        >
          <div
            className="
              flex items-center justify-center h-16 w-16 
              rounded-full bg-gray-100 
              mb-4 
              group-hover:bg-gray-200 
              transition-colors
            "
          >
            <span className="text-2xl font-bold text-gray-600">
              {cat.aaprofessional[0]}
            </span>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
            {cat.aaprofessional}
          </h2>

          <p className="text-center text-gray-500 font-medium group-hover:text-gray-700 group-hover:underline">
            {cat.link}
          </p>
        </a>
      ))}
    </div>
  </div>
</div>

  );
}
