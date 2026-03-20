import { NextResponse } from "next/server";
import { ai, fallbackMockGeneration } from "@/lib/gemini";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    let parsedProposal;

    // Check if we have the Gemini API key, otherwise fallback to mock data
    // This allows the user to test the UI without setting up keys immediately
    if (process.env.GEMINI_API_KEY) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `You are an AI Event Concierge. The user has described an event they want to plan: "${prompt}".
          Provide a highly detailed, realistic venue proposal. 
          Respond ONLY with a valid JSON document (no markdown formatting, no comments).
          The JSON must have the following structure:
          {
            "venue_name": "Name of the suggested venue",
            "location": "City, Country or specific location",
            "estimated_cost": "Estimated cost that fits their constraints",
            "justification": "A sentence explaining why it fits their description perfectly"
          }`,
          config: {
            temperature: 0.7,
          }
        });

        const textResponse = response.text || "{}";
        // Clean up markdown block if present
        const jsonString = textResponse.replace(/```json\n?|\n?```/g, "").trim();
        parsedProposal = JSON.parse(jsonString);
      } catch (genErr) {
        console.error("Gemini generation error:", genErr);
        // Fallback gracefully instead of failing completely if there's an API issue
        parsedProposal = fallbackMockGeneration(prompt);
      }
    } else {
      console.warn("No GEMINI_API_KEY found. Using mock response.");
      parsedProposal = fallbackMockGeneration(prompt);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    const proposalData = {
      prompt,
      ...parsedProposal
    };

    // Save to database, if we have keys. Otherwise skip saving
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { data, error } = await supabase
        .from('proposals')
        .insert([proposalData])
        .select()
        .single();
      
      if (error) {
        console.error("Supabase insert error:", error);
        // If the table doesn't exist, we just return the proposal anyway so the UI works
      } else if (data) {
        proposalData.id = data.id;
        proposalData.created_at = data.created_at;
      }
    } else {
      console.warn("No SUPABASE URL found. Skipping database persistence.");
      proposalData.id = Math.random().toString();
      proposalData.created_at = new Date().toISOString();
    }

    return NextResponse.json({ proposal: proposalData });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
