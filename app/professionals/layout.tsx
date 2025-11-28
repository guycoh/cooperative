'use client'
import Navbar from "./components/Nav";

export default function HomeLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Navbar/>
    
      <main className="pt-0"> {/* פדינג כדי לא ליפול מתחת ל-Navbar */}
        {children}
      </main>
    </div>
  );
}
