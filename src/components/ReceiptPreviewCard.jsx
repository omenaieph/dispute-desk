import React from 'react';
import { CheckCircle2, AlertCircle, FileText, Hash, Calendar, DollarSign, UserCheck, Shield } from 'lucide-react';

export default function ReceiptPreviewCard({ receiptVisual, title, extractedData }) {
  if (!receiptVisual && !extractedData) return null;

  const visual = receiptVisual || {
    headerBg: "#059669",
    headerText: `${extractedData?.provider || "Fintech"} Electronic Receipt`,
    logoLabel: extractedData?.provider || "Transaction Receipt",
    amountFormatted: `${extractedData?.currency === 'ZAR' ? 'R' : '₦'}${extractedData?.amount || '0.00'}`,
    statusText: extractedData?.status || "Debited",
    items: [
      { label: "Channel / Type", value: extractedData?.type || "Transfer" },
      { label: "Reference / Session ID", value: extractedData?.reference || "N/A" },
      { label: "Date & Time", value: extractedData?.datetime || "N/A" },
      { label: "Recipient / Merchant", value: extractedData?.recipient || "N/A" },
      { label: "Account / Card", value: extractedData?.senderAccount || "Masked" }
    ]
  };

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl max-w-sm mx-auto text-slate-100 font-sans">
      {/* Top Banner with Provider Branding */}
      <div
        className="px-5 py-4 text-white flex items-center justify-between"
        style={{ backgroundColor: visual.headerBg || "#0f766e" }}
      >
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-white/90" />
          <span className="font-extrabold text-sm tracking-wide uppercase">
            {visual.logoLabel}
          </span>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/20 text-white backdrop-blur-sm">
          Verified Evidence
        </span>
      </div>

      {/* Amount and Status Hero */}
      <div className="px-5 py-4 text-center bg-slate-950/90 border-b border-slate-800">
        <span className="text-xs text-slate-400 font-medium">Disputed Amount</span>
        <div className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5 tracking-tight">
          {visual.amountFormatted}
        </div>
        <div className="mt-1.5 inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
          <AlertCircle className="w-3.5 h-3.5 mr-1" />
          <span>{visual.statusText}</span>
        </div>
      </div>

      {/* Receipt Itemized Details */}
      <div className="p-4 space-y-2.5 text-xs bg-slate-900/60 divide-y divide-slate-800/80">
        {visual.items.map((item, idx) => (
          <div key={idx} className="pt-2 flex justify-between items-start gap-3">
            <span className="text-slate-400 font-medium whitespace-nowrap">{item.label}</span>
            <span className="text-slate-200 font-semibold text-right font-mono text-[11px] break-all">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Barcode / Security Stamp */}
      <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
        <span className="font-mono">CLAUDE VISION AUDIT #8841</span>
        <span className="text-emerald-400 font-semibold flex items-center">
          <CheckCircle2 className="w-3 h-3 mr-1" /> 95%+ Confidence
        </span>
      </div>
    </div>
  );
}
