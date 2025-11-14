import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

 const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

// ✅ GET - קריאת כל המוצרים
export async function GET() {
  const { data, error } = await supabase.from("aaproducts").select("*");
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}




// ✅ POST - יצירת מוצר חדש
export async function POST(req: Request) {
  const body = await req.json();
  const { name, description, price, image_url, category_id, stock,homepage, is_local_supplier, separate_delivery } = body;

  const { data, error } = await supabase
    .from("aaproducts")
    .insert([{ name, description, price, image_url, category_id,
     stock,homepage,is_local_supplier, separate_delivery


    }])
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}







// ✅ PUT - עדכון מוצר קיים
export async function PUT(req: Request) {
  const body = await req.json();
  const { id, name, description, price, image_url, category_id } = body;

  const { data, error } = await supabase
    .from("aaproducts")
    .update({ name, description, price, image_url, category_id })
    .eq("id", id)
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

// ✅ DELETE - מחיקת מוצר
export async function DELETE(req: Request) {
  const { id } = await req.json();

  const { error } = await supabase.from("aaproducts").delete().eq("id", id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
