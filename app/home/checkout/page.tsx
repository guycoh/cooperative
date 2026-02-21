"use client";
import { useCart } from "@/app/context/CartContext";
import CreditCardForm from "./CreditCardForm";
import CheckoutTable from "./CheckoutTable";

export default function CheckoutPage() {
  const { cart, total } = useCart();

  const normalDelivery = cart.filter((item) => !item.separate_delivery);
  const separateDelivery = cart.filter((item) => item.separate_delivery);

  const handlePayment = () => {
    alert("תשלום בוצע בהצלחה!");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-green-800">קופת תשלום</h1>

      <CreditCardForm onPay={handlePayment} />

       
      <div className="text-right text-lg font-bold text-gray-800">
        סה״כ לתשלום: ₪{total.toFixed(2)}
      </div>
    </div>
  );
}




// "use client";

// import { useCart } from "@/app/context/CartContext";
// import { useState } from "react";
// import Image from "next/image";

// export default function CheckoutPage() {
//   const { cart, total } = useCart();
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiry, setExpiry] = useState("");
//   const [cvv, setCvv] = useState("");

//   // פילוח לפי סוג אספקה
//   const normalDelivery = cart.filter((item) => !item.separate_delivery);
//   const separateDelivery = cart.filter((item) => item.separate_delivery);

//   const handlePayment = () => {
//     alert("תשלום בוצע בהצלחה!");
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-8">
//       {/* כותרת */}
//       <h1 className="text-3xl font-bold text-green-800">סיום תשלום</h1>

//       {/* כרטיס אשראי */}
//       <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
//         <h2 className="text-xl font-semibold text-gray-700">פרטי כרטיס אשראי</h2>
        
//         <div className="flex flex-col gap-4">
//           <input
//             type="text"
//             placeholder="מספר כרטיס"
//             value={cardNumber}
//             onChange={(e) => setCardNumber(e.target.value)}
//             className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <div className="flex gap-4">
//             <input
//               type="text"
//               placeholder="תוקף (MM/YY)"
//               value={expiry}
//               onChange={(e) => setExpiry(e.target.value)}
//               className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//             <input
//               type="text"
//               placeholder="CVV"
//               value={cvv}
//               onChange={(e) => setCvv(e.target.value)}
//               className="w-24 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//           </div>
//           <button
//             onClick={handlePayment}
//             className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
//           >
//             שלם עכשיו
//           </button>
//         </div>
//       </div>

//       {/* טבלאות עגלות */}
//       {normalDelivery.length > 0 && (
//         <div className="bg-white shadow-lg rounded-xl p-4">
//           <h2 className="text-lg font-semibold text-gray-700 mb-2">אספקה רגילה</h2>
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b">
//                 <th className="py-2">מוצר</th>
//                 <th className="py-2">כמות</th>
//                 <th className="py-2">מחיר ליחידה</th>
//                 <th className="py-2">סה״כ</th>
//               </tr>
//             </thead>
//             <tbody>
//               {normalDelivery.map((item) => (
//                 <tr key={item.id} className="border-b">
//                   <td className="py-2 flex items-center gap-2">
//                     <div className="w-10 h-10 relative">
//                       <Image
//                         src={item.image_url || "/placeholder.png"}
//                         alt={item.name}
//                         fill
//                         className="object-cover rounded"
//                       />
//                     </div>
//                     {item.name}
//                   </td>
//                   <td className="py-2">{item.quantity}</td>
//                   <td className="py-2">₪{item.price.toFixed(2)}</td>
//                   <td className="py-2 font-semibold">₪{(item.price * item.quantity).toFixed(2)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {separateDelivery.length > 0 && (
//         <div className="bg-white shadow-lg rounded-xl p-4">
//           <h2 className="text-lg font-semibold text-purple-700 mb-2">אספקה נפרדת</h2>
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b">
//                 <th className="py-2">מוצר</th>
//                 <th className="py-2">כמות</th>
//                 <th className="py-2">מחיר ליחידה</th>
//                 <th className="py-2">סה״כ</th>
//               </tr>
//             </thead>
//             <tbody>
//               {separateDelivery.map((item) => (
//                 <tr key={item.id} className="border-b">
//                   <td className="py-2 flex items-center gap-2">
//                     <div className="w-10 h-10 relative">
//                       <Image
//                         src={item.image_url || "/placeholder.png"}
//                         alt={item.name}
//                         fill
//                         className="object-cover rounded"
//                       />
//                     </div>
//                     {item.name}
//                   </td>
//                   <td className="py-2">{item.quantity}</td>
//                   <td className="py-2">₪{item.price.toFixed(2)}</td>
//                   <td className="py-2 font-semibold">₪{(item.price * item.quantity).toFixed(2)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* סיכום */}
//       <div className="text-right text-lg font-bold text-gray-800">
//         סה״כ לתשלום: ₪{total.toFixed(2)}
//       </div>
//     </div>
//   );
// }