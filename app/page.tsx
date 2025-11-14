"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // מעקב אחר גלילה
  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY * 0.3); // שינוי קל ל-parallax
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* וידאו ברקע */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/website/mixkit-tractor.mp4" type="video/mp4" />
      </video>

      {/* שכבת שקיפות קלה לשיפור קריאות */}
      <div className="absolute inset-0 bg-black/40" />

      {/* תוכן מעל הסרטון */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">
        <h1
          style={{ transform: `translateY(${offset}px)` }}
          className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg transition-all duration-1000 ${
            loaded ? "opacity-100" : "opacity-0 -translate-y-10"
          }`}
        >
          ברוכים הבאים לקואופרטיב שלנו
        </h1>
        <p
          style={{ transform: `translateY(${offset}px)` }}
          className={`max-w-2xl text-base sm:text-lg md:text-xl text-white leading-relaxed mb-2 drop-shadow-md transition-all duration-1000 delay-200 ${
            loaded ? "opacity-100" : "opacity-0 translate-y-5"
          }`}
        >
          יחד אנחנו בונים כלכלה קהילתית חדשה — מבוססת על ערכים של שיתוף, שקיפות וצמיחה משותפת.
        </p>
        <p
          style={{ transform: `translateY(${offset}px)` }}
          className={`max-w-xl text-base sm:text-lg md:text-xl text-white italic mb-10 drop-shadow-md transition-all duration-1000 delay-400 ${
            loaded ? "opacity-100" : "opacity-0 translate-y-5"
          }`}
        >
          אצלנו כל חבר הוא גם יצרן וגם צרכן.
        </p>

        {/* כפתורים */}
        <div
          style={{ transform: `translateY(${offset}px)` }}
          className={`flex flex-col md:flex-row gap-6 transition-all duration-1000 delay-600 ${
            loaded ? "opacity-100" : "opacity-0 translate-y-5"
          }`}
        >
          <Link
            href="/home"
            aria-label="לסופר הקהילתי שלנו"
            className="flex-1 md:flex-1 px-10 py-4 bg-white/20 border border-white text-white text-xl font-semibold rounded-full backdrop-blur-md hover:bg-white/40 hover:scale-105 transition-all shadow-lg flex flex-col items-center"
          >
            <span>הסופר הקהילתי שלנו</span>
            <span className="text-sm mt-1 text-white/80">
              מצאו מוצרים מחברים אחרים בקהילה
            </span>
          </Link>
          <Link
            href="/professionals"
            aria-label="למבעלי מקצוע"
            className="flex-1 md:flex-1 px-10 py-4 bg-white/20 border border-white text-white text-xl font-semibold rounded-full backdrop-blur-md hover:bg-white/40 hover:scale-105 transition-all shadow-lg flex flex-col items-center"
          >
            <span>בעלי מקצוע</span>
            <span className="text-sm mt-1 text-white/80">
              גלו יועצים ושירותים קהילתיים זמינים
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
