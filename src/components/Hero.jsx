import React from 'react';
import { Zap, ShieldCheck, FileCheck, ArrowRight, Sparkles, AlertCircle, Building2 } from 'lucide-react';
import { SAMPLE_RECEIPTS } from '../data/sampleReceipts';

export default function Hero({ onSelectSample, onStartBlank, selectedCountry }) {
  const filteredSamples = SAMPLE_RECEIPTS.filter(
    (s) => !selectedCountry || s.country === selectedCountry
  );

  return (
    <div className="relative overflow-hidden pt-8 pb-10 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-48 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs text-emerald-400 font-medium mb-5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Claude Vision + Legal Writing for African Fintech</span>
          <span className="w-1 h-1 rounded-full bg-slate-500" />
          <span className="text-slate-300">Nigeria & South Africa</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Turn failed transactions into <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">firm, resolved refunds</span> in 60s.
        </h1>

        {/* Subhead */}
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal">
          Upload a receipt or debit alert. Claude extracts the session ID and references, maps the verified support email, and drafts a statutory complaint backed by regulatory SLAs.
        </p>

        {/* Key Metrics Bar */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
            <div className="text-xl font-bold text-emerald-400">&lt; 60s</div>
            <div className="text-xs text-slate-400">Upload to ready-to-send</div>
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
            <div className="text-xl font-bold text-teal-400">&gt; 95%</div>
            <div className="text-xs text-slate-400">Extraction accuracy</div>
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
            <div className="text-xl font-bold text-cyan-400">15+ Providers</div>
            <div className="text-xs text-slate-400">Verified emails & SLAs</div>
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
            <div className="text-xl font-bold text-amber-400">CBN & Ombud</div>
            <div className="text-xs text-slate-400">Automated escalation</div>
          </div>
        </div>

        {/* Reviewer / Instant Demo Action */}
        <div className="mt-8 bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 text-left shadow-xl shadow-emerald-950/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-sm font-semibold text-white">
                Reviewer 1-Click Test Drive (Sample Receipts)
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              Click any sample below to test extraction and complaint drafting immediately:
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {filteredSamples.slice(0, 3).map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => onSelectSample(sample)}
                className="group relative text-left p-3 rounded-xl bg-slate-950/80 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
                    {sample.extractedData.provider}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                    {sample.extractedData.currency === 'NGN' ? '₦' : 'R'}{sample.extractedData.amount}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-200 line-clamp-1">
                  {sample.title}
                </p>
                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {sample.subtitle}
                </p>
                <div className="mt-2.5 flex items-center text-[11px] text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Load into Dispute Desk</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </button>
            ))}
          </div>

          {/* Privacy line */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                <strong>Privacy Guaranteed:</strong> Receipts are processed in-memory and never saved to a remote server. Account numbers masked to last 4 digits.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
