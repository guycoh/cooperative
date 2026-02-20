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
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  try {
    // 🔹 1. מציאת קטגוריה לפי slug
    const { data: category, error: catError } = await supabase
      .from("aacategories")
      .select("id, parent_id")
      .eq("slug", slug)
      .single();

    if (catError || !category) {
      return NextResponse.json({ error: "category not found" }, { status: 404 });
    }

    let categoryIds: string[] = [category.id];

    // 🔹 2. אם קטגוריה ראשית → להביא ילדים
    if (category.parent_id === null) {
      const { data: children } = await supabase
        .from("aacategories")
        .select("id")
        .eq("parent_id", category.id);

      if (children && children.length > 0) {
        categoryIds = [category.id, ...children.map((c) => c.id)];
      }
    }

    // 🔹 3. להביא מוצרים לפי categoryIds
    const { data: products, error: prodError } = await supabase
      .from("aaproducts")
      .select("*")
      .in("category_id", categoryIds)
      .order("created_at", { ascending: false });

    if (prodError) {
      return NextResponse.json({ error: prodError.message }, { status: 500 });
    }

    return NextResponse.json(products, { status: 200 });

  } catch (err) {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
