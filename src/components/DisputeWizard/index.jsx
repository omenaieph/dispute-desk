import React, { useState, useEffect } from 'react';
import UploadStep from './UploadStep';
import ExtractionStep from './ExtractionStep';
import IssueStep from './IssueStep';
import DraftStep from './DraftStep';
import { ISSUE_TYPES } from '../../data/sampleReceipts';
import { findProvider } from '../../data/providers';
import { extractReceiptWithClaude, generateLocalComplaint } from '../../utils/claudeService';
import { saveDispute, getUserProfile, saveUserProfile } from '../../utils/storage';
import { Check } from 'lucide-react';

export default function DisputeWizard({
  selectedCountry,
  apiKey,
  initialSample,
  onDisputeCreated,
  onNavigateToTracker
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedReceipts, setUploadedReceipts] = useState([]);
  const [currentReceiptIndex, setCurrentReceiptIndex] = useState(0);
  const [selectedIssue, setSelectedIssue] = useState(ISSUE_TYPES[0]);
  const [extraNotes, setExtraNotes] = useState("");
  const [tone, setTone] = useState("firm");
  const [userProfile, setUserProfile] = useState(() => getUserProfile());
  const [isExtracting, setIsExtracting] = useState(false);
  const [complaint, setComplaint] = useState({ subject: "", body: "" });

  useEffect(() => {
    if (initialSample) {
      handleSelectSample(initialSample);
    }
  }, [initialSample]);

  const handleSelectSample = (sample) => {
    const receiptItem = {
      id: sample.id,
      name: sample.title,
      receiptVisual: sample.receiptVisual,
      extractedData: { ...sample.extractedData }
    };
    setUploadedReceipts([receiptItem]);
    setCurrentReceiptIndex(0);

    const issue = ISSUE_TYPES.find((i) => i.id === sample.recommendedIssue) || ISSUE_TYPES[0];
    setSelectedIssue(issue);
    if (sample.narrative) {
      setExtraNotes(sample.narrative);
    }
    setCurrentStep(2);
  };

  const handleAddReceipt = async (file) => {
    setIsExtracting(true);
    try {
      const result = await extractReceiptWithClaude({ imageFile: file, apiKey });
      const newReceipt = {
        id: `upload-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        name: file.name,
        file: file,
        extractedData: result.data
      };
      setUploadedReceipts((prev) => [...prev, newReceipt]);
      setCurrentReceiptIndex(uploadedReceipts.length);
      setCurrentStep(2);
    } catch (err) {
      console.error("Receipt extraction failed", err);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleRemoveReceipt = (index) => {
    setUploadedReceipts((prev) => prev.filter((_, i) => i !== index));
    if (currentReceiptIndex >= index && currentReceiptIndex > 0) {
      setCurrentReceiptIndex((prev) => prev - 1);
    }
  };

  const handleUpdateReceiptData = (index, updatedData) => {
    setUploadedReceipts((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        extractedData: updatedData
      };
      return copy;
    });
  };

  const primaryTx = uploadedReceipts[0]?.extractedData || {};
  const matchedProvider = findProvider(primaryTx.providerId || primaryTx.provider) || {
    id: "custom",
    name: primaryTx.provider || "Financial Institution",
    country: primaryTx.currency === "ZAR" ? "ZA" : "NG",
    supportEmail: "support@bank.com",
    slaHours: 48,
    slaLabel: "48 Hours"
  };

  useEffect(() => {
    if (currentStep === 4 && uploadedReceipts.length > 0) {
      const transactions = uploadedReceipts.map((r) => r.extractedData);
      const generated = generateLocalComplaint({
        transactions,
        issueType: selectedIssue,
        extraNotes,
        tone,
        userName: userProfile.name || "Account Holder",
        userEmail: userProfile.email || "",
        userPhone: userProfile.phone || "",
        provider: matchedProvider
      });
      setComplaint(generated);
    }
  }, [currentStep, tone, uploadedReceipts, selectedIssue, extraNotes, userProfile, matchedProvider.id]);

  const handleMarkAsSent = () => {
    saveUserProfile(userProfile);

    const now = new Date();
    const slaHours = matchedProvider.slaHours || 48;
    const deadline = new Date(now.getTime() + slaHours * 3600 * 1000);

    const newDispute = {
      id: `dd-${Date.now().toString().slice(-8)}`,
      createdAt: now.toISOString(),
      sentAt: now.toISOString(),
      deadlineAt: deadline.toISOString(),
      status: "awaiting_reply",
      country: matchedProvider.country || selectedCountry || "NG",
      providerId: matchedProvider.id,
      provider: matchedProvider,
      transactions: uploadedReceipts.map((r) => r.extractedData),
      issueType: selectedIssue,
      extraNotes,
      tone,
      complaint,
      userName: userProfile.name || "Account Holder",
      userEmail: userProfile.email || "",
      userPhone: userProfile.phone || "",
      resolutionNotes: ""
    };

    saveDispute(newDispute);
    if (onDisputeCreated) onDisputeCreated(newDispute);
    if (onNavigateToTracker) onNavigateToTracker();
  };

  const steps = [
    { num: 1, label: "Upload Receipt" },
    { num: 2, label: "Check Details" },
    { num: 3, label: "What Happened" },
    { num: 4, label: "Get Your Letter" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Clean Stepper Navigation */}
      <div className="mb-8">
        <div className="grid grid-cols-4 gap-2 border-b border-slate-200 pb-4">
          {steps.map((s) => {
            const isCurrent = currentStep === s.num;
            const isCompleted = currentStep > s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => {
                  if (s.num < currentStep || (uploadedReceipts.length > 0 && s.num <= 3)) {
                    setCurrentStep(s.num);
                  }
                }}
                disabled={s.num > currentStep && uploadedReceipts.length === 0}
                className={`text-left group transition-all select-none ${
                  s.num > currentStep && uploadedReceipts.length === 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                    isCurrent
                      ? 'bg-slate-900 text-white'
                      : isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : s.num}
                  </span>
                  <span className={`text-xs font-semibold hidden sm:inline ${
                    isCurrent ? 'text-slate-900' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                  }`}>
                    {s.label}
                  </span>
                </div>
                {/* Thin progress bar line */}
                <div className={`mt-2 h-0.5 rounded-full transition-all ${
                  isCurrent
                    ? 'bg-slate-900'
                    : isCompleted
                    ? 'bg-emerald-600'
                    : 'bg-slate-200'
                }`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Current Step */}
      {currentStep === 1 && (
        <UploadStep
          uploadedReceipts={uploadedReceipts}
          onAddReceipt={handleAddReceipt}
          onRemoveReceipt={handleRemoveReceipt}
          onSelectSample={handleSelectSample}
          selectedCountry={selectedCountry}
          onProceed={() => setCurrentStep(2)}
          isExtracting={isExtracting}
        />
      )}

      {currentStep === 2 && (
        <ExtractionStep
          receipts={uploadedReceipts}
          currentReceiptIndex={currentReceiptIndex}
          setCurrentReceiptIndex={setCurrentReceiptIndex}
          onUpdateReceiptData={handleUpdateReceiptData}
          onBack={() => setCurrentStep(1)}
          onProceed={() => setCurrentStep(3)}
        />
      )}

      {currentStep === 3 && (
        <IssueStep
          selectedIssue={selectedIssue}
          setSelectedIssue={setSelectedIssue}
          extraNotes={extraNotes}
          setExtraNotes={setExtraNotes}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          onBack={() => setCurrentStep(2)}
          onProceed={() => setCurrentStep(4)}
        />
      )}

      {currentStep === 4 && (
        <DraftStep
          complaint={complaint}
          setComplaint={setComplaint}
          tone={tone}
          setTone={setTone}
          provider={matchedProvider}
          dispute={{
            id: `DD-${Date.now().toString().slice(-6)}`,
            transactions: uploadedReceipts.map((r) => r.extractedData),
            issueType: selectedIssue,
            extraNotes,
            userName: userProfile.name || "Account Holder"
          }}
          onBack={() => setCurrentStep(3)}
          onMarkAsSent={handleMarkAsSent}
        />
      )}
    </div>
  );
}
