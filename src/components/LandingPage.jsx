import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronDown,
  Building,
  Shield,
  FileText
} from 'lucide-react';
import { PROVIDERS } from '../data/providers';
import { SAMPLE_RECEIPTS } from '../data/sampleReceipts';
import Marquee from './ui/Marquee';
import InteractiveHeroWidget from './ui/InteractiveHeroWidget';
import BeforeAfterCompare from './ui/BeforeAfterCompare';
import BentoGrid from './ui/BentoGrid';
import FundsTraceScrollPath from './ui/FundsTraceScrollPath';

function StylishReceiptIcon({ className = "w-6 h-7" }) {
  return (
    <svg
      viewBox="0 0 28 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Paper drop shadow */}
      <path
        d="M3 2.5C3 1.67157 3.67157 1 4.5 1H23.5C24.3284 1 25 1.67157 25 2.5V31.5L22 29.5L18.5 31.5L15 29.5L11.5 31.5L8 29.5L4.5 31.5L3 30V2.5Z"
        fill="#0F172A"
        fillOpacity="0.08"
        transform="translate(1, 1)"
      />
      {/* Paper body */}
      <path
        d="M3 2.5C3 1.67157 3.67157 1 4.5 1H23.5C24.3284 1 25 1.67157 25 2.5V31.5L22 29.5L18.5 31.5L15 29.5L11.5 31.5L8 29.5L4.5 31.5L3 30V2.5Z"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Bank header bar (Emerald) */}
      <rect x="6" y="4.5" width="9" height="2.5" rx="1" fill="#10B981" />
      <circle cx="21" cy="5.75" r="1.25" fill="#94A3B8" />
      {/* Perforated receipt dashed line */}
      <line x1="5.5" y1="10" x2="22.5" y2="10" stroke="#CBD5E1" strokeWidth="1.25" strokeDasharray="2 2" strokeLinecap="round" />
      {/* Transaction lines */}
      <line x1="6" y1="14" x2="16" y2="14" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="19" y1="14" x2="22" y2="14" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="17.5" x2="13" y2="17.5" stroke="#64748B" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="18" y1="17.5" x2="22" y2="17.5" stroke="#64748B" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="6" y1="21" x2="11" y2="21" stroke="#94A3B8" strokeWidth="1.25" strokeLinecap="round" />
      {/* Green circular success stamp with checkmark */}
      <circle cx="19" cy="22" r="4.25" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
      <path d="M17.2 22L18.4 23.2L20.8 20.8" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function LandingPage({ onStartDispute, onSelectSample, onOpenDirectory }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Why do bank customer care reps take so long to resolve failed transfers?",
      a: "When you send a message like 'I transferred money and my friend didn't receive it', bank reps can't do anything without technical tracking numbers (like a Session ID or RRN). Most people don't know where to find this number on their receipt. Dispute Desk extracts this code for you and writes a clear, complete complaint that quotes standard banking resolution windows."
    },
    {
      q: "Is my personal bank account information safe?",
      a: "Yes. We never ask for your bank password, PIN, or BVN. Receipts are processed via Claude's vision model and never stored on our database. Your account numbers are automatically masked (like 'ending in ***4192') so your privacy is protected."
    },
    {
      q: "What happens if my bank doesn't refund me within the expected window?",
      a: "Under regulatory frameworks like the CBN Consumer Protection Guidelines and the South African Code of Banking Practice, banks target 48 to 72 hours for inter-bank dispute resolution. Dispute Desk tracks this expected response window. If the bank fails to respond, you can escalate your case directly to the relevant regulatory ombudsman (cpd@cbn.gov.ng for Nigeria, or info@nfosa.co.za / nfosa.co.za for South Africa)."
    },
    {
      q: "Which banks and mobile apps does this work with?",
      a: "Major banks and payment apps across Nigeria and South Africa, including OPay, Moniepoint, PalmPay, Kuda, GTBank, Zenith, Access, FirstBank, UBA, Stanbic IBTC, Capitec, FNB, TymeBank, Nedbank, Standard Bank, and Discovery Bank."
    },
    {
      q: "Do I have to pay to use Dispute Desk?",
      a: "No, Dispute Desk is completely free for everyday people looking to recover their stuck funds."
    }
  ];

  return (
    <div className="bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* 1. Hero Section with Dot Grid Texture */}
      <section className="relative overflow-hidden pt-10 pb-16 border-b border-slate-200 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Mission & Claude Indicator */}
            <div className="mb-5 flex justify-center">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-850 border border-emerald-200 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Advocate for Failed African Fintech Debits</span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-700 font-medium">Powered by Claude</span>
              </div>
            </div>

            {/* Creative Stylish Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.2] sm:leading-[1.18] max-w-4xl mx-auto">
              <span className="block sm:inline">Money stuck? </span>
              <span className="text-slate-900">Turn failed debits </span>
              {/* Custom stylish receipt sticker element replacing traditional heart/emoji */}
              <span
                onClick={onStartDispute}
                className="inline-flex items-center align-middle mx-1 sm:mx-1.5 px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-sm shadow-slate-900/5 -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-200 cursor-pointer group select-none whitespace-nowrap"
                title="Upload receipt screenshot to recover funds"
              >
                <StylishReceiptIcon className="w-5 h-6 sm:w-6 sm:h-7 mr-1 sm:mr-1.5 group-hover:-rotate-3 transition-transform flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold font-mono text-slate-800 tracking-tight group-hover:text-emerald-700 transition-colors">
                  Receipt
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1.5" />
              </span>
              <span className="text-slate-900"> into </span>
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent font-black">
                refunds
              </span>
              <span className="text-slate-900"> in </span>
              <span className="inline-flex items-center text-slate-900 font-extrabold">
                <span className="underline decoration-emerald-400 decoration-wavy decoration-2">60 seconds</span>
              </span>
              .
            </h1>

            {/* Subhead */}
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              Sent money and the recipient never got it? Debited twice at a POS supermarket? Upload your receipt. We find your hidden tracking number, email the exact team at your bank, and start an official countdown for your refund.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onStartDispute}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xs flex items-center justify-center space-x-2"
              >
                <span>Start a Free Dispute</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectSample(SAMPLE_RECEIPTS[0]);
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition-all flex items-center justify-center space-x-2 shadow-2xs"
              >
                <span>Try an Example Case (₦45,000 OPay)</span>
              </button>
            </div>

            {/* Micro Trust Strip */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" /> Takes under 60 seconds
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" /> Formatted for real bank dispute teams
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" /> Referenced against Central Bank dispute guidelines
              </span>
            </div>
          </div>

          {/* Interactive Hero Widget (Simulated Scanner & Tone Morpher) */}
          <div className="mt-12 max-w-4xl mx-auto">
            <InteractiveHeroWidget onSelectSample={onSelectSample} />
          </div>
        </div>
      </section>

      {/* 2. Infinite Logo Marquee of African Institutions */}
      <Marquee />

      {/* 3. The Visceral Before vs After Comparison */}
      <BeforeAfterCompare onStartDispute={onStartDispute} />

      {/* 4. Bento Grid: 4 Superpowers */}
      <BentoGrid onStartDispute={onStartDispute} />

      {/* 5. Scroll-driven SVG Funds Trace (21st.dev Style) */}
      <FundsTraceScrollPath onStartDispute={onStartDispute} />

      {/* 6. Supported Providers & Regulatory Protection */}
      <section className="py-16 bg-slate-50/50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Full Coverage
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-900 tracking-tight">
                Supported Banks, Fintechs & Regulatory Ombudsmen
              </h2>
            </div>
            <button
              type="button"
              onClick={onOpenDirectory}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center"
            >
              <span>View complete directory with response windows</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          {/* Provider Pills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {PROVIDERS.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-slate-200 rounded-lg p-3 text-center shadow-2xs hover:border-slate-300 transition-colors"
              >
                <span className="font-bold text-xs text-slate-900 block truncate">{p.name}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">{p.slaLabel}</span>
              </div>
            ))}
          </div>

          {/* Regulatory Mandate Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-base">🇳🇬</span>
                <h4 className="text-xs font-bold text-slate-900">
                  Central Bank of Nigeria (CBN CPD)
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Guidelines target immediate reversal for intra-bank transfers and 48–72 hours for inter-bank NIP transfers under the CBN Consumer Protection Framework (Circular on Failed Transactions).
              </p>
              <div className="text-[11px] font-mono text-emerald-700 font-semibold">
                Official Escalation: cpd@cbn.gov.ng
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-base">🇿🇦</span>
                <h4 className="text-xs font-bold text-slate-900">
                  National Financial Ombud Scheme (NFOSA)
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                The National Financial Ombud Scheme South Africa (NFOSA — nfosa.co.za) investigates unresolved banking disputes under the SA Code of Banking Practice when institutions fail to resolve customer claims within standard windows.
              </p>
              <div className="text-[11px] font-mono text-emerald-700 font-semibold">
                Official Escalation: info@nfosa.co.za (nfosa.co.za)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Clear Answers
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-slate-900' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Don't let your money stay stuck.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Take 60 seconds to draft a clear, complete complaint that’s hard to ignore.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={onStartDispute}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md inline-flex items-center justify-center space-x-2 min-h-[48px]"
            >
              <span>Start Your Dispute Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
