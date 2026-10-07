import React, { useState } from 'react';
import {
  Copy,
  Mail,
  Download,
  Send,
  CheckCircle2,
  ArrowLeft,
  Building,
  Clock,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { generateDisputePDF } from '../../utils/pdfGenerator';
import { REGULATORY_AUTHORITIES } from '../../data/providers';
import confetti from 'canvas-confetti';

export default function DraftStep({
  complaint,
  setComplaint,
  tone,
  setTone,
  provider,
  dispute,
  onBack,
  onMarkAsSent
}) {
  const [copied, setCopied] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  const handleMarkAndCelebrate = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {}
    onMarkAsSent();
  };

  const country = provider?.country || (dispute?.transactions?.[0]?.currency === "ZAR" ? "ZA" : "NG");
  const regulator = REGULATORY_AUTHORITIES[country];
  const primaryTx = dispute?.transactions?.[0] || {};

  const handleCopy = () => {
    const fullText = `SUBJECT: ${complaint.subject}\n\nTO: ${provider?.supportEmail || "Support"}\n\n${complaint.body}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleOpenEmail = () => {
    const to = encodeURIComponent(provider?.supportEmail || "");
    const subject = encodeURIComponent(complaint.subject);
    const body = encodeURIComponent(complaint.body);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  const handleDownloadPDF = () => {
    setIsExportingPDF(true);
    try {
      generateDisputePDF({ dispute, complaint, provider });
    } catch (err) {
      console.error("PDF generation failed", err);
    } finally {
      setTimeout(() => setIsExportingPDF(false), 1000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 mb-2">
            <span>Step 4 of 4</span>
            <span>•</span>
            <span>Dispatch & Enforce</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Review Your Formal Dispute Letter
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Pre-addressed to {provider?.name || "your provider's"} verified dispute unit with statutory citations and response deadlines.
          </p>
        </div>

        {/* Tone Selector */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <span className="text-slate-500 px-2 font-medium">Tone:</span>
          <button
            type="button"
            onClick={() => setTone('polite')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              tone === 'polite'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🕊️ Polite
          </button>
          <button
            type="button"
            onClick={() => setTone('firm')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              tone === 'firm'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ⚖️ Firm (Statutory)
          </button>
          <button
            type="button"
            onClick={() => setTone('final_notice')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              tone === 'final_notice'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🚨 Final Notice
          </button>
        </div>
      </div>

      {/* Institutional Metadata Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-start space-x-3 shadow-2xs">
          <div className="p-2 rounded-lg bg-slate-100 text-slate-700 flex-shrink-0">
            <Building className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Official Routing Address
            </span>
            <span className="text-xs font-bold text-slate-900 truncate block mt-0.5 font-mono">
              {provider?.supportEmail || "Support Inbox"}
            </span>
            <span className="text-[11px] text-slate-500 truncate block">
              {provider?.name || primaryTx.provider}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-start space-x-3 shadow-2xs">
          <div className="p-2 rounded-lg bg-slate-100 text-emerald-700 flex-shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Statutory SLA Window
            </span>
            <span className="text-xs font-bold text-emerald-800 block mt-0.5">
              {provider?.slaLabel || "48 Hours"} Max
            </span>
            <span className="text-[11px] text-slate-500 block">
              {regulator?.shortName} Mandate
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-start space-x-3 shadow-2xs">
          <div className="p-2 rounded-lg bg-slate-100 text-slate-700 flex-shrink-0">
            <ShieldCheck className="w-4 h-4 text-slate-700" />
          </div>
          <div className="overflow-hidden">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Regulatory Escalation CC
            </span>
            <span className="text-xs font-bold text-slate-900 truncate block mt-0.5 font-mono">
              {regulator?.email}
            </span>
            <span className="text-[11px] text-slate-500 truncate block">
              {regulator?.shortName}
            </span>
          </div>
        </div>
      </div>

      {/* Official Complaint Letterhead Card */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        {/* Subject Header */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex-shrink-0">
            Subject:
          </span>
          <input
            type="text"
            value={complaint.subject}
            onChange={(e) => setComplaint({ ...complaint, subject: e.target.value })}
            className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400 rounded px-1.5 py-0.5 font-mono"
          />
        </div>

        {/* Letter Body */}
        <div className="p-5">
          <textarea
            rows={14}
            value={complaint.body}
            onChange={(e) => setComplaint({ ...complaint, body: e.target.value })}
            className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-4 text-xs font-mono text-slate-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white resize-y"
          />
        </div>

        {/* Action Bar */}
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Copy */}
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors flex items-center space-x-1.5 shadow-2xs"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            {/* Email App */}
            <button
              type="button"
              onClick={handleOpenEmail}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors flex items-center space-x-1.5 shadow-2xs"
            >
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>Open in Email App</span>
            </button>

            {/* PDF Export */}
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isExportingPDF}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors flex items-center space-x-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>{isExportingPDF ? "Exporting PDF..." : "Download Official PDF"}</span>
            </button>
          </div>

          {/* Mark as Sent (Transitions to Tracker) */}
          <button
            type="button"
            onClick={handleMarkAndCelebrate}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors shadow-xs flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Mark as Sent & Start Resolution Tracker</span>
          </button>
        </div>
      </div>

      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition-colors flex items-center space-x-1.5 shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Edit Dispute Details</span>
        </button>
      </div>
    </div>
  );
}
