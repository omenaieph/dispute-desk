import React, { useState, useEffect } from 'react';
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  Send,
  ShieldAlert,
  ArrowRight,
  Copy,
  Mail,
  Download,
  Trash2,
  FileText,
  AlertOctagon,
  Building,
  Plus
} from 'lucide-react';
import { saveDispute, deleteDispute } from '../utils/storage';
import { REGULATORY_AUTHORITIES } from '../data/providers';
import { generateDisputePDF } from '../utils/pdfGenerator';
import confetti from 'canvas-confetti';

export default function DisputeTracker({ disputes, setDisputes, onStartNewDispute }) {
  const [filter, setFilter] = useState('all');
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [modalMode, setModalMode] = useState(null); // 'followup' | 'escalate' | 'details' | 'resolve'
  const [copied, setCopied] = useState(false);
  const [resolutionNote, setResolutionNote] = useState("");
  const [currentTime, setCurrentTime] = useState(Date.now());

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

  const getDeadlineInfo = (deadlineAt) => {
    if (!deadlineAt) return { isOverdue: false, text: "No deadline", diffMs: 0 };
    const deadlineMs = new Date(deadlineAt).getTime();
    const diffMs = deadlineMs - currentTime;

    if (diffMs <= 0) {
      const hoursOverdue = Math.abs(Math.round(diffMs / (3600 * 1000)));
      return {
        isOverdue: true,
        text: `${hoursOverdue}h overdue`,
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

  const getFollowUpDraft = (dispute) => {
    const p = dispute.provider || {};
    const primaryTx = dispute.transactions?.[0] || {};
    const country = p.country || (primaryTx.currency === "ZAR" ? "ZA" : "NG");
    const reg = REGULATORY_AUTHORITIES[country];
    const ref = primaryTx.reference || "N/A";
    const amount = `${primaryTx.currency === "ZAR" ? "R" : "₦"}${primaryTx.amount || "0.00"}`;
    const sentDate = dispute.sentAt ? new Date(dispute.sentAt).toLocaleDateString("en-GB") : "earlier";

    const subject = `URGENT FOLLOW-UP: SLA Breached on Disputed ${dispute.issueType?.label || "Transaction"} [${amount}] — Ref: ${ref}`;
    const body = `ATTENTION: DISPUTE RESOLUTION UNIT, ${p.name || "PROVIDER"}
Copy: Internal Escalation Supervisor

RE: NOTICE OF SLA BREACH & SECOND FORMAL DEMAND
DISPUTE ID: ${dispute.id}
PRIMARY REFERENCE: ${ref}

Dear Support Team,

I refer to my formal dispute submitted on ${sentDate} regarding the failed transaction of ${amount} (Reference: ${ref}).

Under statutory resolution regulations (${reg?.statutoryRef}), this matter was required to be investigated and resolved within ${p.slaLabel || "48 hours"}. That window has now lapsed without credit or satisfactory explanation.

Please be advised that this case is now queued for immediate regulatory escalation to:
• Authority: ${reg?.name}
• Regulatory Contact: ${reg?.email}

Kindly treat this as an urgent notice to:
1. Provide the interbank session reversal voucher or credit log immediately.
2. Effect a full refund of ${amount} to my originating account.

Failure to resolve within 24 hours will result in a formal consumer petition being filed with ${reg?.shortName}.

Complainant: ${dispute.userName}
Contact: ${dispute.userEmail || ""} ${dispute.userPhone || ""}`;

    return { subject, body };
  };

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

PETITION FOR REGULATORY INTERVENTION: STATUTORY TIMELINE DEFAULT

Dear Consumer Protection Directorate / Ombudsman,

I hereby lodge an official consumer grievance against ${p.name || "the financial institution"} for failure to resolve an uncredited failed transaction and breach of mandatory resolution timelines.

1. COMPLAINANT PARTICULARS:
• Full Name: ${dispute.userName}
• Contact Email: ${dispute.userEmail || "On File"}
• Contact Phone: ${dispute.userPhone || "On File"}

2. RESPONDENT INSTITUTION:
• Financial Provider: ${p.name}
• Official Contact: ${p.supportEmail}

3. TRANSACTION PARTICULARS:
• Date of Incident: ${primaryTx.datetime || "N/A"}
• Disputed Amount: ${amount}
• Channel: ${primaryTx.type || "Interbank Switch"}
• Session ID / Reference: ${ref}
• Current Status: Debited without value delivery

4. GROUNDS FOR REGULATORY INTERVENTION:
I formally logged a dispute with ${p.name} on ${dispute.sentAt ? new Date(dispute.sentAt).toLocaleDateString("en-GB") : "N/A"}. The statutory resolution window (${p.slaLabel || "48 hours"}) has lapsed without refund, violating ${reg?.statutoryRef}.

5. PRAYERS / RELIEF SOUGHT:
I respectfully request that the Directorate:
a. Compel ${p.name} to immediately reverse ${amount} to my originating account.
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
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 mb-2">
            <Clock className="w-3.5 h-3.5 text-slate-600" />
            <span>Your Tracked Complaints</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Complaint Tracker & Bank Deadlines
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Keep an eye on the bank's countdown timer. If they miss their deadline, send an urgent reminder or report them to the Central Bank with one click.
          </p>
        </div>

        <button
          type="button"
          onClick={onStartNewDispute}
          className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs flex items-center justify-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Dispute</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs overflow-x-auto">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-md font-semibold whitespace-nowrap transition-all ${
            filter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Cases ({disputes.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('awaiting_reply')}
          className={`px-3 py-1.5 rounded-md font-semibold whitespace-nowrap transition-all ${
            filter === 'awaiting_reply' ? 'bg-white text-sky-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          ⏳ Awaiting Bank
        </button>
        <button
          type="button"
          onClick={() => setFilter('breached')}
          className={`px-3 py-1.5 rounded-md font-semibold whitespace-nowrap transition-all ${
            filter === 'breached' ? 'bg-white text-rose-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🚨 Bank Missed Deadline
        </button>
        <button
          type="button"
          onClick={() => setFilter('escalated')}
          className={`px-3 py-1.5 rounded-md font-semibold whitespace-nowrap transition-all ${
            filter === 'escalated' ? 'bg-white text-amber-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          ⚖️ Reported to Regulator
        </button>
        <button
          type="button"
          onClick={() => setFilter('resolved')}
          className={`px-3 py-1.5 rounded-md font-semibold whitespace-nowrap transition-all ${
            filter === 'resolved' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          ✅ Money Refunded / Resolved
        </button>
      </div>

      {/* List of Disputes */}
      {filteredDisputes.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
          <Clock className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800">No disputes in this view</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {filter === 'breached'
              ? "None of your complaints are overdue. All banks are still within their deadline."
              : "Start a complaint or change filters to see your active cases."}
          </p>
          <button
            type="button"
            onClick={onStartNewDispute}
            className="mt-4 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
          >
            Start a Dispute
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredDisputes.map((dispute) => {
            const p = dispute.provider || {};
            const primaryTx = dispute.transactions?.[0] || {};
            const deadline = getDeadlineInfo(dispute.deadlineAt);
            const isResolved = dispute.status === 'resolved';
            const isEscalated = dispute.status === 'escalated';

            return (
              <div
                key={dispute.id}
                className={`bg-white border rounded-xl p-5 transition-all shadow-2xs ${
                  deadline.isOverdue && !isResolved
                    ? 'border-rose-300 bg-rose-50/20'
                    : isResolved
                    ? 'border-emerald-200 bg-emerald-50/15'
                    : 'border-slate-200'
                }`}
              >
                {/* Top Row: Provider & Amount */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
                      {p.name ? p.name.slice(0, 2).toUpperCase() : "DD"}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-slate-900">{p.name || primaryTx.provider}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-slate-100 text-slate-600 border border-slate-200">
                          {dispute.id}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {dispute.issueType?.label} • Ref: <span className="font-mono text-slate-800 font-medium">{primaryTx.reference || "N/A"}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-slate-400 block font-medium">Amount Stuck</span>
                    <span className="text-base font-bold text-slate-900 font-mono">
                      {primaryTx.currency === "ZAR" ? "R" : "₦"}{primaryTx.amount || "0.00"}
                    </span>
                  </div>
                </div>

                {/* Middle Row: Status & Live Clock */}
                <div className="py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    {isResolved ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-700" /> Resolved (Money Recovered)
                      </span>
                    ) : isEscalated ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-600" /> Reported to Central Bank
                      </span>
                    ) : deadline.isOverdue ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-300 font-bold text-[11px]">
                        <AlertOctagon className="w-3.5 h-3.5 mr-1 text-rose-600" /> DEADLINE MISSED ({deadline.text})
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200 font-semibold text-[11px]">
                        <Clock className="w-3.5 h-3.5 mr-1 text-sky-600" /> Bank Has {deadline.text}
                      </span>
                    )}

                    {dispute.sentAt && (
                      <span className="text-slate-400 text-[11px]">
                        Sent {new Date(dispute.sentAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    )}
                  </div>

                  {!isResolved && (
                    <span className="text-[11px] text-slate-500">
                      Bank's Legal Deadline: <span className="font-semibold text-slate-700">{p.slaLabel || "48 Hours"}</span>
                    </span>
                  )}
                </div>

                {/* Action Buttons Row */}
                <div className="pt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenDraftModal(dispute, 'details')}
                      className="px-2.5 py-1.5 rounded-md text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors flex items-center space-x-1"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <span>View Letter</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => generateDisputePDF({ dispute, complaint: dispute.complaint, provider: p })}
                      className="px-2.5 py-1.5 rounded-md text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors flex items-center space-x-1"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Download PDF</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(dispute.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Delete record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {!isResolved && (
                      <button
                        type="button"
                        onClick={() => handleOpenDraftModal(dispute, 'followup')}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                          deadline.isOverdue
                            ? 'bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'
                        }`}
                      >
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span>{deadline.isOverdue ? "Send Urgent Reminder" : "Send Reminder"}</span>
                      </button>
                    )}

                    {!isResolved && !isEscalated && (
                      <button
                        type="button"
                        onClick={() => handleOpenDraftModal(dispute, 'escalate')}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                          deadline.isOverdue
                            ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-2xs'
                            : 'bg-white hover:bg-slate-50 text-amber-800 border border-amber-300'
                        }`}
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Report to Central Bank</span>
                      </button>
                    )}

                    {!isResolved && (
                      <button
                        type="button"
                        onClick={() => handleOpenDraftModal(dispute, 'resolve')}
                        className="px-3 py-1.5 rounded-md text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors flex items-center space-x-1 shadow-2xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark as Refunded</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Clean Modal for Follow-up / Escalation / Details / Resolve */}
      {modalMode && selectedDispute && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl p-6 space-y-4">
            {/* Modal Title */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                {modalMode === 'followup' && <Mail className="w-5 h-5 text-rose-600" />}
                {modalMode === 'escalate' && <ShieldAlert className="w-5 h-5 text-amber-600" />}
                {modalMode === 'details' && <FileText className="w-5 h-5 text-slate-700" />}
                {modalMode === 'resolve' && <CheckCircle2 className="w-5 h-5 text-emerald-700" />}
                <h3 className="text-base font-bold text-slate-900">
                  {modalMode === 'followup' && "Urgent Reminder to Bank (Deadline Expired)"}
                  {modalMode === 'escalate' && "Report to Central Bank (Regulator)"}
                  {modalMode === 'details' && `Complaint Letter & Details: ${selectedDispute.id}`}
                  {modalMode === 'resolve' && "Confirm Money Has Been Refunded"}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setModalMode(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Follow-up Mode Content */}
            {modalMode === 'followup' && (() => {
              const draft = getFollowUpDraft(selectedDispute);
              return (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600">
                    This reminder quotes your original dispute submission date, tracking code, and notifies the bank that their legal resolution window has expired.
                  </p>

                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 space-y-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Subject:</span>
                      <p className="text-xs font-mono text-slate-900 font-bold">{draft.subject}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Body:</span>
                      <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap max-h-60 overflow-y-auto mt-1 p-2.5 bg-white rounded border border-slate-200">
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
                      className="px-3 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 flex items-center space-x-1.5"
                    >
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>{copied ? "Copied!" : "Copy Reminder"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const to = encodeURIComponent(selectedDispute.provider?.supportEmail || "");
                        const s = encodeURIComponent(draft.subject);
                        const b = encodeURIComponent(draft.body);
                        window.location.href = `mailto:${to}?subject=${s}&body=${b}`;
                      }}
                      className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white flex items-center space-x-1.5 shadow-xs"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send via Email App</span>
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
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                    <strong>Official Regulatory Escalation:</strong> This formal report is addressed directly to <strong>{reg?.name}</strong> ({reg?.email}), reporting that the bank failed to resolve your issue within the legal deadline.
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 space-y-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">To Regulator:</span>
                      <p className="text-xs font-mono text-slate-900 font-bold">{reg?.email} (CC: {p.supportEmail})</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Subject:</span>
                      <p className="text-xs font-mono text-slate-900 font-bold">{draft.subject}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Petition Body:</span>
                      <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap max-h-60 overflow-y-auto mt-1 p-2.5 bg-white rounded border border-slate-200">
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
                      className="px-3 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 flex items-center space-x-1.5"
                    >
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>{copied ? "Copied!" : "Copy Report"}</span>
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
                      className="px-4 py-2 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white flex items-center space-x-1.5 shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Open in Email & Report Bank</span>
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Resolve Mode */}
            {modalMode === 'resolve' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-600">
                  Add a quick note on how it was resolved (e.g. money refunded to your account):
                </p>

                <textarea
                  rows={3}
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  placeholder="e.g. Received full reversal of ₦45,000 into my account following dispute submission."
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalMode(null)}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleConfirmResolve(selectedDispute)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white flex items-center space-x-1.5 shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirm Money Refunded</span>
                  </button>
                </div>
              </div>
            )}

            {/* Details Mode */}
            {modalMode === 'details' && (
              <div className="space-y-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Provider:</span>
                    <span className="text-slate-900 font-bold">{selectedDispute.provider?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Support Inbox:</span>
                    <span className="text-slate-800 font-mono">{selectedDispute.provider?.supportEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Created:</span>
                    <span className="text-slate-800">{new Date(selectedDispute.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className="text-emerald-700 font-semibold uppercase">{selectedDispute.status}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Dispute Letter Record</h4>
                  <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap max-h-56 overflow-y-auto p-3 bg-slate-50 rounded-lg border border-slate-200">
                    {`SUBJECT: ${selectedDispute.complaint?.subject}\n\n${selectedDispute.complaint?.body}`}
                  </pre>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setModalMode(null)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800"
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
