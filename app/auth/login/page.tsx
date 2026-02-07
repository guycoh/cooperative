"use client";

import { useState } from "react"
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";



export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const supabase = createClient();
 
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-3">
      <h1 className="text-2xl font-bold">כניסה</h1>

      <input
        className="border p-2 w-full"
        placeholder="אימייל"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-primary text-white w-full py-2 rounded"
      >
        כניסה
      </button>
    </div>
  );
}
