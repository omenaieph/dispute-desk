"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AlertCircle, Search, ShieldCheck, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

export default function FundsTraceScrollPath({ onStartDispute }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  // Transform stroke length from 0 to 1 as the user scrolls
  const pathLength = useTransform(scrollYProgress, [0, 0.95], [0.05, 1]);

  return (
    <section
      ref={containerRef}
      className="relative py-20 bg-slate-900 text-white overflow-hidden"
    >
      {/* Background glow and subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-emerald-400 font-medium mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Forensic Settlement Trace</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Follow the path of your <span className="text-emerald-400">stuck funds</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Scroll down to watch how Dispute Desk tracks your transaction from payment switch failure to statutory reversal.
          </p>
        </div>

        {/* Milestone Cards Timeline with Connecting SVG Path */}
        <div className="relative max-w-3xl mx-auto space-y-28 py-6">
          {/* Animated SVG Path in background */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 -translate-x-1/2 w-24 pointer-events-none z-0">
            <svg
              viewBox="0 0 100 800"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              {/* Static background guide track */}
              <path
                d="M 50 0 Q 80 200, 50 350 T 50 650 T 50 800"
                stroke="#1e293b"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Animated drawing stroke following scroll */}
              <motion.path
                d="M 50 0 Q 80 200, 50 350 T 50 650 T 50 800"
                stroke="#10b981"
                strokeWidth="6"
                strokeLinecap="round"
                style={{
                  pathLength,
                }}
              />
            </svg>
          </div>

          {/* Node 1: The Failed Debit */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="sm:w-5/12 bg-slate-950/90 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-sm">
              <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>Stage 1: The Stuck Debit</span>
              </div>
              <h3 className="text-base font-bold text-white">Funds leave your account</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                You receive a debit alert of ₦45,000, but the recipient's bank account receives zero credit. The money is lodged in interbank transit.
              </p>
              <div className="mt-3 p-2 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                Status: Debited at Origin / Uncredited
              </div>
            </div>

            {/* Central Node Badge */}
            <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-500/20 sm:mx-auto flex-shrink-0">
              01
            </div>

            <div className="hidden sm:block sm:w-5/12" />
          </div>

          {/* Node 2: Forensic Switch Extraction */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="hidden sm:block sm:w-5/12" />

            {/* Central Node Badge */}
            <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-500/20 sm:mx-auto flex-shrink-0">
              02
            </div>

            <div className="sm:w-5/12 bg-slate-950/90 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-sm">
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Search className="w-4 h-4 flex-shrink-0" />
                <span>Stage 2: Switch Forensic Scan</span>
              </div>
              <h3 className="text-base font-bold text-white">Session ID & Trace Locked</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Dispute Desk extracts the 24-digit NIP Session ID or terminal STAN code from your screenshot. Without this code, banks discard complaints.
              </p>
              <div className="mt-3 p-2 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300 truncate">
                Session: 100004241006143218009214
              </div>
            </div>
          </div>

          {/* Node 3: Statutory SLA Countdown */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="sm:w-5/12 bg-slate-950/90 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-sm">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>Stage 3: Legal Reversal Mandate</span>
              </div>
              <h3 className="text-base font-bold text-white">48-Hour Statutory Clock</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                The formal complaint lands in the verified dispute desk inbox, CC'ing the Central Bank of Nigeria Consumer Protection Dept. A 48h timer begins.
              </p>
              <div className="mt-3 p-2 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-amber-300">
                Rule: CBN Consumer Regulations 2019
              </div>
            </div>

            {/* Central Node Badge */}
            <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-500/20 sm:mx-auto flex-shrink-0">
              03
            </div>

            <div className="hidden sm:block sm:w-5/12" />
          </div>

          {/* Node 4: Funds Resolved */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="hidden sm:block sm:w-5/12" />

            {/* Central Node Badge */}
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-sm shadow-lg shadow-emerald-500/30 sm:mx-auto flex-shrink-0">
              ✓
            </div>

            <div className="sm:w-5/12 bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-emerald-500/40 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Stage 4: Reversal Credited</span>
              </div>
              <h3 className="text-base font-bold text-white">Money Back in Your Account</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Faced with verified session proof and regulatory escalation risk, the bank processes the reversal voucher. Funds return safely to your balance.
              </p>
              <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="font-mono text-emerald-400 font-bold">+₦45,000.00 REFUNDED</span>
                <span className="text-[10px] text-slate-400">Case Resolved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={onStartDispute}
            className="px-7 py-3.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20 inline-flex items-center space-x-2"
          >
            <span>Start Tracking Your Stuck Funds</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
