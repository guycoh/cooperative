import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/**
 * ✅ PUT - עדכון קטגוריה לפי מזהה
 */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { name, description } = body;

    const { data, error } = await supabase
      .from("aacategories")
      .update({ name, description })
      .eq("id", id)
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error: any) {
    console.error("❌ PUT error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * ✅ DELETE - מחיקת קטגוריה לפי מזהה
 */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const { error } = await supabase.from("aacategories").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("❌ DELETE error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
