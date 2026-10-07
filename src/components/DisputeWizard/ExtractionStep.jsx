import React, { useState } from 'react';
import { AlertCircle, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
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

  const handleChange = (field, value) => {
    const updatedExtracted = {
      ...extracted,
      [field]: value,
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
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 mb-2">
            <span>Step 2 of 4</span>
            <span>•</span>
            <span>Check Details</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Check the Details Found on Your Receipt
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Make sure your amount and reference numbers look right. You can edit any box if anything is missing or blurred.
          </p>
        </div>

        {/* Multi-receipt tabs if multiple receipts */}
        {receipts.length > 1 && (
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            {receipts.map((r, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentReceiptIndex(idx)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  idx === currentReceiptIndex
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Receipt #{idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Authentic Receipt Card */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="sticky top-24 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Receipt Preview
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Details Found
              </span>
            </div>

            <ReceiptPreviewCard
              receiptVisual={currentReceipt?.receiptVisual}
              extractedData={extracted}
            />

            <p className="text-[11px] text-slate-500 text-center bg-slate-100/70 p-2.5 rounded-lg border border-slate-200">
              💡 You can tap any box on the right to edit details before creating your complaint.
            </p>
          </div>
        </div>

        {/* Right Column: Clean Form Fields */}
        <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4 shadow-2xs">
            {/* Institution / Provider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Bank or Fintech App <span className="text-rose-500">*</span>
                </label>
                {isLowConfidence('provider') && (
                  <span className="text-[11px] text-amber-800 flex items-center bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    <AlertCircle className="w-3 h-3 mr-1 text-amber-600" /> Check Bank
                  </span>
                )}
              </div>
              <input
                type="text"
                value={extracted.provider || ""}
                onChange={(e) => handleChange('provider', e.target.value)}
                placeholder="e.g. OPay Nigeria, GTBank, Capitec"
                className={`w-full px-3 py-2 rounded-lg bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 ${
                  isLowConfidence('provider') ? 'border-amber-400 bg-amber-50/20' : 'border-slate-300'
                }`}
              />
            </div>

            {/* Amount & Currency */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Amount Stuck / Debited <span className="text-rose-500">*</span>
                  </label>
                  {isLowConfidence('amount') && (
                    <span className="text-[11px] text-amber-800 flex items-center bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <AlertCircle className="w-3 h-3 mr-1 text-amber-600" /> Review
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={extracted.amount || ""}
                  onChange={(e) => handleChange('amount', e.target.value)}
                  placeholder="e.g. 45,000.00"
                  className={`w-full px-3 py-2 rounded-lg bg-white border text-sm text-slate-900 font-mono font-semibold placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 ${
                    isLowConfidence('amount') ? 'border-amber-400 bg-amber-50/20' : 'border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Currency
                </label>
                <select
                  value={extracted.currency || "NGN"}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 font-mono font-medium"
                >
                  <option value="NGN">NGN (₦)</option>
                  <option value="ZAR">ZAR (R)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
            </div>

            {/* Session ID / RRN / Reference */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center">
                  <span>Reference Number / Session ID</span>
                  <span className="text-rose-500 ml-1">*</span>
                </label>
                {isLowConfidence('reference') && (
                  <span className="text-[11px] text-amber-800 flex items-center bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    <AlertCircle className="w-3 h-3 mr-1 text-amber-600" /> Check Reference
                  </span>
                )}
              </div>
              <input
                type="text"
                value={extracted.reference || ""}
                onChange={(e) => handleChange('reference', e.target.value)}
                placeholder="e.g. 100004241006143218009214"
                className={`w-full px-3 py-2 rounded-lg bg-white border text-sm text-slate-900 font-mono font-medium placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 ${
                  isLowConfidence('reference') ? 'border-amber-400 bg-amber-50/20' : 'border-slate-300'
                }`}
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Banks need this exact reference or session ID to track your stuck transaction in their logs.
              </p>
            </div>

            {/* Transaction Type & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  How did you pay? (Transfer, POS, Card)
                </label>
                <input
                  type="text"
                  value={extracted.type || ""}
                  onChange={(e) => handleChange('type', e.target.value)}
                  placeholder="e.g. App Transfer, POS Purchase"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Date and Time of Transaction
                </label>
                <input
                  type="text"
                  value={extracted.datetime || ""}
                  onChange={(e) => handleChange('datetime', e.target.value)}
                  placeholder="YYYY-MM-DD HH:MM:SS"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 font-mono"
                />
              </div>
            </div>

            {/* Recipient & Masked Account */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Who was the money sent to?
                  </label>
                  {isLowConfidence('recipient') && (
                    <span className="text-[11px] text-amber-800 flex items-center bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <AlertCircle className="w-3 h-3 mr-1 text-amber-600" /> Review
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={extracted.recipient || ""}
                  onChange={(e) => handleChange('recipient', e.target.value)}
                  placeholder="e.g. Chukwuemeka Obi (GTBank)"
                  className={`w-full px-3 py-2 rounded-lg bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 ${
                    isLowConfidence('recipient') ? 'border-amber-400 bg-amber-50/20' : 'border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Your Bank Account / Card (Last 4 digits)
                </label>
                <input
                  type="text"
                  value={extracted.senderAccount || ""}
                  onChange={(e) => handleChange('senderAccount', e.target.value)}
                  placeholder="e.g. ending ***4192"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 font-mono"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Status shown on your receipt
              </label>
              <input
                type="text"
                value={extracted.status || ""}
                onChange={(e) => handleChange('status', e.target.value)}
                placeholder="e.g. Successful Debit / Beneficiary Not Credited"
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition-colors flex items-center space-x-1.5 shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={onProceed}
              className="px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs flex items-center space-x-2"
            >
              <span>Next: What Happened?</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
