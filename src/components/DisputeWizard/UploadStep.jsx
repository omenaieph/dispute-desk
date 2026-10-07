import React, { useRef, useState } from 'react';
import { Upload, FileText, Image as ImageIcon, Sparkles, Shield, AlertCircle, Plus, Trash2, ArrowRight } from 'lucide-react';
import { SAMPLE_RECEIPTS } from '../../data/sampleReceipts';

export default function UploadStep({
  uploadedReceipts,
  onAddReceipt,
  onRemoveReceipt,
  onSelectSample,
  selectedCountry,
  onProceed,
  isExtracting
}) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      Array.from(e.dataTransfer.files).forEach((file) => onAddReceipt(file));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      Array.from(e.target.files).forEach((file) => onAddReceipt(file));
    }
  };

  const filteredSamples = SAMPLE_RECEIPTS.filter(
    (s) => !selectedCountry || s.country === selectedCountry
  );

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="text-center sm:text-left">
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
          <span>Step 1 of 4</span>
          <span>•</span>
          <span>Receipt Intake</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Upload Transaction Receipt or Debit Alert
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Upload a screenshot, photo, or PDF of a receipt or bank statement. Claude Vision will extract all references and session IDs.
        </p>
      </div>

      {/* Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all ${
          dragActive
            ? 'border-emerald-400 bg-emerald-500/10 scale-[1.01]'
            : 'border-slate-700/80 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-900/80'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            {isExtracting ? (
              <Sparkles className="w-7 h-7 animate-spin text-emerald-400" />
            ) : (
              <Upload className="w-7 h-7" />
            )}
          </div>

          <div>
            <p className="text-base font-semibold text-white">
              {isExtracting ? "Analyzing with Claude Vision..." : "Drag and drop receipts here"}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Supports PNG, JPG, WebP, or PDF receipts from mobile banking apps
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <button
              type="button"
              disabled={isExtracting}
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
            >
              Browse Files
            </button>
          </div>
        </div>
      </div>

      {/* Attached Receipts Multi-list */}
      {uploadedReceipts.length > 0 && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Attached Receipts ({uploadedReceipts.length})
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Another Receipt
            </button>
          </div>

          <div className="space-y-2">
            {uploadedReceipts.map((receipt, index) => (
              <div
                key={receipt.id || index}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 flex-shrink-0">
                    <FileText className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="truncate">
                    <p className="font-semibold text-white truncate">
                      {receipt.name || receipt.title || `Receipt #${index + 1}`}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {receipt.extractedData?.provider || "Ready for analysis"} • {receipt.extractedData?.currency || "NGN"} {receipt.extractedData?.amount || ""}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveReceipt(index)}
                  className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors ml-2"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviewer Sample Gallery */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Reviewer Sample Receipts (Test Instantly)
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Click to auto-populate</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filteredSamples.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => onSelectSample(sample)}
              className="text-left p-3 rounded-xl bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex items-start justify-between group"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-white group-hover:text-emerald-300">
                    {sample.extractedData.provider}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/10 text-emerald-400 rounded">
                    {sample.extractedData.currency === 'NGN' ? '₦' : 'R'}{sample.extractedData.amount}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{sample.title}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Ref: {sample.extractedData.reference.slice(0, 16)}...</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition-colors flex-shrink-0 mt-1 ml-2" />
            </button>
          ))}
        </div>
      </div>

      {/* Privacy Guarantee Note */}
      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-emerald-500/20 flex items-start space-x-3 text-xs text-slate-300">
        <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-emerald-400">Strict Privacy Assurance:</span> Receipts are parsed client-side / in-memory. No financial account numbers or personal cards are stored on external servers. All accounts are masked to the last 4 digits.
        </div>
      </div>

      {/* Primary Action Button */}
      {uploadedReceipts.length > 0 && (
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onProceed}
            disabled={isExtracting}
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2"
          >
            <span>Confirm Extracted Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
