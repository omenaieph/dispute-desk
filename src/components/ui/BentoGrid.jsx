import React, { useState } from 'react';
import { ScanLine, Clock, ShieldAlert, Lock, ArrowRight, CheckCircle2, AlertOctagon } from 'lucide-react';

export default function BentoGrid({ onStartDispute }) {
  const [maskedExample, setMaskedExample] = useState(true);

  return (
    <div className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Engineered for Consumer Leverage
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Built to turn transaction disputes into refunds
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Four specialized capabilities designed to bypass automated bots and hold financial providers accountable.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Card 1: Forensic OCR (7 cols) */}
          <div className="md:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-slate-300 transition-all">
            <div>
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <ScanLine className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Forensic Session ID & Trace Extraction
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Claude Vision analyzes debit alert screenshots, bank statements, and POS slips to extract the exact NIP session IDs, STAN numbers, and RRN codes that payment switches require to locate lost funds.
              </p>
            </div>

            {/* Interactive Badge Cloud */}
            <div className="mt-5 p-3.5 bg-white rounded-xl border border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono">
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-400 block text-[9px]">INTERBANK</span>
                <span className="font-bold text-slate-800">NIP Session ID</span>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-400 block text-[9px]">POS TERMINAL</span>
                <span className="font-bold text-slate-800">STAN & RRN Trace</span>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-400 block text-[9px]">SOUTH AFRICA</span>
                <span className="font-bold text-slate-800">RTC Clearing Ref</span>
              </div>
            </div>
          </div>

          {/* Card 2: Live SLA Engine (5 cols) */}
          <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-slate-300 transition-all">
            <div>
              <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Live Statutory SLA Countdown Engine
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Tracks the institution's response window hour-by-hour according to central bank circulars.
              </p>
            </div>

            {/* Live Clock Visual Widget */}
            <div className="mt-5 p-3.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Active Mandate
                </span>
                <span className="text-sm font-bold text-slate-900 font-mono">
                  14h 22m Remaining
                </span>
              </div>
              <span className="text-[11px] font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                CBN 48h Window
              </span>
            </div>
          </div>

          {/* Card 3: Ombudsman Pipeline (5 cols) */}
          <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-slate-300 transition-all">
            <div>
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                <ShieldAlert className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Automated Regulatory Escalation
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                If the financial provider exceeds their resolution SLA without reversal, Dispute Desk unlocks an official consumer petition addressed to the regulator.
              </p>
            </div>

            <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200/80 space-y-1.5 text-[11px] font-mono">
              <div className="flex justify-between text-slate-700">
                <span>🇳🇬 Central Bank of Nigeria:</span>
                <strong className="text-emerald-700">cpd@cbn.gov.ng</strong>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>🇿🇦 National Financial Ombud:</span>
                <strong className="text-emerald-700">info@nfosa.co.za</strong>
              </div>
            </div>
          </div>

          {/* Card 4: Client-side Privacy Vault (7 cols) */}
          <div className="md:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-slate-300 transition-all">
            <div>
              <div className="w-9 h-9 rounded-lg bg-slate-200 text-slate-800 flex items-center justify-center mb-3">
                <Lock className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Client-Side Security & Zero Remote Storage
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Receipts and bank statements never touch a remote server database. Account numbers and PANs are automatically masked to the last 4 digits in-memory.
              </p>
            </div>

            {/* Interactive Masking Toggle */}
            <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  Masking Security Demonstration:
                </span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {maskedExample ? "Account ending ***4192" : "012849104192 (Raw)"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMaskedExample(!maskedExample)}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] border border-slate-200"
              >
                {maskedExample ? "Show Unmasked" : "Mask (Default)"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
