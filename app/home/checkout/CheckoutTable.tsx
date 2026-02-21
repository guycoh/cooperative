"use client";
import Image from "next/image";
import { CartItem } from "@/app/context/CartContext";

type CheckoutTableProps = {
  title: string;
  items: CartItem[];
  highlightColor?: "green" | "purple"; // לצבע הכותרת
};

export default function CheckoutTable({ title, items, highlightColor = "green" }: CheckoutTableProps) {
  const titleClass = highlightColor === "green" ? "text-green-800" : "text-purple-700";

  return (
    <div className="bg-white shadow-lg rounded-xl p-4">
      <h2 className={`text-lg font-semibold mb-2 ${titleClass}`}>{title}</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2">מוצר</th>
            <th className="py-2">כמות</th>
            <th className="py-2">מחיר ליחידה</th>
            <th className="py-2">סה״כ</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-2 flex items-center gap-2">
                <div className="w-10 h-10 relative">
                  <Image
                    src={item.image_url || "/placeholder.png"}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                {item.name}
              </td>
              <td className="py-2">{item.quantity}</td>
              <td className="py-2">₪{item.price.toFixed(2)}</td>
              <td className="py-2 font-semibold">₪{(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}