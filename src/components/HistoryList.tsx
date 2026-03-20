"use client";

import { useEffect, useState } from "react";
import ProposalCard from "./ProposalCard";
import { Loader2, RefreshCcw, Sparkles } from "lucide-react";

export default function HistoryList() {
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/history");
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history || []);
      }
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();

    const handleNewProposal = () => {
      fetchHistory();
    };

    window.addEventListener("proposal-generated", handleNewProposal);
    return () => window.removeEventListener("proposal-generated", handleNewProposal);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center p-16 border border-dashed border-white/10 rounded-2xl text-slate-400 bg-[#0f172a]/40 backdrop-blur-sm">
        <Sparkles className="w-8 h-8 mx-auto mb-4 text-slate-600" />
        <p>No previous proposals found. Start planning above!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button 
          onClick={fetchHistory}
          className="text-sm font-medium text-slate-400 hover:text-white flex items-center gap-2 transition-colors py-2 px-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/5"
        >
          <RefreshCcw className="w-4 h-4" /> Refresh History
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {history.map((item) => (
          <ProposalCard key={item.id} proposal={item} />
        ))}
      </div>
    </div>
  );
}
