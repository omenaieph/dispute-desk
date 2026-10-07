import React from 'react';
import { ArrowRight, ArrowLeft, MessageSquare, AlertCircle, CheckCircle2, User, Mail, Phone } from 'lucide-react';
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
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
          <span>Step 3 of 4</span>
          <span>•</span>
          <span>Nature of Grievance</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          What happened with this transaction?
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Select the dispute category that matches your experience. Claude will tailor the legal basis, settlement deadlines, and citations accordingly.
        </p>
      </div>

      {/* Issue Chips Grid */}
      <div>
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
          Select Dispute Category
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ISSUE_TYPES.map((issue) => {
            const isSelected = selectedIssue?.id === issue.id;
            return (
              <button
                key={issue.id}
                type="button"
                onClick={() => setSelectedIssue(issue)}
                className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-500/15 border-emerald-400 shadow-md shadow-emerald-500/10 scale-[1.01]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">{issue.emoji}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <h3 className={`text-sm font-bold ${isSelected ? 'text-emerald-300' : 'text-white'}`}>
                    {issue.label}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {issue.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Optional Free-text "What Happened" Notes */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center">
            <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
            <span>Additional Details / What Happened (Optional)</span>
          </label>
          <span className="text-[11px] text-slate-400">Claude will synthesize this</span>
        </div>

        <textarea
          rows={3}
          value={extraNotes}
          onChange={(e) => setExtraNotes(e.target.value)}
          placeholder="e.g. Beneficiary confirmed no credit with their bank statement. Over 48 hours have elapsed since the NIP transfer session was completed."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        />

        {/* Quick prompt suggestions */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => setExtraNotes(prev => (prev ? prev + " " : "") + "Recipient's bank confirms funds never arrived on their central switch logs.")}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-colors"
          >
            + Recipient switch confirm
          </button>
          <button
            type="button"
            onClick={() => setExtraNotes(prev => (prev ? prev + " " : "") + "Merchant terminal reported system malfunction but account was debited.")}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-colors"
          >
            + POS system malfunction
          </button>
          <button
            type="button"
            onClick={() => setExtraNotes(prev => (prev ? prev + " " : "") + "Mandatory 48-hour resolution window has expired without automated reversal.")}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-colors"
          >
            + SLA window breached
          </button>
        </div>
      </div>

      {/* Complainant Identity Form */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center space-x-2 pb-1 border-b border-slate-800">
          <User className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Account Holder Details (For Formal Letterhead)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Full Legal Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={userProfile.name}
              onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
              placeholder="e.g. Chukwuma Okafor"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Email on Bank File
            </label>
            <input
              type="email"
              value={userProfile.email}
              onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
              placeholder="e.g. chukwuma@example.com"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Registered Phone Number
            </label>
            <input
              type="tel"
              value={userProfile.phone}
              onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
              placeholder="e.g. +234 803 123 4567"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Navigation actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center space-x-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onProceed}
          className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
        >
          <span>Generate Claude Complaint</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
