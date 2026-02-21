// home/components/CartSidebar
"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import CartIcon from "@/public/svgFiles/general/CartIcon";
import Link from "next/link"


export default function CartSidebar() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const hasSeparateDelivery = cart.some((item) => item.separate_delivery);

  return (
    <>
      {/* כפתור פתיחת עגלה */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-2 left-5 z-50 bg-white text-green-900 px-4 py-3 rounded-full shadow-lg hover:bg-green-700 hover:text-white transition font-semibold"
      >
        🛒 {cart.length > 0 && <span>({cart.length})</span>}
      </button>

      {/* רקע */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* סיידבר */}
      <div
        className={`fixed top-0 left-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-green-900 text-white">
          <h2 className="text-xl font-semibold">עגלה שלי</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl font-bold hover:text-green-200 transition"
          >
            ✕
          </button>
        </div>

        {/* תוכן */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-10 gap-4">
              <p className="text-gray-500 text-center">העגלה ריקה</p>
              <CartIcon size={208} colorPrimary="#22c55e" colorSecondary="#16a34a" />
            </div>
          ) : (
            <>
              {/* הודעה כללית */}
              {hasSeparateDelivery && (
                <div className="bg-purple-50 border border-purple-200 text-purple-700 p-3 rounded-lg text-sm">
                  חלק מהמוצרים נשלחים באספקה נפרדת
                </div>
              )}

              {cart.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4 items-center relative">
              {/* תמונה */}
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={item.image_url || "/placeholder.png"}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              {/* פרטי מוצר */}
              <div className="flex-1">
                <h3 className="text-green-800 font-semibold">{item.name}</h3>

                {/* מחיר */}
                <p className="text-gray-500 text-sm mt-1">₪{item.price.toFixed(2)}</p>
                <p className="text-gray-700 font-semibold text-sm">
                  סה&quot;כ: ₪{(item.price * item.quantity).toFixed(2)}
                </p>

                {/* כמות */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-green-100 text-green-700 px-2 py-1 rounded-lg hover:bg-green-200 transition font-semibold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-green-100 text-green-700 px-2 py-1 rounded-lg hover:bg-green-200 transition font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* סימונים עיגול עם טקסט בתוכו */}
              <div className="flex flex-col items-end justify-center gap-1 mr-2">
              {item.is_local_supplier && (
                <div className="w-16 h-5 rounded-full bg-green-500 text-white text-[9px] font-bold flex items-center justify-center">
                  ספק מקומי
                </div>
              )}
              {item.separate_delivery && (
                <div className="w-16 h-5 rounded-full bg-purple-500 text-white text-[9px] font-bold flex items-center justify-center">
                  אספקה נפרדת
                </div>
              )}
            </div>

              {/* כפתור הסרה */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 font-bold text-lg hover:text-red-700 transition"
              >
                ✕
              </button>
              </div> 


              ))}
            </>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t flex flex-col gap-3 bg-white">
            <div className="flex justify-between font-semibold text-gray-800 text-lg">
              <span>סה&quot;כ:</span>
              <span>₪{total.toFixed(2)}</span>
            </div>

            <button
              onClick={clearCart}
              className="bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-semibold"
            >
              רוקן עגלה
            </button>

            import Link from "next/link"

              <Link
                href="/home/checkout"
                className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold text-lg shadow-md flex justify-center"
              >
                המשך לתשלום
              </Link>
          </div>
        )}
      </div>
    </>
  );
}


// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { useCart } from "@/app/context/CartContext";
// import CartIcon from "@/public/svgFiles/general/CartIcon";


// export default function CartSidebar() {
//   const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {/* כפתור פתיחת עגלה */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="fixed top-2 left-5 z-50 bg-white text-green-900 px-4 py-3 rounded-full shadow-lg hover:bg-green-700 transition font-semibold"
//       >
//         🛒 {cart.length > 0 && <span>({cart.length})</span>}
//       </button>

//       {/* רקע שקוף */}
//       <div
//         className={`fixed inset-0 bg-black/30 z-40 transition-opacity ${
//           isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={() => setIsOpen(false)}
//       />

//       {/* סיידבר */}
//       <div
//         className={`fixed top-0 left-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center p-4 bg-green-900 text-white">
//           <h2 className="text-xl font-semibold">עגלה שלי</h2>
//           <button onClick={() => setIsOpen(false)} className="text-2xl font-bold hover:text-green-200 transition">
//             ✕
//           </button>
//         </div>

//         {/* תוכן */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//           {cart.length === 0 ? (
//             <div className="flex flex-col items-center justify-center mt-10 gap-4">
//               {/* טקסט */}
//               <p className="text-gray-500 text-center">העגלה ריקה</p>
//               {/* אייקון */}
//               <CartIcon
//                   size={208}
//                   colorPrimary="#22c55e"
//                   colorSecondary="#16a34a"
//                 />
//             </div>

            


//           ) : (
//             cart.map((item) => (
//               <div key={item.id} className="flex items-center gap-4 border-b pb-3">
//                 <div className="relative w-16 h-16 flex-shrink-0">
//                   <Image
//                     src={item.image_url || "/placeholder.png"}
//                     alt={item.name}
//                     fill
//                     className="object-cover rounded-lg"
//                   />
//                 </div>

//                 <div className="flex-1">
//                   <h3 className="text-green-700 font-semibold">{item.name}</h3>

//                   {/* מחיר יחידה */}
//                   <p className="text-gray-500 text-sm">₪{item.price.toFixed(2)}</p>

//                   {/* סה״כ למוצר */}
//                   <p className="text-gray-700 font-semibold text-sm">
//                     סה&quot;כ: ₪{(item.price * item.quantity).toFixed(2)}
//                   </p>

//                   {/* כמות */}
//                   <div className="flex items-center gap-2 mt-1">
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                       className="bg-green-100 text-green-700 px-2 py-1 rounded-lg hover:bg-green-200 transition font-semibold"
//                     >
//                       -
//                     </button>
//                     <span className="w-8 text-center">{item.quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                       className="bg-green-100 text-green-700 px-2 py-1 rounded-lg hover:bg-green-200 transition font-semibold"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 {/* הסרה */}
//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="text-red-600 font-bold text-lg hover:text-red-700 transition"
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Footer */}
//         {cart.length > 0 && (
//           <div className="p-4 border-t flex flex-col gap-3">
//             <div className="flex justify-between font-semibold text-gray-800">
//               <span>סה&quot;כ:</span>
//               <span>₪{total.toFixed(2)}</span>
//             </div>
//             <button
//               onClick={clearCart}
//               className="bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-semibold"
//             >
//               רוקן עגלה
//             </button>
//             <button className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold">
//               המשך לתשלום
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
