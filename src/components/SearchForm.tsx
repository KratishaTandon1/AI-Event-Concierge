"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import ProposalCard from "./ProposalCard";

export default function SearchForm() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [proposal, setProposal] = useState<any | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setProposal(null);
    setError("");

    try {
      const res = await fetch("/api/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate proposal.");
      }

      const data = await res.json();
      setProposal(data.proposal);
      // Dispatch custom event to trigger history reload
      window.dispatchEvent(new Event("proposal-generated"));
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative group mb-12">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-300"></div>
        <div className="relative flex flex-col sm:flex-row items-center bg-[#0f172a]/90 backdrop-blur-xl rounded-full overflow-hidden border border-white/10 shadow-2xl focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all p-1.5 pl-6 gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 50-person retreat in Miami for 3 days under $10k"
            className="flex-1 w-full bg-transparent text-white py-4 text-sm sm:text-base focus:outline-none placeholder-slate-400 font-light"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full font-semibold transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Planning...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-200 rounded-xl mb-12 backdrop-blur-sm shadow-xl flex items-center mx-auto max-w-2xl">
          <span className="bg-red-500/20 p-1.5 rounded-full mr-3"><Loader2 className="w-4 h-4 text-red-400 rotate-45" /></span>
          {error}
        </div>
      )}

      {proposal && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out mt-8">
          <div className="flex items-center justify-center gap-3 mb-8 px-4">
            <div className="h-px bg-gradient-to-r from-transparent to-blue-500/50 flex-1"></div>
            <h3 className="text-sm sm:text-lg font-medium text-blue-300 uppercase tracking-widest text-center">Analysis Complete</h3>
            <div className="h-px bg-gradient-to-l from-transparent to-blue-500/50 flex-1"></div>
          </div>
          <ProposalCard proposal={proposal} isNew />
        </div>
      )}
    </div>
  );
}
