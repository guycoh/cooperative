'use client'
//import Navbar from "./components/Navbar";
import Nav from "./components/Nav";

export default function HomeLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Nav />
     
      <main className="pt-16"> {/* פדינג כדי לא ליפול מתחת ל-Navbar */}
        {children}
      </main>
    </div>
  );
}
