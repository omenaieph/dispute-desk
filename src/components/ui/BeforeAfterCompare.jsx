import React from 'react';
import { AlertCircle, CheckCircle2, Clock, XCircle, ShieldAlert, ArrowRight } from 'lucide-react';

export default function BeforeAfterCompare({ onStartDispute }) {
  return (
    <div className="py-16 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Why It Works
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            The difference between waiting weeks and getting resolved
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Banks treat vague support messages as inquiries. They treat Dispute Desk letters as regulatory compliance notices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Card 1: The Regular Way (Frustration & Ignored) */}
          <div className="bg-white border border-rose-200 rounded-2xl p-6 shadow-2xs relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-rose-100">
                <div className="flex items-center space-x-2 text-rose-700">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-bold text-sm">Regular Support Email / Chat</span>
                </div>
                <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  Ignored or Delayed
                </span>
              </div>

              {/* Chat Simulation */}
              <div className="mt-4 space-y-3 text-xs">
                {/* User message */}
                <div className="bg-slate-100 rounded-xl rounded-tr-none p-3 text-slate-800 ml-6">
                  <p className="font-semibold text-slate-900 mb-0.5">You:</p>
                  "Good day please, I was debited ₦45,000 since yesterday afternoon and recipient didn't get it. Please help reverse my money."
                </div>

                {/* Bank automated bot reply */}
                <div className="bg-rose-50/60 border border-rose-100 rounded-xl rounded-tl-none p-3 text-slate-700 mr-6">
                  <p className="font-bold text-rose-800 mb-0.5">Bank Support Bot:</p>
                  "Thank you for reaching out! Ticket #99104 is queued. Due to heavy traffic, our settlement team will investigate within 7–14 business days."
                </div>

                {/* 5 days later */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center text-[11px] text-slate-500 font-mono">
                  ⏳ 5 days passed with no update • Recipient still unpaid
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-rose-100 text-xs text-rose-700 font-medium flex items-center">
              <AlertCircle className="w-4 h-4 mr-1.5 flex-shrink-0" />
              <span>Result: Vague claim discarded. Weeks of anxiety and follow-ups.</span>
            </div>
          </div>

          {/* Card 2: With Dispute Desk (Authoritative & Enforced) */}
          <div className="bg-white border border-emerald-300 rounded-2xl p-6 shadow-2xs relative flex flex-col justify-between ring-1 ring-emerald-500/20">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                <div className="flex items-center space-x-2 text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                  <span className="font-bold text-sm">Dispute Desk Statutory Docket</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Legally Binding SLA
                </span>
              </div>

              {/* Letter Preview */}
              <div className="mt-4 bg-slate-900 text-white rounded-xl p-4 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between text-[11px] pb-1 border-b border-slate-800">
                  <span className="text-emerald-400 font-bold">TO: Internal Disputes & Legal Desk</span>
                  <span className="text-cyan-300">CC: cpd@cbn.gov.ng</span>
                </div>

                <p className="text-slate-200 text-[11px] leading-relaxed pt-1">
                  <strong>SUBJECT: FORMAL DISPUTE NOTICE</strong> [₦45,000.00]
                  <br />
                  Session ID: <span className="text-emerald-300">100004241006143218009214</span>
                  <br />
                  Under CBN Consumer Protection Directive 2019, failure to reverse by Thursday 14:00 triggers statutory regulatory penalties.
                </p>

                <div className="mt-2 p-2 rounded bg-slate-950 border border-slate-800 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Statutory Countdown:</span>
                  <span className="text-emerald-400 font-bold flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> 48 Hours Live SLA
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-emerald-100 text-xs text-emerald-800 font-medium flex items-center justify-between">
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1.5 flex-shrink-0 text-emerald-600" />
                Result: Prioritized resolution & automated ombudsman escalation.
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={onStartDispute}
            className="px-6 py-3 rounded-lg text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs inline-flex items-center space-x-2"
          >
            <span>File Your Formal Complaint</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
