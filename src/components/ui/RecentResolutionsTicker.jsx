import React, { useState, useEffect } from 'react';
import { CheckCircle2, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';

const RESOLUTION_FEED = [
  { amount: "₦45,000", provider: "OPay", issue: "Failed NIP Transfer", time: "14m ago", city: "Lagos, NG" },
  { amount: "R1,450", provider: "Capitec", issue: "Uncredited Immediate EFT", time: "31m ago", city: "Johannesburg, ZA" },
  { amount: "₦28,500", provider: "GTBank", issue: "POS Supermarket Double Charge", time: "52m ago", city: "Abuja, NG" },
  { amount: "₦32,000", provider: "Moniepoint", issue: "Fuel Station Decline Debit", time: "1h ago", city: "Port Harcourt, NG" },
  { amount: "R3,200", provider: "FNB", issue: "ATM Dispensation Malfunction", time: "2h ago", city: "Cape Town, ZA" },
  { amount: "₦15,000", provider: "Kuda Bank", issue: "Paystack Web Checkout Glitch", time: "2h ago", city: "Ibadan, NG" },
  { amount: "₦120,000", provider: "Access Bank", issue: "Interbank Session Timeout", time: "3h ago", city: "Enugu, NG" }
];

export default function RecentResolutionsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % RESOLUTION_FEED.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = RESOLUTION_FEED[currentIndex];

  return (
    <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs text-slate-700 transition-all">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
      </span>

      <span className="font-semibold text-slate-500 hidden sm:inline">
        Live Resolutions:
      </span>

      <div className="flex items-center space-x-1.5 font-medium transition-all duration-300">
        <span className="font-bold text-slate-900 font-mono">{current.amount}</span>
        <span className="text-slate-500">refunded by</span>
        <span className="font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 text-[11px]">
          {current.provider}
        </span>
        <span className="text-slate-400 text-[11px] hidden md:inline">
          • {current.time} ({current.city})
        </span>
      </div>
    </div>
  );
}
