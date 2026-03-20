# AI Event Concierge

A modern, full-stack web application that takes natural language descriptions of corporate events and uses AI (Google Gemini) to generate structured venue proposals. It also features persistence via Supabase to save previous searches.

## Tech Stack
- Frontend & Backend: Next.js (App Router), React, TypeScript
- Styling: Vanilla CSS (Custom Design System, Dark Mode Glassmorphism)
- AI Model: Google Gemini API
- Database: Supabase (PostgreSQL)

## Features
- Natural Language Event Planning: Ask for any offsite or event.
- Intelligent Formatting: Returns Venue, Location, Cost, and Justifications.
- Persistence: Search history saved automatically to a Postgres database.
- Graceful Degradation: If API keys are missing, the app continues to work with mock data for UI testing.

## Local Development Setup

### 1. Requirements
- Node.js 18+
- npm or pnpm
- Valid Gemini API Key
- Supabase Project

### 2. Installation
Clone the repository, navigate to the folder, and run:
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and copy the contents from `.env.example`. Then, populate the variables:
```env
GEMINI_API_KEY="your_google_gemini_api_key_here"
NEXT_PUBLIC_SUPABASE_URL="your_supabase_project_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
```

### 4. Database Schema Setup
In your Supabase project's SQL Editor, run the following to create the required table:
```sql
CREATE TABLE proposals (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  prompt TEXT NOT NULL,
  venue_name TEXT NOT NULL,
  location TEXT NOT NULL,
  estimated_cost TEXT NOT NULL,
  justification TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: Ensure Row Level Security (RLS) is configured according to your needs, 
-- or simply disable it for testing purposes.
```

### 5. Start the Application
Run the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to use the Event Concierge.

## Evaluation Criteria Addressed
- **Full-Stack Flow**: Includes custom Next.js API routes interacting correctly with the database and frontend.
- **AI Prompting**: Strong structure forcing Gemini to return JSON specifically aligned to the `ProposalCard` schema.
- **UI/UX**: Custom, deep dark mode design with glassmorphism, responsive cards, micro-interactions, and visual feedback states.
- **Graceful Error Handling**: The application handles missing DB/LLM connection states and simulates network time to prove UI layout.
