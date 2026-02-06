import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Settlement = {
  id: string;
  settlement_number: number;
  name: string;
  created_at: string;
};

// Body type ל־POST / PUT / DELETE
type SettlementBody = {
  settlement_number: number;
  name?: string;
};

// ✅ GET - שליפת כל היישובים
export async function GET() {
  const { data, error } = await supabase
    .from("aa_settlements")
    .select("*")
    .order("name", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data as Settlement[]);
}

// ✅ POST - יצירת יישוב חדש
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SettlementBody;
    const { settlement_number, name } = body;

    const { data, error } = await supabase
      .from("aa_settlements")
      .insert([{ settlement_number, name }])
      .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json((data as Settlement[])[0]);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ✅ PUT - עדכון שם יישוב
export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as SettlementBody;
    if (!body.name) throw new Error("Missing 'name' for update");

    const { data, error } = await supabase
      .from("aa_settlements")
      .update({ name: body.name })
      .eq("settlement_number", body.settlement_number)
      .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json((data as Settlement[])[0]);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ✅ DELETE - מחיקת יישוב
export async function DELETE(req: Request) {
  try {
    const body = (await req.json()) as SettlementBody;
    const { error } = await supabase
      .from("aa_settlements")
      .delete()
      .eq("settlement_number", body.settlement_number);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
