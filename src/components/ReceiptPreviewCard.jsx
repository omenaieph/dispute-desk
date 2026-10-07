import React from 'react';
import { Shield, AlertCircle, CheckCircle2, FileText } from 'lucide-react';

export default function ReceiptPreviewCard({ receiptVisual, title, extractedData }) {
  if (!receiptVisual && !extractedData) return null;

  const visual = receiptVisual || {
    headerBg: "#0f172a",
    headerText: `${extractedData?.provider || "Bank"} Transaction Record`,
    logoLabel: extractedData?.provider || "Receipt Record",
    amountFormatted: `${extractedData?.currency === 'ZAR' ? 'R' : '₦'}${extractedData?.amount || '0.00'}`,
    statusText: extractedData?.status || "Debited",
    items: [
      { label: "Channel / Type", value: extractedData?.type || "Transfer" },
      { label: "Session ID / Ref", value: extractedData?.reference || "N/A" },
      { label: "Date & Time", value: extractedData?.datetime || "N/A" },
      { label: "Recipient / Merchant", value: extractedData?.recipient || "N/A" },
      { label: "Originating Account", value: extractedData?.senderAccount || "Masked" }
    ]
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs max-w-sm mx-auto text-slate-800 font-sans">
      {/* Top Header with Institution Accent */}
      <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-bold text-xs tracking-wider uppercase">
            {visual.logoLabel}
          </span>
        </div>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300">
          Electronic Receipt
        </span>
      </div>

      {/* Disputed Amount Banner */}
      <div className="px-5 py-4 text-center bg-slate-50/70 border-b border-slate-200">
        <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
          Disputed Transaction
        </span>
        <div className="text-2xl font-bold text-slate-900 mt-0.5 tracking-tight font-mono">
          {visual.amountFormatted}
        </div>
        <div className="mt-1.5 inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          <AlertCircle className="w-3 h-3 mr-0.5" />
          <span>{visual.statusText}</span>
        </div>
      </div>

      {/* Itemized Table */}
      <div className="p-4 space-y-2 text-xs divide-y divide-slate-100">
        {visual.items.map((item, idx) => (
          <div key={idx} className="pt-2 flex justify-between items-start gap-2">
            <span className="text-slate-500 font-medium whitespace-nowrap">{item.label}</span>
            <span className="text-slate-900 font-semibold text-right font-mono text-[11px] break-all">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Perforated Divider Simulation */}
      <div className="relative py-1 bg-slate-50/50 border-t border-dashed border-slate-300">
        <div className="px-4 py-1.5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>FORENSIC RECEIPT DOCKET</span>
          <span className="text-emerald-700 font-semibold flex items-center">
            <CheckCircle2 className="w-3 h-3 mr-1" /> References Verified
          </span>
        </div>
      </div>
    </div>
  );
}
