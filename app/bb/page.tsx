export default function AuraExamplePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#D4B95E]">
      <div className="max-w-2xl text-center px-6">
        <h1 className="text-5xl font-bold text-[#FCFBF3] mb-6">
          Aura Design System
        </h1>

        <p className="text-lg text-[#FCFBF3]/90 leading-relaxed mb-6">
          זהו טקסט לדוגמה שמדגים שימוש בפלטת הצבעים של המותג.
          ניתן להשתמש בדף הזה כבסיס למסכי נחיתה, אזורי תוכן
          או בדיקות עיצוב מהירות בתוך הפרויקט.
        </p>

        <button className="bg-[#FCFBF3] text-[#D4B95E] px-6 py-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition">
          כפתור לדוגמה
        </button>
      </div>
    </main>
  );
}