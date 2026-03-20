import { MapPin, DollarSign, CheckCircle2, Calendar, Target } from "lucide-react";

interface ProposalData {
  id?: string;
  prompt?: string;
  venue_name: string;
  location: string;
  estimated_cost: string;
  justification: string;
  created_at?: string;
}

export default function ProposalCard({
  proposal,
  isNew = false,
}: {
  proposal: ProposalData;
  isNew?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-[#0f172a]/80 backdrop-blur-xl border border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-1 ${
        isNew ? "ring-1 ring-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.15)]" : ""
      }`}
    >
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -inset-px bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-blue-500/20 transition-colors duration-500"></div>
      
      <div className="p-6 sm:p-8">
        {proposal.prompt && !isNew && (
          <div className="mb-6 flex items-start gap-3">
            <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
              <Target className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-1.5">User Request</p>
              <p className="text-sm text-slate-300 italic leading-relaxed">"{proposal.prompt}"</p>
            </div>
          </div>
        )}

        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight drop-shadow-sm">
          {proposal.venue_name}
        </h3>

        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center text-sm font-medium text-blue-200 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20 backdrop-blur-md">
            <MapPin className="w-4 h-4 mr-2" />
            {proposal.location}
          </div>
          <div className="flex items-center text-sm font-medium text-emerald-200 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 backdrop-blur-md">
            <DollarSign className="w-4 h-4 mr-1.5" />
            {proposal.estimated_cost}
          </div>
        </div>

        <div className="bg-[#1e293b]/50 rounded-xl p-5 border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 pointer-events-none"></div>
          <h4 className="flex items-center text-sm font-semibold text-purple-300 mb-3 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Why it fits perfectly
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed relative z-10">
            {proposal.justification}
          </p>
        </div>
        
        {proposal.created_at && (
          <div className="mt-6 text-xs text-slate-500 font-medium flex items-center justify-end opacity-60 group-hover:opacity-100 transition-opacity">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            {new Date(proposal.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        )}
      </div>
    </div>
  );
}
