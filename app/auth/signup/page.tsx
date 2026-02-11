"use client";

import { useRef, useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Settlement = {
  settlement_number: number;
  name: string;
};

export default function SignUpForm() {
  const supabase = createClient();
  const router = useRouter();

  const role = 1; // קבוע מאחורי הקלעים
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refs לשדות הטופס
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [selectedSettlement, setSelectedSettlement] = useState<number | "">("");

  // סטייט לפוקוס ושדות ריקים
  const [focus, setFocus] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
    settlement: false,
    password: false,
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
    settlement: false,
    password: false,
  });

  useEffect(() => {
    async function fetchSettlements() {
      try {
        const res = await fetch("/api/settlements");
        const data: Settlement[] = await res.json();
        setSettlements(data);
      } catch (err) {
        console.error("Error fetching settlements:", err);
      }
    }
    fetchSettlements();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const firstName = firstNameRef.current?.value || "";
    const lastName = lastNameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const phone = phoneRef.current?.value || "";
    const address = addressRef.current?.value || "";
    const settlementCode = selectedSettlement === "" ? null : selectedSettlement;
    const password = passwordRef.current?.value || "";

    // בדיקה שכל השדות מולאו
    const newTouched = {
      firstName: !firstName,
      lastName: !lastName,
      email: !email,
      phone: !phone,
      address: !address,
      settlement: !settlementCode,
      password: !password,
    };
    setTouched(newTouched);

    if (Object.values(newTouched).some((v) => v)) {
      setError("אנא מלא את כל השדות החובה");
      setLoading(false);
      return;
    }

    try {
      // צור משתמש ב-Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (authError) throw authError;
      if (!authData.user) throw new Error("לא הצלחנו ליצור את המשתמש");

      const userId = authData.user.id;

      // צור פרופיל בטבלת aaprofiles
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
    "w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-200 transition-colors duration-200";

  const labelClasses = "flex justify-between items-center mb-1 font-medium";

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">הרשמה</h1>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* שם פרטי ושם משפחה */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className={labelClasses}>
              שם פרטי <span className={`${touched.firstName ? "hidden" : "text-red-500"}`}>*</span>
            </label>
            <input
              ref={firstNameRef}
              type="text"
              className={`${baseInputClasses} ${focus.firstName ? "bg-orange-50" : ""}`}
              onFocus={() => setFocus((prev) => ({ ...prev, firstName: true }))}
              onBlur={() => setFocus((prev) => ({ ...prev, firstName: false }))}
            />
          </div>
          <div className="flex-1">
            <label className={labelClasses}>
              שם משפחה <span className={`${touched.lastName ? "hidden" : "text-red-500"}`}>*</span>
            </label>
            <input
              ref={lastNameRef}
              type="text"
              className={`${baseInputClasses} ${focus.lastName ? "bg-orange-50" : ""}`}
              onFocus={() => setFocus((prev) => ({ ...prev, lastName: true }))}
              onBlur={() => setFocus((prev) => ({ ...prev, lastName: false }))}
            />
          </div>
        </div>

        {/* אימייל */}
        <div>
          <label className={labelClasses}>
            דואר אלקטרוני <span className={`${touched.email ? "hidden" : "text-red-500"}`}>*</span>
          </label>
          <input
            ref={emailRef}
            type="email"
            className={`${baseInputClasses} ${focus.email ? "bg-orange-50" : ""}`}
            onFocus={() => setFocus((prev) => ({ ...prev, email: true }))}
            onBlur={() => setFocus((prev) => ({ ...prev, email: false }))}
          />
        </div>

        {/* טלפון */}
        <div>
          <label className={labelClasses}>
            טלפון <span className={`${touched.phone ? "hidden" : "text-red-500"}`}>*</span>
          </label>
          <input
            ref={phoneRef}
            type="tel"
            className={`${baseInputClasses} ${focus.phone ? "bg-orange-50" : ""}`}
            onFocus={() => setFocus((prev) => ({ ...prev, phone: true }))}
            onBlur={() => setFocus((prev) => ({ ...prev, phone: false }))}
          />
        </div>

        {/* כתובת */}
        <div>
          <label className={labelClasses}>
            כתובת <span className={`${touched.address ? "hidden" : "text-red-500"}`}>*</span>
          </label>
          <input
            ref={addressRef}
            type="text"
            className={`${baseInputClasses} ${focus.address ? "bg-orange-50" : ""}`}
            onFocus={() => setFocus((prev) => ({ ...prev, address: true }))}
            onBlur={() => setFocus((prev) => ({ ...prev, address: false }))}
          />
        </div>

        {/* יישוב */}
        <div>
          <label className={labelClasses}>
            יישוב <span className={`${touched.settlement ? "hidden" : "text-red-500"}`}>*</span>
          </label>
          <select
            value={selectedSettlement}
            onChange={(e) =>
              setSelectedSettlement(e.target.value === "" ? "" : Number(e.target.value))
            }
            className={`${baseInputClasses} ${focus.settlement ? "bg-orange-50" : ""}`}
            onFocus={() => setFocus((prev) => ({ ...prev, settlement: true }))}
            onBlur={() => setFocus((prev) => ({ ...prev, settlement: false }))}
          >
            <option value="">בחר יישוב</option>
            {settlements.map((s) => (
              <option key={s.settlement_number} value={s.settlement_number}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* סיסמה */}
        <div>
          <label className={labelClasses}>
            סיסמה <span className={`${touched.password ? "hidden" : "text-red-500"}`}>*</span>
          </label>
          <input
            ref={passwordRef}
            type="password"
            className={`${baseInputClasses} ${focus.password ? "bg-orange-50" : ""}`}
            onFocus={() => setFocus((prev) => ({ ...prev, password: true }))}
            onBlur={() => setFocus((prev) => ({ ...prev, password: false }))}
          />
        </div>

        {/* הערה */}
        <p className="text-gray-600 text-sm mb-2">
          ניתן להירשם כספק מוצרים או נותן שירותים בפרופיל האישי לאחר ההרשמה.
        </p>

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





// "use client";

// import { useRef, useState } from "react";
// import { createClient } from "@/lib/supabase/client";
// import { useRouter } from "next/navigation";

// export default function SignUpForm() {
//   const supabase = createClient();
//   const router = useRouter();

//   const role = 1; // קבוע מאחורי הקלעים
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // 🔹 Refs לכל שדה
//   const firstNameRef = useRef<HTMLInputElement>(null);
//   const lastNameRef = useRef<HTMLInputElement>(null);
//   const emailRef = useRef<HTMLInputElement>(null);
//   const phoneRef = useRef<HTMLInputElement>(null);
//   const addressRef = useRef<HTMLInputElement>(null);
//   const settlementRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       // 📌 קח את הערכים מה-refs
//       const firstName = firstNameRef.current?.value || "";
//       const lastName = lastNameRef.current?.value || "";
//       const email = emailRef.current?.value || "";
//       const phone = phoneRef.current?.value || "";
//       const address = addressRef.current?.value || "";
//       const settlementCodeValue = settlementRef.current?.value || "";
//       const settlementCode =
//         settlementCodeValue === "" ? null : Number(settlementCodeValue);
//       const password = passwordRef.current?.value || "";

//       // 1️⃣ צור משתמש ב-Supabase Auth
//       const { data: authData, error: authError } = await supabase.auth.signUp({
//         email,
//         password,
//       });

//       if (authError) throw authError;
//       if (!authData.user) throw new Error("לא הצלחנו ליצור את המשתמש");

//       const userId = authData.user.id;

//       // 2️⃣ צור פרופיל בטבלת aaprofiles
//       const { error: profileError } = await supabase.from("aaprofiles").insert([
//         {
//           id: userId,
//           first_name: firstName,
//           last_name: lastName,
//           phone,
//           address,
//           settlement_code: settlementCode,
//           role,
//           is_local_supplier: false,
//           local_supplier_supply_date: null,
//           is_local_service_provider: false,
//           local_service_provider_date: null,
//         },
//       ]);

//       if (profileError) throw profileError;

//       alert("הרשמה הצליחה! אנא בדוק את המייל לאימות חשבון.");
//       router.push("/auth/login");
//     } catch (err: any) {
//       setError(err.message || "אירעה שגיאה בהרשמה");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const baseInputClasses =
//     "w-full border p-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:bg-orange-50";

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
//       <h1 className="text-2xl font-bold mb-4 text-center">הרשמה</h1>

//       {error && <p className="text-red-600 mb-4">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="flex gap-2">
//           <input
//             ref={firstNameRef}
//             type="text"
//             placeholder="שם פרטי"
//             className={`flex-1 ${baseInputClasses}`}
//             required
//           />
//           <input
//             ref={lastNameRef}
//             type="text"
//             placeholder="שם משפחה"
//             className={`flex-1 ${baseInputClasses}`}
//             required
//           />
//         </div>

//         <input
//           ref={emailRef}
//           type="email"
//           placeholder="דואר אלקטרוני"
//           className={baseInputClasses}
//           required
//         />

//         <input
//           ref={phoneRef}
//           type="tel"
//           placeholder="טלפון"
//           className={baseInputClasses}
//         />

//         <input
//           ref={addressRef}
//           type="text"
//           placeholder="כתובת"
//           className={baseInputClasses}
//         />

//         <input
//           ref={settlementRef}
//           type="number"
//           placeholder="קוד יישוב"
//           className={baseInputClasses}
//         />

//         <input
//           ref={passwordRef}
//           type="password"
//           placeholder="סיסמה"
//           className={baseInputClasses}
//           required
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
//         >
//           {loading ? "טוען..." : "הרשמה"}
//         </button>
//       </form>
//     </div>
//   );
// }
