import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ✅ GET - קריאת כל הקטגוריות
export async function GET() {
  const { data, error } = await supabase.from("aaprofessional_categories").select("*");
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// ✅ POST - יצירת קטגוריה חדשה
export async function POST(req: Request) {
  const body = await req.json();
  const { aaprofessional, link } = body;

  const { data, error } = await supabase
    .from("aaprofessional_categories")
    .insert([{ aaprofessional, link }])
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  
  return NextResponse.json(data[0]);
}
