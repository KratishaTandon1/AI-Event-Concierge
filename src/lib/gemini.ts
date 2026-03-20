import { GoogleGenAI } from '@google/genai';

// Initialize Gemini SDK with the API key from environment variables
// It will throw an error if GEMINI_API_KEY is not set later when calling generateContent
export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const fallbackMockGeneration = (prompt: string) => {
  return {
    venue_name: "The Alpine Retreat",
    location: "Lake Tahoe, California",
    estimated_cost: "$3,800",
    justification: "Fits your budget of $4k perfectly, providing a secluded mountain atmosphere ideal for an intimate 10-person leadership offsite."
  };
};
