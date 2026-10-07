import React, { useRef, useState } from 'react';
import { Upload, FileText, Lock, Plus, Trash2, ArrowRight, Loader2 } from 'lucide-react';
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
      <div>
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 mb-2">
          <span>Step 1 of 4</span>
          <span>•</span>
          <span>Upload Receipt</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Upload Transaction Receipt or Debit Alert
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Upload a screenshot or PDF from your banking app. We'll automatically find the bank name, reference number, and amount.
        </p>
      </div>

      {/* Upload Box */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 sm:p-10 text-center transition-all ${
          dragActive
            ? 'border-emerald-600 bg-emerald-50/50'
            : 'border-slate-300 bg-slate-50/60 hover:bg-slate-50 hover:border-slate-400'
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

        <div className="max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 mx-auto rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-700">
            {isExtracting ? (
              <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
            ) : (
              <Upload className="w-6 h-6 text-slate-600" />
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              {isExtracting ? "Reading your receipt details..." : "Drop your receipt screenshot here, or browse"}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Supports screenshots or PDFs from any bank or fintech app
            </p>
          </div>

          <div className="pt-1">
            <button
              type="button"
              disabled={isExtracting}
              onClick={() => fileInputRef.current?.click()}
              className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-2xs disabled:opacity-50 min-h-[44px]"
            >
              Choose File from Device
            </button>
          </div>
        </div>
      </div>

      {/* Attached Receipts List */}
      {uploadedReceipts.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Uploaded Receipts ({uploadedReceipts.length})
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Another Receipt
            </button>
          </div>

          <div className="space-y-2">
            {uploadedReceipts.map((receipt, index) => (
              <div
                key={receipt.id || index}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 flex-shrink-0">
                    <FileText className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="truncate">
                    <p className="font-semibold text-slate-900 truncate">
                      {receipt.name || receipt.title || `Receipt #${index + 1}`}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {receipt.extractedData?.provider || "Found"} • {receipt.extractedData?.currency || "NGN"} {receipt.extractedData?.amount || ""}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveReceipt(index)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors ml-2"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Example Cases Gallery */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2.5 gap-1">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Or Try with a Sample Receipt
          </span>
          <span className="text-[11px] text-slate-500">Click any sample to test instantly</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filteredSamples.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => onSelectSample(sample)}
              className="text-left p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-slate-300 transition-all flex items-center justify-between group min-h-[44px]"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-900">
                    {sample.extractedData.provider}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-white text-slate-700 rounded border border-slate-200 font-mono">
                    {sample.extractedData.currency === 'NGN' ? '₦' : 'R'}{sample.extractedData.amount}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{sample.title}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 transition-colors flex-shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>

      {/* Privacy Line */}
      <div className="p-3 rounded-lg bg-slate-100/70 border border-slate-200 flex items-start space-x-2.5 text-xs text-slate-600">
        <Lock className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-800">100% Private & Safe:</span> Your receipt is read securely. We never store your full bank account or card number, and sensitive numbers are masked.
        </div>
      </div>

      {/* Primary Action Button */}
      {uploadedReceipts.length > 0 && (
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onProceed}
            disabled={isExtracting}
            className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs flex items-center justify-center space-x-2 min-h-[48px]"
          >
            <span>Review Found Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
