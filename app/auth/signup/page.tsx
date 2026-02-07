"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const supabase = createClient();
  const router = useRouter();

  const role = 1; // קבוע מאחורי הקלעים
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Refs לכל שדה
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const settlementRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 📌 קח את הערכים מה-refs
      const firstName = firstNameRef.current?.value || "";
      const lastName = lastNameRef.current?.value || "";
      const email = emailRef.current?.value || "";
      const phone = phoneRef.current?.value || "";
      const address = addressRef.current?.value || "";
      const settlementCodeValue = settlementRef.current?.value || "";
      const settlementCode =
        settlementCodeValue === "" ? null : Number(settlementCodeValue);
      const password = passwordRef.current?.value || "";

      // 1️⃣ צור משתמש ב-Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("לא הצלחנו ליצור את המשתמש");

      const userId = authData.user.id;

      // 2️⃣ צור פרופיל בטבלת aaprofiles
      const { error: profileError } = await supabase.from("aaprofiles").insert([
        {
          id: userId,
          first_name: firstName,
          last_name: lastName,
          phone,
          address,
          settlement_code: settlementCode,
          role,
          is_local_supplier: false,
          local_supplier_supply_date: null,
          is_local_service_provider: false,
          local_service_provider_date: null,
        },
      ]);

      if (profileError) throw profileError;

      alert("הרשמה הצליחה! אנא בדוק את המייל לאימות חשבון.");
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.message || "אירעה שגיאה בהרשמה");
    } finally {
      setLoading(false);
    }
  };

  const baseInputClasses =
    "w-full border p-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:bg-orange-50";

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">הרשמה</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <input
            ref={firstNameRef}
            type="text"
            placeholder="שם פרטי"
            className={`flex-1 ${baseInputClasses}`}
            required
          />
          <input
            ref={lastNameRef}
            type="text"
            placeholder="שם משפחה"
            className={`flex-1 ${baseInputClasses}`}
            required
          />
        </div>

        <input
          ref={emailRef}
          type="email"
          placeholder="דואר אלקטרוני"
          className={baseInputClasses}
          required
        />

        <input
          ref={phoneRef}
          type="tel"
          placeholder="טלפון"
          className={baseInputClasses}
        />

        <input
          ref={addressRef}
          type="text"
          placeholder="כתובת"
          className={baseInputClasses}
        />

        <input
          ref={settlementRef}
          type="number"
          placeholder="קוד יישוב"
          className={baseInputClasses}
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="סיסמה"
          className={baseInputClasses}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "טוען..." : "הרשמה"}
        </button>
      </form>
    </div>
  );
}
