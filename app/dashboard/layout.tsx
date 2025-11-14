'use client'
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Navbar />
      <Sidebar /> {/* Sidebar fixed, מופיע מעל התוכן */}
      <main className="pt-16"> {/* פדינג כדי לא ליפול מתחת ל-Navbar */}
        {children}
      </main>
    </div>
  );
}
