"use client"

import { useState } from "react"
import { useCart } from "@/app/context/CartContext"
import Image from "next/image"
import { SeparateDeliveryBadge } from "@/public/svgFiles/general/SeparateDeliveryBadge"

import LocalSupplierStamp from "@/public/svgFiles/general/LocalSupplierStamp"



type ProductCardProps = {
  product: {
    id: string
    name: string
    description: string | null
    price: number
    image_url?: string | null
    homepage: boolean
    separate_delivery?: boolean
    is_local_supplier?: boolean
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const increment = () => setQuantity((q) => q + 1)
  const decrement = () => setQuantity((q) => Math.max(1, q - 1))

const handleAddToCart = () => {
  addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image_url: product.image_url,
    quantity,

    // 🔥 חשוב — לשלוח לעגלה
    is_local_supplier: Boolean(product.is_local_supplier),
    separate_delivery: Boolean(product.separate_delivery),
  })

  alert(`הוספת ${quantity} יחידות של ${product.name} לעגלה`)
  setQuantity(1)
}

 

  return (
    <div className="relative bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col">
      
      {/* תמונה */}
      <div className="relative w-full aspect-[4/3] bg-gray-100">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            ללא תמונה
          </div>
        )}
      </div>

      {/* תוכן */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        
        {/* שם + תיאור */}
        <div>
          <h2 className="text-base font-semibold text-green-700 leading-tight">
            {product.name}
          </h2>
          {product.description && (
            <p className="text-gray-500 text-sm line-clamp-2 mt-1">
              {product.description}
            </p>
          )}
        </div>

        {/* מחיר */}
        <div className="text-lg font-bold text-gray-800">
          ₪{product.price.toFixed(2)}
        </div>

        {/* פעולות */}
        <div className="mt-auto flex flex-wrap items-center gap-2">
          
          {/* כמות */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={decrement}
              className="px-2 py-1 text-green-700 bg-green-50 hover:bg-green-100 font-semibold"
            >
              -
            </button>

            <span className="px-3 text-sm font-medium">{quantity}</span>

            <button
              onClick={increment}
              className="px-2 py-1 text-green-700 bg-green-50 hover:bg-green-100 font-semibold"
            >
              +
            </button>
          </div>

          {/* הוסף לסל */}
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-sm font-semibold"
          >
            הוסף לסל
          </button>
        </div>
      </div>

      {/* תגית משלוח נפרד */}
      
      {product.separate_delivery && (
        <div className="absolute top-2 left-2">
          <SeparateDeliveryBadge />
        </div>
      )}

      {product.is_local_supplier && (  
      <div className="absolute -top-2 -right-2">     
        <LocalSupplierStamp
          size={72}
          className="absolute top-3 right-3"
        />
      </div>
      )}

        


    </div>
  )
}















// "use client"

// import { useState } from "react";
// import { useCart } from "@/app/context/CartContext";
// import Image from "next/image";
// import { SeparateDeliveryBadge } from "@/public/svgFiles/general/SeparateDeliveryBadge";

// type ProductCardProps = {
//   product: {
//     id: string;
//     name: string;
//     description: string | null;
//     price: number;
//     image_url?: string | null;
//     homepage: boolean;
//     separate_delivery?: boolean;   // 👈 תיקון
//   };
// };

// export default function ProductCard({ product }: ProductCardProps) {
//   const [quantity, setQuantity] = useState(1);
//   const { addToCart } = useCart(); // 🔹 שימוש ב־CartContext

//   const increment = () => setQuantity((q) => q + 1);
//   const decrement = () => setQuantity((q) => Math.max(1, q - 1));

//   const handleAddToCart = () => {
//     addToCart({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       image_url: product.image_url,
//       quantity, // הכמות שנבחרה
//     });

//     // אפשר להציג הודעה קצרה למשתמש
//     alert(`הוספת ${quantity} יחידות של ${product.name} לעגלה`);
//     setQuantity(1); // איפוס הכמות אחרי הוספה
//   };

//   return (
//     <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
//       {/* תמונה */}
//       {product.image_url ? (
//         <div className="w-full h-56 relative">
         
// <Image
//  src={product.image_url}
//   alt={product.name}
//   width={500}
//   height={500}
//   className="w-full h-full object-cover"
// />

   
//         </div>
//       ) : (
//         <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-400">
//           ללא תמונה
//         </div>
//       )}

//       {/* תוכן */}
//       <div className="p-5 flex flex-col justify-between h-[200px]">
//         <div>
//           <h2 className="text-xl font-semibold text-green-700 mb-1">
//             {product.name}
//           </h2>
//           <p className="text-gray-500 text-sm line-clamp-2">
//             {product.description}
//           </p>
//         </div>
      

//         {/* מחיר וכמות */}
//         <div className="flex justify-between items-center mt-3">
//           <span className="text-lg font-bold text-gray-800">
//             ₪{product.price.toFixed(2)}
//           </span>

//           <div className="flex items-center space-x-2">
//             {/* כפתור הורדה */}
//             <button
//               type="button"
//               onClick={decrement}
//               className="bg-green-100 text-green-700 px-2 py-1 rounded-lg hover:bg-green-200 transition font-semibold"
//             >
//               -
//             </button>

//             {/* שדה כמות */}
//             <input
//               type="number"
//               value={quantity}
//               readOnly
//               className="w-12 text-center border rounded-lg p-1 focus:outline-none focus:ring-1 focus:ring-green-400"
//             />

//             {/* כפתור הוספה */}
//             <button
//               type="button"
//               onClick={increment}
//               className="bg-green-100 text-green-700 px-2 py-1 rounded-lg hover:bg-green-200 transition font-semibold"
//             >
//               +
//             </button>

//             {/* כפתור הוספה לעגלה */}
//             <button
//               onClick={handleAddToCart}
//               className="bg-green-600 text-white px-3 py-1 rounded-xl hover:bg-green-700 transition font-semibold text-sm"
//             >
//               הוסף לסל
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* תגית "נבחר לדף הבית" */}
//       {product.separate_delivery && (
//         <span className="absolute top-3 left-3  text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
       
//          <SeparateDeliveryBadge/>
        
//         </span>
//       )}
//     </div>
//   );
// }

