import { NextResponse } from "next/server";
import { createClient, PostgrestError } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type CategoryUpdateBody = {
  name?: string;
  description?: string | null;
};

/**
 * ✅ PUT - עדכון קטגוריה לפי מזהה
 */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = (await req.json()) as CategoryUpdateBody;

    const { name, description } = body;

    const { data, error } = await supabase
      .from("aacategories")
      .update({ name, description })
      .eq("id", id)
      .select();

    if (error) throw error;

    return NextResponse.json(data?.[0] ?? null);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ PUT error:", message);

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

/**
 * ✅ DELETE - מחיקת קטגוריה לפי מזהה
 */
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const { error } = await supabase
      .from("aacategories")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ DELETE error:", message);

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
