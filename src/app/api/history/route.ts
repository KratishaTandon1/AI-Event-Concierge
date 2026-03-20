import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  // If no supabase keys, return empty mock array
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({ history: [] });
  }

  try {
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error("Supabase history error:", error);
      return NextResponse.json({ history: [] }); // Fail gracefully
    }

    return NextResponse.json({ history: data });
  } catch (error: any) {
    console.error("History fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
