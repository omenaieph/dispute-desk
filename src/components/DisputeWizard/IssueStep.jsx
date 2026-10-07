import React from 'react';
import { ArrowRight, ArrowLeft, MessageSquare, Check, User } from 'lucide-react';
import { ISSUE_TYPES } from '../../data/sampleReceipts';

export default function IssueStep({
  selectedIssue,
  setSelectedIssue,
  extraNotes,
  setExtraNotes,
  userProfile,
  setUserProfile,
  onBack,
  onProceed
}) {
  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div>
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 mb-2">
          <span>Step 3 of 4</span>
          <span>•</span>
          <span>Dispute Classification</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          What is the nature of this dispute?
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Select the category that best matches your situation. We will tailor the regulatory citations, demand terms, and settlement expectations accordingly.
        </p>
      </div>

      {/* Clean Issue Cards Grid */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
          Dispute Category
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ISSUE_TYPES.map((issue) => {
            const isSelected = selectedIssue?.id === issue.id;
            return (
              <button
                key={issue.id}
                type="button"
                onClick={() => setSelectedIssue(issue)}
                className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">{issue.emoji}</span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <h3 className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {issue.label}
                  </h3>
                  <p className={`text-xs mt-1 leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {issue.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Additional Narrative Notes */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center">
            <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
            <span>Additional Incident Notes (Optional)</span>
          </label>
          <span className="text-[11px] text-slate-400">Synthesized into formal complaint</span>
        </div>

        <textarea
          rows={3}
          value={extraNotes}
          onChange={(e) => setExtraNotes(e.target.value)}
          placeholder="e.g. Beneficiary confirms zero credit on their account statement. Over 48 hours have elapsed since the NIP session confirmation."
          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
        />

        {/* Quick prompt helper pills */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          <button
            type="button"
            onClick={() => setExtraNotes(prev => (prev ? prev + " " : "") + "Recipient's bank confirms funds never arrived on their central switch logs.")}
            className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 transition-colors"
          >
            + Beneficiary switch uncredited
          </button>
          <button
            type="button"
            onClick={() => setExtraNotes(prev => (prev ? prev + " " : "") + "POS merchant terminal printed an issuer timeout slip but my account was debited.")}
            className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 transition-colors"
          >
            + POS timeout / dispensation error
          </button>
          <button
            type="button"
            onClick={() => setExtraNotes(prev => (prev ? prev + " " : "") + "Statutory 48-hour resolution window has expired without automated reversal.")}
            className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 transition-colors"
          >
            + 48-hour SLA breach
          </button>
        </div>
      </div>

      {/* Complainant Identity */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-3 shadow-2xs">
        <div className="flex items-center space-x-2 pb-1 border-b border-slate-100">
          <User className="w-4 h-4 text-slate-600" />
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Complainant Details (For Official Letterhead)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Account Holder Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={userProfile.name}
              onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
              placeholder="e.g. Babatunde Adeleke"
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Email on Account
            </label>
            <input
              type="email"
              value={userProfile.email}
              onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
              placeholder="e.g. babatunde@example.com"
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Registered Phone Number
            </label>
            <input
              type="tel"
              value={userProfile.phone}
              onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
              placeholder="e.g. +234 803 555 0192"
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 font-mono"
            />
          </div>
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
          <span>Generate Formal Complaint</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
