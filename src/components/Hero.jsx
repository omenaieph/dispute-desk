import React from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, Lock, FileText } from 'lucide-react';
import { SAMPLE_RECEIPTS } from '../data/sampleReceipts';

export default function Hero({ onSelectSample, onStartBlank, selectedCountry }) {
  const filteredSamples = SAMPLE_RECEIPTS.filter(
    (s) => !selectedCountry || s.country === selectedCountry
  );

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-center">
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          <span>Consumer Banking & Fintech Dispute Advocate</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">Nigeria & South Africa</span>
        </div>

        {/* Clean Editorial Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-3xl mx-auto">
          Turn failed transactions into <span className="text-emerald-700">resolved refunds</span> in under 60 seconds.
        </h1>

        {/* Subhead */}
        <p className="mt-3.5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Upload any receipt or debit alert. We extract the session ID and references, identify the verified provider dispute desk, and draft a formal complaint citing legal resolution deadlines.
        </p>

        {/* High-Trust Metrics Bar */}
        <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl mx-auto text-left">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
            <div className="text-xl font-bold text-slate-900">&lt; 60 sec</div>
            <div className="text-xs text-slate-500 mt-0.5">Upload to ready letter</div>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
            <div className="text-xl font-bold text-emerald-700">95%+</div>
            <div className="text-xs text-slate-500 mt-0.5">Forensic extraction rate</div>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
            <div className="text-xl font-bold text-slate-900">16 Providers</div>
            <div className="text-xs text-slate-500 mt-0.5">Verified escalation routing</div>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
            <div className="text-xl font-bold text-slate-900">CBN & Ombud</div>
            <div className="text-xs text-slate-500 mt-0.5">Statutory breach timers</div>
          </div>
        </div>

        {/* Clean Example Receipts Bar */}
        <div className="mt-7 bg-slate-50 border border-slate-200 rounded-xl p-4 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-200/80">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Try an Example Transaction
            </span>
            <span className="text-xs text-slate-500">
              Select a real-world case to test the extraction and complaint generator instantly:
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {filteredSamples.slice(0, 3).map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => onSelectSample(sample)}
                className="group text-left p-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {sample.extractedData.provider}
                    </span>
                    <span className="text-[11px] font-semibold font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      {sample.extractedData.currency === 'NGN' ? '₦' : 'R'}{sample.extractedData.amount}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1">
                    {sample.title}
                  </p>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-mono">
                    {sample.extractedData.reference.slice(0, 18)}...
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center text-[11px] text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Load Transaction</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </button>
            ))}
          </div>

          {/* Privacy Note */}
          <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center text-xs text-slate-500">
            <Lock className="w-3.5 h-3.5 text-slate-400 mr-1.5 flex-shrink-0" />
            <span>
              <strong>Private & Secure:</strong> All parsing runs in-memory. Sensitive account numbers are automatically masked to the last 4 digits. Zero server storage.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
