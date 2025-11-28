import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// יוצרים קליינט בכל בקשה (Best Practice ב-Next.js route handlers)
function supabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/* ------------------------------------- */
/*                GET                    */
/* ------------------------------------- */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const supabase = supabaseClient();

  const { data, error } = await supabase
    .from("aa_external_suppliers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("❌ Error fetching external supplier:", error.message);
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data, { status: 200 });
}

/* ------------------------------------- */
/*                PUT                    */
/* ------------------------------------- */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const supabase = supabaseClient();

  const body = await request.json();
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
    .eq("id", id)
    .select();

  if (error) {
    console.error("❌ Error updating external supplier:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data?.[0] ?? null, { status: 200 });
}

/* ------------------------------------- */
/*              DELETE                   */
/* ------------------------------------- */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const supabase = supabaseClient();

  const { error } = await supabase
    .from("aa_external_suppliers")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("❌ Error deleting external supplier:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
