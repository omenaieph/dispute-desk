import React, { useState, useEffect } from 'react';
import UploadStep from './UploadStep';
import ExtractionStep from './ExtractionStep';
import IssueStep from './IssueStep';
import DraftStep from './DraftStep';
import { ISSUE_TYPES } from '../../data/sampleReceipts';
import { findProvider, PROVIDERS } from '../../data/providers';
import { extractReceiptWithClaude, generateLocalComplaint } from '../../utils/claudeService';
import { saveDispute, getUserProfile, saveUserProfile } from '../../utils/storage';

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

  // Load sample if passed from Hero or button
  useEffect(() => {
    if (initialSample) {
      handleSelectSample(initialSample);
    }
  }, [initialSample]);

  // When sample is selected
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
    // Proceed to Step 2
    setCurrentStep(2);
  };

  // Add uploaded file
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

  // Compute matched provider
  const primaryTx = uploadedReceipts[0]?.extractedData || {};
  const matchedProvider = findProvider(primaryTx.providerId || primaryTx.provider) || {
    id: "custom",
    name: primaryTx.provider || "Financial Institution",
    country: primaryTx.currency === "ZAR" ? "ZA" : "NG",
    supportEmail: "support@bank.com",
    slaHours: 48,
    slaLabel: "48 Hours"
  };

  // Whenever we reach Step 4 or tone changes, recompute complaint draft
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

  // Handle Mark as Sent
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Step Progress Tracker */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />

          {[
            { step: 1, label: "Upload" },
            { step: 2, label: "Verify" },
            { step: 3, label: "Issue" },
            { step: 4, label: "Dispatch" }
          ].map((item) => (
            <div key={item.step} className="relative z-10 flex flex-col items-center">
              <button
                type="button"
                onClick={() => {
                  if (item.step < currentStep || (uploadedReceipts.length > 0 && item.step <= 3)) {
                    setCurrentStep(item.step);
                  }
                }}
                disabled={item.step > currentStep && uploadedReceipts.length === 0}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  currentStep === item.step
                    ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/20 shadow-lg shadow-emerald-500/30'
                    : currentStep > item.step
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-slate-900 text-slate-500 border border-slate-800'
                }`}
              >
                {item.step}
              </button>
              <span className={`text-[11px] mt-1.5 font-medium ${
                currentStep === item.step ? 'text-emerald-400 font-semibold' : 'text-slate-400'
              }`}>
                {item.label}
              </span>
            </div>
          ))}
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
