import SearchForm from '@/components/SearchForm';
import HistoryList from '@/components/HistoryList';

export default function Home() {
  return (
    <main className="min-h-screen w-full px-4 py-16 md:py-24 flex flex-col items-center justify-start relative z-10 overflow-x-hidden">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        
        <header className="mb-16 w-full flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center justify-center px-5 py-2 mb-4 text-xs font-bold text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            ✨ Powered by Google Gemini AI
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 drop-shadow-lg pb-2 text-center w-full">
            AI Event Concierge
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed text-center px-4">
            Eliminate the stress of planning. Describe your ideal corporate offsite, budget, and headcount, and let our intelligence plan the perfect venue instantly.
          </p>
        </header>

        <section className="mb-24 w-full flex justify-center px-2 sm:px-4">
          <div className="w-full max-w-3xl">
            <SearchForm />
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
            <h2 className="text-3xl font-bold tracking-tight text-white/90">Curated Proposals</h2>
          </div>
          <HistoryList />
        </section>
      </div>
    </main>
  );
}
