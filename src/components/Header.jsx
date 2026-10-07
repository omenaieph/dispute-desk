import React from 'react';
import { ShieldCheck, Clock, BookOpen, Settings, PlusCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  selectedCountry,
  setSelectedCountry,
  onOpenSettings,
  onOpenDirectory,
  disputeCounts
}) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Value proposition */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('wizard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight text-white">Dispute Desk</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Claude AI v1
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Turn failed transactions into firm complaints under 60s
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Country Selector */}
            <div className="flex items-center bg-slate-950/80 p-0.5 rounded-lg border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setSelectedCountry('NG')}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md font-medium transition-all ${
                  selectedCountry === 'NG'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Nigeria (CBN Consumer Protection)"
              >
                <span>🇳🇬</span>
                <span className="hidden sm:inline">Nigeria</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCountry('ZA')}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md font-medium transition-all ${
                  selectedCountry === 'ZA'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="South Africa (Financial Ombud Scheme)"
              >
                <span>🇿🇦</span>
                <span className="hidden sm:inline">South Africa</span>
              </button>
            </div>

            {/* Start New Dispute */}
            <button
              type="button"
              onClick={() => setActiveTab('wizard')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'wizard'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New Dispute</span>
            </button>

            {/* Tracker */}
            <button
              type="button"
              onClick={() => setActiveTab('tracker')}
              className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'tracker'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Tracker</span>
              {disputeCounts?.total > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-slate-950 text-cyan-300">
                  {disputeCounts.total}
                </span>
              )}
              {disputeCounts?.overdue > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
              )}
            </button>

            {/* Directory Button */}
            <button
              type="button"
              onClick={onOpenDirectory}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              title="Provider Directory & Regulatory SLAs"
            >
              <BookOpen className="w-4 h-4" />
            </button>

            {/* Settings & Claude Key */}
            <button
              type="button"
              onClick={onOpenSettings}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              title="Claude API Key & Prompt Auditor"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
