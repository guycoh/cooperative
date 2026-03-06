"use client";

import Image from "next/image";
import { useCart } from "@/app/context/CartContext";

export default function CheckoutCartSummary() {
  const { cart, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-brand-cream p-8 rounded-2xl text-center">
        <p className="text-brand-green text-lg font-medium">
          העגלה ריקה
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-green-100 overflow-hidden">
      
      {/* Header */}
      <div className="bg-brand-green text-white px-6 py-4">
        <h2 className="text-xl font-semibold">סיכום הזמנה</h2>
      </div>

      {/* מוצרים */}
      <div className="divide-y">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-4 p-4 items-center">
            
            {/* תמונה */}
            <div className="relative w-20 h-20 flex-shrink-0">
              <Image
                src={item.image_url || "/placeholder.png"}
                alt={item.name}
                fill
                className="object-cover rounded-xl"
              />
            </div>

            {/* פרטים */}
            <div className="flex-1">
              <h3 className="text-brand-green font-semibold">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                ₪{item.price.toFixed(2)} × {item.quantity}
              </p>

              <p className="text-sm font-semibold text-gray-800 mt-1">
                סה&quot;כ: ₪{(item.price * item.quantity).toFixed(2)}
              </p>

              {/* סימונים */}
              <div className="flex gap-2 mt-2 flex-wrap">
                {item.is_local_supplier && (
                  <span className="px-2 py-1 text-[10px] rounded-full bg-green-100 text-green-700 font-bold">
                    ספק מקומי
                  </span>
                )}

                {item.separate_delivery && (
                  <span className="px-2 py-1 text-[10px] rounded-full bg-purple-100 text-purple-700 font-bold">
                    אספקה נפרדת
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-brand-cream px-6 py-4 flex justify-between items-center">
        <span className="text-lg font-semibold text-brand-green">
          סה&quot;כ לתשלום:
        </span>

        <span className="text-xl font-bold text-brand-green">
          ₪{total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}