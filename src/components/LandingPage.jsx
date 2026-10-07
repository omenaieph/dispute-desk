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
import RecentResolutionsTicker from './ui/RecentResolutionsTicker';
import InteractiveHeroWidget from './ui/InteractiveHeroWidget';
import BeforeAfterCompare from './ui/BeforeAfterCompare';
import BentoGrid from './ui/BentoGrid';

export default function LandingPage({ onStartDispute, onSelectSample, onOpenDirectory }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Why do banks and fintechs ignore my regular customer care emails?",
      a: "Customer care inboxes receive millions of vague emails like 'my money didn't deliver'. Without the interbank session ID, RRN trace, or terminal STAN, customer reps cannot locate switch logs. Dispute Desk extracts forensic proof and formats it into statutory complaint letters with regulatory references that banks are legally required to resolve."
    },
    {
      q: "Is my personal banking data and account information secure?",
      a: "100% secure. Dispute Desk processes receipts entirely in-memory on your device. We do not store your receipts, statements, or identity on remote databases. All account numbers and PANs are strictly masked to the last 4 digits (e.g. ending ***4192)."
    },
    {
      q: "What happens if the bank fails to reverse my money before their SLA expires?",
      a: "Dispute Desk tracks response deadlines down to the hour. If the institution breaches their mandatory resolution window (e.g., 48–72 hours under CBN regulations in Nigeria or 20 days under the SA Code of Banking Practice), Dispute Desk unlocks a one-tap petition directly to the Central Bank of Nigeria (cpd@cbn.gov.ng) or the South African National Financial Ombud Scheme (info@nfosa.co.za)."
    },
    {
      q: "Which banks and fintech apps are currently supported?",
      a: "We support over 16 major institutions across Nigeria and South Africa, including OPay, Moniepoint, PalmPay, Kuda, GTBank, Zenith, Access, FirstBank, UBA, Stanbic IBTC, Capitec, FNB, TymeBank, Nedbank, Standard Bank, and Discovery Bank."
    },
    {
      q: "Does Dispute Desk charge any fees to file a complaint?",
      a: "Dispute Desk v1 is completely free for everyday consumers and small merchants seeking resolution for stuck transactions."
    }
  ];

  return (
    <div className="bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* 1. Hero Section with Dot Grid Texture */}
      <section className="relative overflow-hidden pt-10 pb-16 border-b border-slate-200 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Live Resolutions Ticker Pill */}
            <div className="mb-5 flex justify-center">
              <RecentResolutionsTicker />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Money stuck? Turn failed debits into <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy decoration-2">refunds in 60 seconds</span>.
            </h1>

            {/* Subhead */}
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              Stop waiting on unanswered support chats. Upload your receipt, extract forensic session IDs, and generate a legally backed complaint with statutory response countdowns.
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
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" /> Under 60 seconds
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" /> Pre-routed to verified inboxes
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" /> CBN & Ombud SLA enforcement
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

      {/* 5. Supported Providers & Regulatory Protection */}
      <section className="py-16 bg-slate-50/50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Full Coverage
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-900 tracking-tight">
                Verified Banks, Fintechs & Regulatory Authorities
              </h2>
            </div>
            <button
              type="button"
              onClick={onOpenDirectory}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center"
            >
              <span>View complete directory with SLA terms</span>
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
                Mandates immediate reversal for intra-bank transfers and a maximum of 48–72 hours for inter-bank NIP transfers under the Consumer Protection Regulations 2019.
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
                Enforces the South African Code of Banking Practice, requiring institutions to resolve payment dispensation claims within mandatory investigation windows.
              </p>
              <div className="text-[11px] font-mono text-emerald-700 font-semibold">
                Official Escalation: info@nfosa.co.za
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
            Take 60 seconds to draft a firm, verified complaint that banks cannot ignore.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={onStartDispute}
              className="px-8 py-3.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md inline-flex items-center space-x-2"
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
