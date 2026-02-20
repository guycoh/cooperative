import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  // 🔹 1. למצוא קטגוריה לפי slug
  const { data: category, error: catError } = await supabase
    .from("aacategories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (catError || !category) {
    return NextResponse.json({ error: "category not found" }, { status: 404 });
  }

  // 🔹 2. אם זו קטגוריה ראשית → להביא ילדים
  let categoryIds = [category.id];

  if (!category.parent_id) {
    const { data: children } = await supabase
      .from("aacategories")
      .select("id")
      .eq("parent_id", category.id);

    if (children) {
      categoryIds = [category.id, ...children.map((c) => c.id)];
    }
  }

  // 🔹 3. להביא מוצרים לפי כל ה-ids
  const { data: products, error: prodError } = await supabase
    .from("products")
    .select("*")
    .in("category_id", categoryIds);

  if (prodError) {
    return NextResponse.json({ error: prodError.message }, { status: 500 });
  }

  return NextResponse.json(products);
}
