// 
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'



const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ✅ GET – קבלת כל הקטגוריות
export async function GET() {
  const { data, error } = await supabase.from('aacategories').select('*')

  if (error) {
    console.error('❌ Error fetching categories:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 200 })
}

// ✅ POST – יצירת קטגוריה חדשה
export async function POST(req: Request) {
  const body = await req.json()
  const { name, description , parent_id} = body

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('aacategories')
    .insert([{ name, description , parent_id}])
    .select()

  if (error) {
    console.error('❌ Error creating category:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0], { status: 201 })
}
