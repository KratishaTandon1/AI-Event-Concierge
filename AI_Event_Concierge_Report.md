# AI Event Concierge - Project Report
**Role**: Full Stack Engineer Intern  
**Project**: Corporate Offsite AI Venue Planner  

---

## 1. Approach & Architecture
My approach to building the exact specifications of the "AI Event Concierge" was centered on creating a robust, modern full-stack web application that bridged the gap between raw AI processing and a highly premium user experience. I elected to use **Next.js (App Router)** as the core framework, as it natively supports secure server-side API routes while serving optimized React Server Components.

**Core Technical Stack:**
*   **Frontend**: Next.js 16, React, TypeScript, and a highly customized Tailwind CSS v4 setup utilizing a "Glassmorphism" dark-theme aesthetic designed to feel like an enterprise SaaS tool.
*   **Backend/AI**: Google Gemini API (`gemini-2.5-flash`) orchestrated within Next.js Route Handlers. This ensures the API key remains securely isolated on the server and is never exposed to the client. Strict system prompting forces the LLM to process natural language into a mapped, deterministic JSON format.
*   **Database**: Supabase (PostgreSQL) was utilized for instantaneous data persistence. Every successful AI generation is logged and instantly reflected in a unified "Curated Proposals" dashboard across sessions.

---

## 2. Technical Challenges
During the 48-hour development sprints, a few notable challenges arose that required precise engineering solutions:

*   **LLM JSON Determinism**: Ensuring an LLM flawlessly returns valid JSON under arbitrary user input is notoriously difficult. I solved this by explicitly engineering the Gemini system prompt to reject conversational filler and mapped a strict schema expected by the frontend (`Venue Name`, `Location`, `Estimated Cost`, `Justification`).
*   **API Security & Graceful Degradation**: Preventing the UI from crashing if API keys were missing or rate-limited was critical. I implemented comprehensive `try/catch` fallbacks and dynamic loading states via React's `useState`. If an API error occurs, the UI seamlessly handles the rejection and renders a human-readable error state via Lucide icons rather than crashing the client.
*   **Responsive Layout Engine Conflicts**: I opted for a highly custom CSS execution over standard rigid templates. During development, custom CSS overrides initially conflicted with Tailwind CSS's internal `Preflight` reset, causing complex flexbox breakpoints on mobile screens to distort. I identified the global CSS scoping issues, stripped the conflicting legacy constraints, and enforced fluid typography/padding to guarantee pixel-perfect responsiveness across desktop and mobile.

---

## 3. Future Improvements & Scaling
If prioritized beyond a 48-hour prototype, I would immediately target the following scaling improvements:

1.  **User Authentication (Clerk / NextAuth)**: 
    Currently, the Supabase historical ledger acts as a global pool. Implementing proper Auth and Row-Level Security (RLS) in Supabase would allow individual users to host their own private, persistent concierge dashboards.
2.  **Edge Caching & Redis Integration**: 
    If two users request "A 10-person offsite in Seattle under $5k," the server makes two identical, expensive LLM calls. Implementing a Redis caching layer based on prompt similarity would vastly reduce API costs and drop response times from 3000ms to <100ms.
3.  **Real-Time Map Integrations**: 
    Instead of abstract location strings, I would map the LLM's returned physical addresses to the Google Maps or Mapbox API, dynamically generating interactive static maps inside the proposal cards for visceral spatial awareness.
4.  **Generative UI Streaming (React Suspense)**:
    Instead of a static spinning loader while Gemini "thinks," I would upgrade the API constraint to stream the Next.js response over SSE (Server-Sent Events), allowing the frontend to type out the "Justification" in real-time, greatly increasing the perceived performance of the AI.
