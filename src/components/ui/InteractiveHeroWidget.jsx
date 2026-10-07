import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Sparkles, CheckCircle2, ScanLine, Clock, FileText, Send } from 'lucide-react';
import { SAMPLE_RECEIPTS } from '../../data/sampleReceipts';

export default function InteractiveHeroWidget({ onSelectSample }) {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [tone, setTone] = useState("firm"); // polite | firm | final_notice

  const currentCase = SAMPLE_RECEIPTS[selectedCaseIdx] || SAMPLE_RECEIPTS[0];
  const tx = currentCase.extractedData;

  const toneSnippets = {
    polite: {
      tag: "🕊️ Polite Inquiry",
      subject: `Urgent Inquiry: Uncredited ${tx.type} (${tx.currency === 'NGN' ? '₦' : 'R'}${tx.amount})`,
      preview: `Dear Support Team,\nI am writing to log an inquiry regarding an uncredited debit of ${tx.currency === 'NGN' ? '₦' : 'R'}${tx.amount}. The funds left my account under Session ID ${tx.reference}, but the beneficiary has not received credit. Kindly investigate and effect reversal within standard guidelines.`
    },
    firm: {
      tag: "⚖️ Statutory Demand",
      subject: `FORMAL DISPUTE NOTICE: Statutory Reversal Demand [${tx.currency === 'NGN' ? '₦' : 'R'}${tx.amount}]`,
      preview: `ATTENTION: DISPUTE RESOLUTION UNIT\nUnder prevailing central banking regulations, failed electronic transactions must be resolved within mandatory SLAs. The funds (${tx.currency === 'NGN' ? '₦' : 'R'}${tx.amount}) were debited with Session ID ${tx.reference}. You are hereby required to reverse funds within 48 hours or furnish switch logs.`
    },
    final_notice: {
      tag: "🚨 Final Notice (Regulator CC)",
      subject: `FINAL NOTICE PRIOR TO OMBUDSMAN PETITION: Breach of Resolution Timelines`,
      preview: `TO: EXECUTIVE COMPLAINTS & REGULATORY COMPLIANCE\nCOPY: CONSUMER PROTECTION DIRECTORATE\nTake notice that your institution is in default of statutory reversal obligations. Disputed: ${tx.currency === 'NGN' ? '₦' : 'R'}${tx.amount} (Ref: ${tx.reference}). Failure to reverse within 24 hours will result in immediate regulatory sanctions.`
    }
  };

  const activeTone = toneSnippets[tone];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden text-left">
      {/* Interactive header tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Interactive Example
          </span>
          <span className="text-sm font-bold text-slate-900">
            See how your messy receipt turns into an official complaint letter
          </span>
        </div>

        {/* Case Selector Pills */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          {SAMPLE_RECEIPTS.slice(0, 3).map((sample, idx) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => setSelectedCaseIdx(idx)}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                selectedCaseIdx === idx
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {sample.extractedData.provider.split(" ")[0]} ({sample.extractedData.currency === 'NGN' ? '₦' : 'R'}{sample.extractedData.amount})
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left side (Scanning Receipt) | Right side (Live Morphed Letter) */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Column: Visual Scanned Receipt */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
          {/* Animated Laser Scan Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-pulse" />

          <div>
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200/60">
              <span className="font-bold text-slate-800 flex items-center">
                <ScanLine className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                Receipt Details Found
              </span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                Verified
              </span>
            </div>

            <div className="mt-3 text-center py-2 bg-white rounded-lg border border-slate-200/80">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">
                Money Debited
              </span>
              <div className="text-xl font-bold font-mono text-slate-900">
                {tx.currency === 'NGN' ? '₦' : 'R'}{tx.amount}
              </div>
              <span className="text-[10px] text-rose-700 font-semibold bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 inline-block mt-1">
                {tx.status}
              </span>
            </div>

            {/* Extracted Forensic Tags */}
            <div className="mt-3 space-y-1.5 text-[11px] font-mono">
              <div className="flex justify-between p-1.5 bg-white rounded border border-slate-200/60">
                <span className="text-slate-400">SESSION ID:</span>
                <span className="font-bold text-slate-800 truncate ml-2 max-w-[170px]">{tx.reference}</span>
              </div>
              <div className="flex justify-between p-1.5 bg-white rounded border border-slate-200/60">
                <span className="text-slate-400">RECIPIENT:</span>
                <span className="font-medium text-slate-700 truncate ml-2">{tx.recipient}</span>
              </div>
              <div className="flex justify-between p-1.5 bg-white rounded border border-slate-200/60">
                <span className="text-slate-400">SENT DIRECT TO:</span>
                <span className="font-medium text-emerald-700 truncate ml-2">Bank's Real Dispute Team</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Information read accurately</span>
            <span className="text-emerald-700 font-semibold">Ready to draft</span>
          </div>
        </div>

        {/* Right Column: Dynamic Legal Letter with Tone Switcher */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
          <div>
            {/* Tone Toggle Rail */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700">Choose your tone:</span>
              <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-md text-[11px]">
                {['polite', 'firm', 'final_notice'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={`px-2 py-1 rounded font-semibold capitalize transition-all ${
                      tone === t
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Letter Header */}
            <div className="mt-3 space-y-2">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Generated Subject Line:
                </span>
                <p className="text-xs font-mono font-bold text-slate-900 mt-0.5">
                  {activeTone.subject}
                </p>
              </div>

              <div className="p-2.5 bg-slate-50/50 rounded-lg border border-slate-200/80 text-[11px] font-mono text-slate-700 whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
                {activeTone.preview}
              </div>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Bank's Legal Deadline: <strong className="text-slate-800">48 Hours to refund you</strong>
            </span>
            <button
              type="button"
              onClick={() => onSelectSample(currentCase)}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-2xs flex items-center space-x-1.5"
            >
              <span>Test This In App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
