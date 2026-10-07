import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft, RefreshCw, Eye, Edit3, ShieldAlert } from 'lucide-react';
import { PROVIDERS } from '../../data/providers';
import ReceiptPreviewCard from '../ReceiptPreviewCard';

export default function ExtractionStep({
  receipts,
  currentReceiptIndex,
  setCurrentReceiptIndex,
  onUpdateReceiptData,
  onBack,
  onProceed
}) {
  const currentReceipt = receipts[currentReceiptIndex] || receipts[0];
  const extracted = currentReceipt?.extractedData || {};
  const confidence = extracted?.confidence || {};
  const [showVisualModal, setShowVisualModal] = useState(false);

  const handleChange = (field, value) => {
    const updatedExtracted = {
      ...extracted,
      [field]: value,
      // If manually edited, mark confidence as 1.0 verified!
      confidence: {
        ...(extracted.confidence || {}),
        [field]: 1.0
      }
    };
    onUpdateReceiptData(currentReceiptIndex, updatedExtracted);
  };

  const isLowConfidence = (field) => {
    const score = confidence[field];
    return typeof score === 'number' && score < 0.8;
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <span>Step 2 of 4</span>
            <span>•</span>
            <span>Extraction Verification</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Verify Extracted Transaction Details
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Review the data extracted by Claude Vision. Fields with lower confidence are highlighted in amber for your confirmation.
          </p>
        </div>

        {/* Multi-receipt switch tabs if multiple receipts */}
        {receipts.length > 1 && (
          <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {receipts.map((r, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentReceiptIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  idx === currentReceiptIndex
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Receipt #{idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Receipt Cross-Reference */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="sticky top-24 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Receipt Cross-Reference
              </span>
              <span className="text-[11px] text-emerald-400 font-medium">
                Claude Vision Verified
              </span>
            </div>

            <ReceiptPreviewCard
              receiptVisual={currentReceipt?.receiptVisual}
              extractedData={extracted}
            />

            <div className="text-[11px] text-slate-400 text-center bg-slate-900/60 p-2 rounded-xl border border-slate-800">
              💡 Any edits you make on the right will be used directly in your official complaint letter.
            </div>
          </div>
        </div>

        {/* Right Column: Editable Fields */}
        <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            {/* Institution / Provider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Financial Provider / Bank <span className="text-rose-400">*</span>
                </label>
                {isLowConfidence('provider') && (
                  <span className="text-[10px] text-amber-400 flex items-center bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                    <AlertTriangle className="w-3 h-3 mr-1" /> Low Confidence ({Math.round(confidence.provider * 100)}%)
                  </span>
                )}
              </div>
              <input
                type="text"
                value={extracted.provider || ""}
                onChange={(e) => handleChange('provider', e.target.value)}
                placeholder="e.g. OPay Nigeria, GTBank, Capitec"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                  isLowConfidence('provider') ? 'border-amber-500/60' : 'border-slate-800'
                }`}
              />
            </div>

            {/* Amount & Currency Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Amount <span className="text-rose-400">*</span>
                  </label>
                  {isLowConfidence('amount') && (
                    <span className="text-[10px] text-amber-400 flex items-center bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                      <AlertTriangle className="w-3 h-3 mr-1" /> Review
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={extracted.amount || ""}
                  onChange={(e) => handleChange('amount', e.target.value)}
                  placeholder="e.g. 45,000.00"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                    isLowConfidence('amount') ? 'border-amber-500/60' : 'border-slate-800'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Currency
                </label>
                <select
                  value={extracted.currency || "NGN"}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-mono"
                >
                  <option value="NGN">NGN (₦)</option>
                  <option value="ZAR">ZAR (R)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
            </div>

            {/* Reference / Session ID (Crucial for African Fintech) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center">
                  <span>Reference / NIP Session ID / RRN</span>
                  <span className="text-rose-400 ml-1">*</span>
                </label>
                {isLowConfidence('reference') && (
                  <span className="text-[10px] text-amber-400 flex items-center bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                    <AlertTriangle className="w-3 h-3 mr-1" /> Review Ref
                  </span>
                )}
              </div>
              <input
                type="text"
                value={extracted.reference || ""}
                onChange={(e) => handleChange('reference', e.target.value)}
                placeholder="e.g. 100004241006143218009214"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-sm text-emerald-400 font-mono placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                  isLowConfidence('reference') ? 'border-amber-500/60' : 'border-slate-800'
                }`}
              />
              <p className="text-[11px] text-slate-400 mt-1">
                The session ID or RRN is required by banking switches to track interbank settlement.
              </p>
            </div>

            {/* Transaction Type & Date Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Transaction Type / Channel
                </label>
                <input
                  type="text"
                  value={extracted.type || ""}
                  onChange={(e) => handleChange('type', e.target.value)}
                  placeholder="e.g. NIP Transfer, POS, Web Checkout"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Transaction Date & Time
                </label>
                <input
                  type="text"
                  value={extracted.datetime || ""}
                  onChange={(e) => handleChange('datetime', e.target.value)}
                  placeholder="YYYY-MM-DD HH:MM:SS"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-mono"
                />
              </div>
            </div>

            {/* Recipient & Masked Sender Account */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Recipient / Beneficiary / Merchant
                  </label>
                  {isLowConfidence('recipient') && (
                    <span className="text-[10px] text-amber-400 flex items-center bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                      <AlertTriangle className="w-3 h-3 mr-1" /> Review
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={extracted.recipient || ""}
                  onChange={(e) => handleChange('recipient', e.target.value)}
                  placeholder="e.g. Chukwuemeka Obi (GTBank)"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                    isLowConfidence('recipient') ? 'border-amber-500/60' : 'border-slate-800'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Sender Account / Card (Masked)
                </label>
                <input
                  type="text"
                  value={extracted.senderAccount || ""}
                  onChange={(e) => handleChange('senderAccount', e.target.value)}
                  placeholder="e.g. ending ***4192"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-mono"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Receipt Indicated Status
              </label>
              <input
                type="text"
                value={extracted.status || ""}
                onChange={(e) => handleChange('status', e.target.value)}
                placeholder="e.g. Successful Debit / Beneficiary Not Credited"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
          </div>

          {/* Navigation action buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Receipts</span>
            </button>

            <button
              type="button"
              onClick={onProceed}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
            >
              <span>Next: Select Issue Type</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
