//import LocalSupplierBadge from "@/components/LocalSupplierBadge"

import LocalSupplierBadge from "@/public/svgFiles/general/LocalSupplierBadge"

export default function LocalSupplierPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10 text-center space-y-8">
        
        {/* כותרת */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">
            תצוגת SVG
          </h1>
          <p className="text-gray-500">
            תג / באדג׳ לסימון ספק מקומי
          </p>
        </div>

        {/* ה־SVG */}
        <div className="flex justify-center">
          <LocalSupplierBadge className="hover:scale-105 transition-transform duration-300" />
        </div>

        {/* דוגמאות צבע */}
        <div className="flex justify-center gap-4 flex-wrap">
          <LocalSupplierBadge
            width={180}
            height={58}
            primaryColor="#0ea5e9"
            secondaryColor="#7dd3fc"
          />

          <LocalSupplierBadge
            width={180}
            height={58}
            primaryColor="#16a34a"
            secondaryColor="#86efac"
          />
        </div>

        {/* טקסט עזר */}
        <div className="text-sm text-gray-400">
          הקומפוננטה ניתנת לשימוש בכל מקום באתר
        </div>

      </div>
    </main>
  )
}
