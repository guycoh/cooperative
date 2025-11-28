import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create client per request
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
    .from("aa_internal_suppliers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("❌ Error fetching internal supplier:", error.message);
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
    notes,
    is_local_supplier,
    separate_delivery,
  } = body;

  const { data, error } = await supabase
    .from("aa_internal_suppliers")
    .update({
      name,
      phone,
      address,
      notes,
      is_local_supplier,
      separate_delivery,
    })
    .eq("id", id)
    .select();

  if (error) {
    console.error("❌ Error updating internal supplier:", error.message);
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
    .from("aa_internal_suppliers")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("❌ Error deleting internal supplier:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
