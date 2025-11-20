import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 📌 GET – ספק חיצוני בודד
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabase
    .from("aa_external_suppliers")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    console.error("❌ Error fetching external supplier:", error.message);
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data, { status: 200 });
}

// 📌 PUT – עדכון ספק חיצוני
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const {
    name,
    phone,
    address,
    delivery_day,
    delivery_from,
    delivery_to,
  } = body;

  const { data, error } = await supabase
    .from("aa_external_suppliers")
    .update({
      name,
      phone,
      address,
      delivery_day,
      delivery_from,
      delivery_to,
    })
    .eq("id", params.id)
    .select();

  if (error) {
    console.error("❌ Error updating external supplier:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0], { status: 200 });
}

// 📌 DELETE – מחיקת ספק חיצוני
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await supabase
    .from("aa_external_suppliers")
    .delete()
    .eq("id", params.id);

  if (error) {
    console.error("❌ Error deleting external supplier:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
