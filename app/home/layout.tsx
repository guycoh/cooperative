'use client'
//import Navbar from "./components/Navbar";
import Nav from "./components/Nav";

//import { useCategories } from "@/data/hooks/useCategories";
import CartSidebar from "./components/CartSidebar";


export default function HomeLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Nav />
     
      <main className="pt-0"> {/* פדינג כדי לא ליפול מתחת ל-Navbar */}
         <CartSidebar />
       
        {children}
      </main>
    </div>
  );
}
