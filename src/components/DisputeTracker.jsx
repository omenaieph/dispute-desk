import React, { useState, useEffect } from 'react';
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  Send,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  Copy,
  Mail,
  Download,
  Trash2,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertOctagon,
  Sparkles
} from 'lucide-react';
import { saveDispute, deleteDispute } from '../utils/storage';
import { REGULATORY_AUTHORITIES } from '../data/providers';
import { generateDisputePDF } from '../utils/pdfGenerator';

export default function DisputeTracker({ disputes, setDisputes, onStartNewDispute }) {
  const [filter, setFilter] = useState('all'); // all, awaiting_reply, breached, escalated, resolved
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [modalMode, setModalMode] = useState(null); // 'followup', 'escalate', 'details', 'resolve'
  const [copied, setCopied] = useState(false);
  const [resolutionNote, setResolutionNote] = useState("");
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Update clock every minute for live countdowns
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 10000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = (dispute, newStatus) => {
    const updated = { ...dispute, status: newStatus };
    const newList = saveDispute(updated);
    setDisputes(newList);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this dispute record?")) {
      const newList = deleteDispute(id);
      setDisputes(newList);
      if (selectedDispute?.id === id) {
        setSelectedDispute(null);
        setModalMode(null);
      }
    }
  };

  // Helper for countdown
  const getDeadlineInfo = (deadlineAt) => {
    if (!deadlineAt) return { isOverdue: false, text: "No deadline", diffMs: 0 };
    const deadlineMs = new Date(deadlineAt).getTime();
    const diffMs = deadlineMs - currentTime;

    if (diffMs <= 0) {
      const hoursOverdue = Math.abs(Math.round(diffMs / (3600 * 1000)));
      return {
        isOverdue: true,
        text: `Overdue by ${hoursOverdue}h`,
        hoursOverdue,
        diffMs
      };
    }

    const hours = Math.floor(diffMs / (3600 * 1000));
    const mins = Math.floor((diffMs % (3600 * 1000)) / (60 * 1000));
    return {
      isOverdue: false,
      text: `${hours}h ${mins}m remaining`,
      hours,
      mins,
      diffMs
    };
  };

  // Filter disputes
  const filteredDisputes = disputes.filter((d) => {
    if (filter === 'all') return true;
    if (filter === 'resolved') return d.status === 'resolved';
    if (filter === 'escalated') return d.status === 'escalated';
    if (filter === 'breached') {
      const deadline = getDeadlineInfo(d.deadlineAt);
      return d.status !== 'resolved' && deadline.isOverdue;
    }
    if (filter === 'awaiting_reply') {
      const deadline = getDeadlineInfo(d.deadlineAt);
      return d.status === 'awaiting_reply' && !deadline.isOverdue;
    }
    return true;
  });

  // Follow-up letter generator
  const getFollowUpDraft = (dispute) => {
    const p = dispute.provider || {};
    const primaryTx = dispute.transactions?.[0] || {};
    const country = p.country || (primaryTx.currency === "ZAR" ? "ZA" : "NG");
    const reg = REGULATORY_AUTHORITIES[country];
    const ref = primaryTx.reference || "N/A";
    const amount = `${primaryTx.currency === "ZAR" ? "R" : "₦"}${primaryTx.amount || "0.00"}`;
    const sentDate = dispute.sentAt ? new Date(dispute.sentAt).toLocaleDateString("en-GB") : "earlier";

    const subject = `URGENT FOLLOW-UP: SLA Breached on Disputed ${dispute.issueType?.label || "Transaction"} [${amount}] — Ref: ${ref}`;
    const body = `ATTENTION: CUSTOMER SERVICE & DISPUTE UNIT, ${p.name || "PROVIDER"}
Copy: Internal Escalation Supervisor

RE: NOTICE OF SLA BREACH & SECOND FORMAL DEMAND
DISPUTE ID: ${dispute.id}
PRIMARY REFERENCE: ${ref}

Dear Support Team,

I refer to my formal dispute submitted on ${sentDate} regarding the failed transaction of ${amount} (Reference: ${ref}).

Under your stated resolution guidelines and statutory requirements (${reg?.statutoryRef}), this matter was required to be investigated and resolved within ${p.slaLabel || "48 hours"}. That window has now lapsed without credit or satisfactory explanation.

Please be advised that this matter has now been queued for direct escalation to:
• Authority: ${reg?.name}
• Regulatory Contact: ${reg?.email}

Kindly treat this as an urgent notice to:
1. Provide the interbank session reversal voucher or credit log immediately.
2. Effect a full refund of ${amount} to my originating account.

Failure to resolve within the next 24 hours will leave me with no alternative but to lodge a formal regulatory complaint.

Complainant: ${dispute.userName}
Contact: ${dispute.userEmail || ""} ${dispute.userPhone || ""}`;

    return { subject, body };
  };

  // Escalation to Regulator Draft
  const getEscalationDraft = (dispute) => {
    const p = dispute.provider || {};
    const primaryTx = dispute.transactions?.[0] || {};
    const country = p.country || (primaryTx.currency === "ZAR" ? "ZA" : "NG");
    const reg = REGULATORY_AUTHORITIES[country];
    const ref = primaryTx.reference || "N/A";
    const amount = `${primaryTx.currency === "ZAR" ? "R" : "₦"}${primaryTx.amount || "0.00"}`;

    const subject = `CONSUMER PROTECTION PETITION: Unresolved Transaction Dispute against ${p.name || "Provider"} [${amount}] — Session: ${ref}`;
    const body = `TO: ${reg?.name.toUpperCase()}
EMAIL: ${reg?.email}
COPY: ${p.supportEmail || "Provider"}

PETITION FOR INTERVENTION: STATUTORY RESOLUTION WINDOW DEFAULT

Dear Regulatory Ombudsman / Consumer Protection Directorate,

I hereby lodge an official consumer grievance against ${p.name || "the financial institution"} for failure to resolve an uncredited failed transaction and breach of mandatory resolution timelines.

1. COMPLAINANT PARTICULARS:
• Full Name: ${dispute.userName}
• Contact Email: ${dispute.userEmail || "On File"}
• Contact Phone: ${dispute.userPhone || "On File"}

2. RESPONDENT INSTITUTION:
• Financial Provider: ${p.name}
• Official Contact: ${p.supportEmail}

3. TRANSACTION DOSSIER:
• Date of Incident: ${primaryTx.datetime || "N/A"}
• Disputed Amount: ${amount}
• Channel: ${primaryTx.type || "Interbank Switch"}
• Session ID / Reference: ${ref}
• Status: Debited without value delivery

4. GROUNDS FOR REGULATORY ACTION:
I formally logged a dispute with ${p.name} on ${dispute.sentAt ? new Date(dispute.sentAt).toLocaleDateString("en-GB") : "N/A"}. The mandatory statutory resolution deadline (${p.slaLabel || "48 hours"}) has lapsed without refund, violating ${reg?.statutoryRef}.

5. PRAYERS / RELIEF SOUGHT:
I respectfully request that the Directorate:
a. Compel ${p.name} to immediately reverse ${amount} to my account.
b. Investigate the failure of the automated reversal mechanism.
c. Apply statutory sanctions where default is established.

Attached: Complete Dispute Desk evidence docket, debit alert, and proof of session.

Respectfully submitted,

${dispute.userName}`;

    return { subject, body };
  };

  const handleOpenDraftModal = (dispute, mode) => {
    setSelectedDispute(dispute);
    setModalMode(mode);
  };

  const handleConfirmResolve = (dispute) => {
    const updated = {
      ...dispute,
      status: "resolved",
      resolvedAt: new Date().toISOString(),
      resolutionNotes: resolutionNote || "Funds reversed successfully to account."
    };
    const newList = saveDispute(updated);
    setDisputes(newList);
    setModalMode(null);
    setSelectedDispute(null);
    setResolutionNote("");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Tracker Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Active Case Ledger</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Dispute Tracker & Regulatory Escalator
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Track response deadlines in real time. If a provider breaches their SLA, unlock one-tap follow-ups and regulatory escalation.
          </p>
        </div>

        <button
          type="button"
          onClick={onStartNewDispute}
          className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center space-x-1.5"
        >
          <span>+ File New Dispute</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 overflow-x-auto text-xs">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
            filter === 'all' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          All Disputes ({disputes.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('awaiting_reply')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
            filter === 'awaiting_reply' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          ⏳ Awaiting Reply
        </button>
        <button
          type="button"
          onClick={() => setFilter('breached')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
            filter === 'breached' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          🚨 Overdue / SLA Breached
        </button>
        <button
          type="button"
          onClick={() => setFilter('escalated')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
            filter === 'escalated' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          ⚖️ Escalated to Regulator
        </button>
        <button
          type="button"
          onClick={() => setFilter('resolved')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
            filter === 'resolved' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          ✅ Resolved
        </button>
      </div>

      {/* Disputes List */}
      {filteredDisputes.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
          <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-300">No disputes in this view</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {filter === 'breached'
              ? "Good news! None of your providers have breached their statutory SLA window yet."
              : "Start a dispute by uploading a receipt, or view all recorded cases."}
          </p>
          <button
            type="button"
            onClick={onStartNewDispute}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow"
          >
            Start a Dispute
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDisputes.map((dispute) => {
            const p = dispute.provider || {};
            const primaryTx = dispute.transactions?.[0] || {};
            const deadline = getDeadlineInfo(dispute.deadlineAt);
            const isResolved = dispute.status === 'resolved';
            const isEscalated = dispute.status === 'escalated';

            return (
              <div
                key={dispute.id}
                className={`bg-slate-900/90 border rounded-2xl p-4 sm:p-5 transition-all shadow-lg ${
                  deadline.isOverdue && !isResolved
                    ? 'border-rose-500/40 bg-gradient-to-r from-rose-950/20 via-slate-900 to-slate-900'
                    : isResolved
                    ? 'border-emerald-500/30 bg-slate-900/60'
                    : 'border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-sm text-emerald-400 border border-slate-700">
                      {p.name ? p.name.slice(0, 2).toUpperCase() : "DD"}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-base text-white">{p.name || primaryTx.provider}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-slate-800 text-slate-300">
                          {dispute.id}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {dispute.issueType?.label} • Ref: <span className="font-mono text-slate-300">{primaryTx.reference || "N/A"}</span>
                      </p>
                    </div>
                  </div>

                  {/* Disputed Amount */}
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400 block">Disputed Amount</span>
                    <span className="text-lg font-extrabold text-white font-mono">
                      {primaryTx.currency === "ZAR" ? "R" : "₦"}{primaryTx.amount || "0.00"}
                    </span>
                  </div>
                </div>

                {/* Status & Deadline Row */}
                <div className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Status Pill */}
                    {isResolved ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Resolved & Closed
                      </span>
                    ) : isEscalated ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Escalated to Regulator
                      </span>
                    ) : deadline.isOverdue ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 font-bold animate-pulse">
                        <AlertOctagon className="w-3.5 h-3.5 mr-1 text-rose-400" /> SLA BREACHED ({deadline.text})
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-medium">
                        <Clock className="w-3.5 h-3.5 mr-1" /> Awaiting Reply ({deadline.text})
                      </span>
                    )}

                    {dispute.sentAt && (
                      <span className="text-slate-400 text-[11px]">
                        Sent on {new Date(dispute.sentAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    )}
                  </div>

                  {/* SLA progress indicator */}
                  {!isResolved && (
                    <div className="text-[11px] text-slate-400">
                      Standard SLA: <span className="text-slate-300 font-medium">{p.slaLabel || "48 Hours"}</span>
                    </div>
                  )}
                </div>

                {/* Quick Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* View Details */}
                    <button
                      type="button"
                      onClick={() => handleOpenDraftModal(dispute, 'details')}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center space-x-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Dossier</span>
                    </button>

                    {/* Download PDF Letter */}
                    <button
                      type="button"
                      onClick={() => generateDisputePDF({ dispute, complaint: dispute.complaint, provider: p })}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center space-x-1"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>Export PDF</span>
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDelete(dispute.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Delete case"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* One-tap Follow Up Draft */}
                    {!isResolved && (
                      <button
                        type="button"
                        onClick={() => handleOpenDraftModal(dispute, 'followup')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                          deadline.isOverdue
                            ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 shadow'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        }`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{deadline.isOverdue ? "Draft Urgent Follow-Up" : "Draft Follow-Up"}</span>
                      </button>
                    )}

                    {/* One-tap Escalation (Unlocks when breached or requested) */}
                    {!isResolved && !isEscalated && (
                      <button
                        type="button"
                        onClick={() => handleOpenDraftModal(dispute, 'escalate')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                          deadline.isOverdue
                            ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                            : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Escalate to Regulator</span>
                      </button>
                    )}

                    {/* Mark as Resolved */}
                    {!isResolved && (
                      <button
                        type="button"
                        onClick={() => handleOpenDraftModal(dispute, 'resolve')}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center space-x-1 shadow"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Resolved</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Drawer for Follow-up / Escalation / Details */}
      {modalMode && selectedDispute && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-4">
            {/* Modal Title */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                {modalMode === 'followup' && <Mail className="w-5 h-5 text-rose-400" />}
                {modalMode === 'escalate' && <ShieldAlert className="w-5 h-5 text-amber-400" />}
                {modalMode === 'details' && <FileText className="w-5 h-5 text-cyan-400" />}
                {modalMode === 'resolve' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                <h3 className="text-base font-bold text-white">
                  {modalMode === 'followup' && "Urgent Follow-Up Draft (Quotes Original Reference)"}
                  {modalMode === 'escalate' && "Statutory Regulator Escalation Docket"}
                  {modalMode === 'details' && `Dispute Dossier: ${selectedDispute.id}`}
                  {modalMode === 'resolve' && "Mark Dispute as Resolved"}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setModalMode(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Follow-up Mode Content */}
            {modalMode === 'followup' && (() => {
              const draft = getFollowUpDraft(selectedDispute);
              return (
                <div className="space-y-4">
                  <p className="text-xs text-slate-300">
                    This follow-up letter automatically quotes your initial dispute submission date, reference code, and provider SLA breach.
                  </p>

                  <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-2">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Subject:</span>
                      <p className="text-xs font-mono text-emerald-400 font-bold">{draft.subject}</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Body:</span>
                      <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap max-h-64 overflow-y-auto mt-1 p-2 bg-slate-900/60 rounded">
                        {draft.body}
                      </pre>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(`SUBJECT: ${draft.subject}\n\n${draft.body}`);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700 flex items-center space-x-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? "Copied!" : "Copy Follow-Up"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const to = encodeURIComponent(selectedDispute.provider?.supportEmail || "");
                        const s = encodeURIComponent(draft.subject);
                        const b = encodeURIComponent(draft.body);
                        window.location.href = `mailto:${to}?subject=${s}&body=${b}`;
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center space-x-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send in Email App</span>
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Escalate Mode Content */}
            {modalMode === 'escalate' && (() => {
              const draft = getEscalationDraft(selectedDispute);
              const p = selectedDispute.provider || {};
              const primaryTx = selectedDispute.transactions?.[0] || {};
              const country = p.country || (primaryTx.currency === "ZAR" ? "ZA" : "NG");
              const reg = REGULATORY_AUTHORITIES[country];

              return (
                <div className="space-y-4">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300">
                    <strong>Official Regulatory Escalation:</strong> This petition will be dispatched directly to <strong>{reg?.name}</strong> ({reg?.email}), invoking statutory financial conduct rules.
                  </div>

                  <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-2">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase">To Regulator:</span>
                      <p className="text-xs font-mono text-cyan-400 font-bold">{reg?.email} (CC: {p.supportEmail})</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Subject:</span>
                      <p className="text-xs font-mono text-white font-bold">{draft.subject}</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Petition Body:</span>
                      <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap max-h-64 overflow-y-auto mt-1 p-2 bg-slate-900/60 rounded">
                        {draft.body}
                      </pre>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(`TO: ${reg?.email}\nCC: ${p.supportEmail}\nSUBJECT: ${draft.subject}\n\n${draft.body}`);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700 flex items-center space-x-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? "Copied!" : "Copy Petition"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const to = encodeURIComponent(reg?.email || "");
                        const cc = encodeURIComponent(p.supportEmail || "");
                        const s = encodeURIComponent(draft.subject);
                        const b = encodeURIComponent(draft.body);
                        window.location.href = `mailto:${to}?cc=${cc}&subject=${s}&body=${b}`;
                        handleStatusChange(selectedDispute, 'escalated');
                        setModalMode(null);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center space-x-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch to Regulator & Mark Escalated</span>
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Resolve Mode Content */}
            {modalMode === 'resolve' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-300">
                  Congratulations! Record the resolution outcome for your audit trail:
                </p>

                <textarea
                  rows={3}
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  placeholder="e.g. Received full reversal of ₦45,000 to my account following the complaint."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalMode(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleConfirmResolve(selectedDispute)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center space-x-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirm Resolved</span>
                  </button>
                </div>
              </div>
            )}

            {/* Details Mode Content */}
            {modalMode === 'details' && (
              <div className="space-y-4 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Provider:</span>
                    <span className="text-white font-bold">{selectedDispute.provider?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Support Channel:</span>
                    <span className="text-slate-300 font-mono">{selectedDispute.provider?.supportEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Created At:</span>
                    <span className="text-slate-300">{new Date(selectedDispute.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="text-emerald-400 font-semibold uppercase">{selectedDispute.status}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase mb-2">Original Complaint Letter</h4>
                  <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap max-h-60 overflow-y-auto p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {`SUBJECT: ${selectedDispute.complaint?.subject}\n\n${selectedDispute.complaint?.body}`}
                  </pre>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setModalMode(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
