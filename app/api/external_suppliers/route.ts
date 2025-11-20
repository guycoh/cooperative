import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 📌 GET – קבלת כל הספקים החיצוניים עם Pagination
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 25;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("aa_external_suppliers")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("❌ Error fetching external suppliers:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    {
      data,
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count! / limit),
    },
    { status: 200 }
  );
}


// 📌 POST – יצירת ספק חיצוני חדש
export async function POST(req: Request) {
  const body = await req.json();
  const {
    name,
    phone,
    address,
    delivery_day,
    delivery_from,
    delivery_to,
  } = body;

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("aa_external_suppliers")
    .insert([
      {
        name,
        phone,
        address,
        delivery_day,
        delivery_from,
        delivery_to,
      },
    ])
    .select();

  if (error) {
    console.error("❌ Error creating external supplier:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0], { status: 201 });
}
