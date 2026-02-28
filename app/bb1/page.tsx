"use client";

export default function BrandCard() {
  return (
    <div className="bg-brand-green text-brand-cream rounded-2xl p-8 shadow-lg max-w-md">
      <h2 className="text-2xl font-semibold mb-3">
        טיפול אורגני לאימהות
      </h2>

      <p className="text-sm opacity-90 leading-relaxed">
        מוצרים טבעיים שנבחרו בקפידה כדי להעניק חוויה רגועה,
        נקייה ובטוחה לך ולתינוק.
      </p>

      <button className="mt-6 bg-brand-cream text-brand-green px-5 py-2 rounded-lg font-semibold hover:opacity-90 transition">
        גלי עוד
      </button>
    </div>
  );
}