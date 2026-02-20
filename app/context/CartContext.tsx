//context/CartContext
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image_url?: string | null;
  quantity: number;

  // שדות משלוח
  is_local_supplier: boolean;
  separate_delivery: boolean;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void; // ✔️ לא Omit
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
};



const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ addToCart יציב
  const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);

      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      }

      return [
        ...prev,
        {
          ...item,
          quantity,
          is_local_supplier: item.is_local_supplier ?? false,
          separate_delivery: item.separate_delivery ?? false,
        },
      ];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(1, quantity) } : p
      )
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
















// "use client";

// import { createContext, useContext, useState, ReactNode } from "react";

// // סוג המוצר בעגלה
// export type CartItem = {
//   id: string;
//   name: string;
//   price: number;
//   image_url?: string | null;
//   quantity: number;
//   // חדש 👇
//   is_local_supplier?: boolean;
//   separate_delivery?: boolean;

// };

// // טיפוס ההקשר
// type CartContextType = {
//   cart: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   clearCart: () => void;
//   total: number;
// };

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   // הוספה לעגלה
//   const addToCart = (item: CartItem) => {
//     setCart((prev) => {
//       const existing = prev.find((p) => p.id === item.id);
//       if (existing) {
//         return prev.map((p) =>
//           p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
//         );
//       }
//       return [...prev, item];
//     });
//   };

//   // הסרה
//   const removeFromCart = (id: string) => {
//     setCart((prev) => prev.filter((p) => p.id !== id));
//   };

//   // עדכון כמות
//   const updateQuantity = (id: string, quantity: number) => {
//     setCart((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, quantity) } : p))
//     );
//   };

//   // איפוס עגלה
//   const clearCart = () => setCart([]);

//   // סכום כולל
//   const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// // הוק לשימוש בקומפוננטות
// export function useCart() {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart must be used within a CartProvider");
//   return context;
// }
