// api/categories

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ✅ GET – כל הקטגוריות או לפי slug
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get("slug")

  // 🔎 אם יש slug → מחזיר קטגוריה אחת
  if (slug) {
    const { data, error } = await supabase
      .from('aacategories')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 200 })
  }

  // 🔎 אחרת → מחזיר הכל
  const { data, error } = await supabase.from('aacategories').select('*')

  if (error) {
    console.error('❌ Error fetching categories:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 200 })
}

// ✅ POST – יצירת קטגוריה
export async function POST(req: Request) {
  const body = await req.json()
  const { name, description, parent_id } = body

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('aacategories')
    .insert([{ name, description, parent_id }])
    .select()

  if (error) {
    console.error('❌ Error creating category:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0], { status: 201 })
}
