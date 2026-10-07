import React, { useState } from 'react';
import { Search, Building, Mail, Phone, MessageSquare, Clock, Shield, Check, Copy } from 'lucide-react';
import { PROVIDERS, REGULATORY_AUTHORITIES } from '../data/providers';

export default function ProviderDirectoryModal({ isOpen, onClose, selectedCountry }) {
  if (!isOpen) return null;

  const [search, setSearch] = useState("");
  const [activeCountry, setActiveCountry] = useState(selectedCountry || "NG");
  const [copiedEmail, setCopiedEmail] = useState("");

  const filtered = PROVIDERS.filter((p) => {
    const matchesCountry = !activeCountry || p.country === activeCountry;
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.supportEmail.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  const regulator = REGULATORY_AUTHORITIES[activeCountry];

  const handleCopy = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(""), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-white">
          <div>
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-slate-800" />
              <h3 className="text-base font-bold text-slate-900">
                Verified Bank & Fintech Dispute Directory
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified customer dispute inboxes, WhatsApp support routes, and legal resolution deadlines.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg text-lg"
          >
            ✕
          </button>
        </div>

        {/* Search & Country Tabs */}
        <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by bank or fintech name..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <div className="flex items-center space-x-1.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveCountry("NG")}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeCountry === "NG"
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
            >
              🇳🇬 Nigeria ({PROVIDERS.filter((p) => p.country === "NG").length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCountry("ZA")}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeCountry === "ZA"
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
            >
              🇿🇦 South Africa ({PROVIDERS.filter((p) => p.country === "ZA").length})
            </button>
          </div>
        </div>

        {/* Regulatory SLA Notice */}
        {regulator && (
          <div className="px-5 py-2.5 bg-emerald-50/70 border-b border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2 text-emerald-900">
              <Shield className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>
                <strong>Statutory Escalation Authority:</strong> {regulator.name} (<code>{regulator.email}</code>)
              </span>
            </div>
            <span className="text-[11px] text-emerald-800 font-medium">
              SLA Rule: {regulator.slaRule.slice(0, 65)}...
            </span>
          </div>
        )}

        {/* Directory Cards */}
        <div className="p-5 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-slate-50/40">
          {filtered.map((provider) => (
            <div
              key={provider.id}
              className="bg-white border border-slate-200 rounded-xl p-4 space-y-2.5 shadow-2xs hover:border-slate-300 transition-all"
            >
              {/* Provider Title & Type */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
                    <span>{provider.name}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-mono border border-slate-200">
                      {provider.country}
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-500">{provider.type}</p>
                </div>

                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                  SLA: {provider.slaLabel}
                </span>
              </div>

              {/* Channels */}
              <div className="space-y-1.5 text-xs text-slate-700 pt-1">
                {/* Support Email */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center space-x-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                    <span className="font-mono text-[11px] text-slate-900 font-medium truncate">{provider.supportEmail}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(provider.supportEmail)}
                    className="text-slate-400 hover:text-slate-700 p-1 ml-2 flex-shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail === provider.supportEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Escalation Email */}
                {provider.escalationEmail && (
                  <div className="flex items-center justify-between px-2 py-1 text-[11px] text-slate-600">
                    <span className="text-slate-400">Escalation unit:</span>
                    <span className="font-mono text-slate-700 font-medium">{provider.escalationEmail}</span>
                  </div>
                )}

                {/* WhatsApp & Phone */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 pt-0.5">
                  {provider.whatsapp && (
                    <div className="truncate flex items-center space-x-1">
                      <MessageSquare className="w-3 h-3 text-emerald-700 flex-shrink-0" />
                      <span className="truncate">WA: {provider.whatsapp}</span>
                    </div>
                  )}
                  {provider.phone && (
                    <div className="truncate flex items-center space-x-1">
                      <Phone className="w-3 h-3 text-slate-500 flex-shrink-0" />
                      <span className="truncate">{provider.phone}</span>
                    </div>
                  )}
                </div>

                {/* In-app Path */}
                {provider.inAppPath && (
                  <div className="text-[10px] text-slate-500 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                    <span className="font-semibold text-slate-700">App Path:</span> {provider.inAppPath}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
          <span>{PROVIDERS.length} institutions verified</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-2xs"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
}
