import React, { useState } from 'react';
import { ScanLine, Clock, ShieldAlert, Lock, ArrowRight, CheckCircle2, AlertOctagon } from 'lucide-react';

export default function BentoGrid({ onStartDispute }) {
  const [maskedExample, setMaskedExample] = useState(true);

  return (
    <div className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Why It Works
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Four features built to get your money back fast
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Designed to skip unhelpful bots, locate your missing transaction, and hold banks to their legal deadlines.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Card 1: Receipt Reader (7 cols) */}
          <div className="md:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-slate-300 transition-all">
            <div>
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <ScanLine className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Finds Your Hidden Tracking Numbers
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Whether it was an app transfer, a POS supermarket slip, or an ATM error, we automatically read your screenshot and extract the exact Session ID or trace number your bank needs to find your money.
              </p>
            </div>

            {/* Interactive Badge Cloud */}
            <div className="mt-5 p-3.5 bg-white rounded-xl border border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono">
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-400 block text-[9px]">TRANSFERS</span>
                <span className="font-bold text-slate-800">NIP Session ID</span>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-400 block text-[9px]">POS SLIPS</span>
                <span className="font-bold text-slate-800">STAN & RRN Code</span>
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
                Live Bank Deadline Timer
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Banks can't delay forever. The Central Bank gives them 48 to 72 hours to resolve failed transfers. We count down every hour until your refund is due.
              </p>
            </div>

            {/* Live Clock Visual Widget */}
            <div className="mt-5 p-3.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Refund Countdown
                </span>
                <span className="text-sm font-bold text-slate-900 font-mono">
                  14h 22m Remaining
                </span>
              </div>
              <span className="text-[11px] font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                48h Legal Deadline
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
                One-Click Report to Central Bank (CBN)
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                If your bank ignores the deadline or drags its feet, you get a pre-written petition sent straight to the Central Bank of Nigeria or Banking Ombudsman.
              </p>
            </div>

            <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200/80 space-y-1.5 text-[11px] font-mono">
              <div className="flex justify-between text-slate-700">
                <span>🇳🇬 Central Bank of Nigeria:</span>
                <strong className="text-emerald-700">cpd@cbn.gov.ng</strong>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>🇿🇦 Banking Ombud:</span>
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
                Your Account Details Stay 100% Private
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                We never save your receipts, statements, or banking logins on any server. Your account numbers are automatically masked so nobody can misuse your details.
              </p>
            </div>

            {/* Interactive Masking Toggle */}
            <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  How your account looks to others:
                </span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {maskedExample ? "Account ending ***4192 (Protected)" : "012849104192 (Raw Number)"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMaskedExample(!maskedExample)}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] border border-slate-200"
              >
                {maskedExample ? "View Raw Example" : "Mask Details"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
