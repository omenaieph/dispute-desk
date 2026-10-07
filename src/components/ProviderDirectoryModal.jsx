import React, { useState } from 'react';
import { Search, Building, Mail, Phone, MessageSquare, Clock, Shield, Check, Copy, ExternalLink } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">
                African Fintech & Bank Support Directory
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified customer grievance emails, WhatsApp escalations, and statutory resolution windows.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg text-lg"
          >
            ✕
          </button>
        </div>

        {/* Search & Country Filter */}
        <div className="p-4 bg-slate-950/40 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search provider e.g. OPay, GTBank..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveCountry("NG")}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCountry === "NG"
                  ? "bg-emerald-600 text-white shadow"
                  : "bg-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              🇳🇬 Nigeria ({PROVIDERS.filter((p) => p.country === "NG").length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCountry("ZA")}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCountry === "ZA"
                  ? "bg-emerald-600 text-white shadow"
                  : "bg-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              🇿🇦 South Africa ({PROVIDERS.filter((p) => p.country === "ZA").length})
            </button>
          </div>
        </div>

        {/* Regulatory Escalation Notice Banner */}
        {regulator && (
          <div className="px-5 py-3 bg-emerald-500/10 border-b border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2 text-emerald-300">
              <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                <strong>Statutory Escalation Authority:</strong> {regulator.name} (<code>{regulator.email}</code>)
              </span>
            </div>
            <span className="text-[11px] text-emerald-400 font-medium">
              SLA Rule: {regulator.slaRule.slice(0, 70)}...
            </span>
          </div>
        )}

        {/* Directory Cards Grid */}
        <div className="p-5 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((provider) => (
            <div
              key={provider.id}
              className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-3 hover:border-slate-700 transition-all shadow-md"
            >
              {/* Provider Title & Type */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <span>{provider.name}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-emerald-400 font-mono">
                      {provider.country}
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{provider.type}</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-semibold border border-cyan-500/20">
                    SLA: {provider.slaLabel}
                  </span>
                </div>
              </div>

              {/* Contact Channels */}
              <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                {/* Support Email */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center space-x-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="font-mono text-[11px] truncate">{provider.supportEmail}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(provider.supportEmail)}
                    className="text-slate-400 hover:text-white p-1 ml-2 flex-shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail === provider.supportEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Escalation Email */}
                {provider.escalationEmail && (
                  <div className="flex items-center justify-between p-1.5 px-2 rounded-lg bg-slate-900/40 text-[11px]">
                    <span className="text-slate-400">Escalations:</span>
                    <span className="font-mono text-slate-300">{provider.escalationEmail}</span>
                  </div>
                )}

                {/* WhatsApp & Phone */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
                  {provider.whatsapp && (
                    <div className="truncate flex items-center space-x-1">
                      <MessageSquare className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">WA: {provider.whatsapp}</span>
                    </div>
                  )}
                  {provider.phone && (
                    <div className="truncate flex items-center space-x-1">
                      <Phone className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                      <span className="truncate">{provider.phone}</span>
                    </div>
                  )}
                </div>

                {/* In-app Path */}
                {provider.inAppPath && (
                  <div className="text-[10px] text-slate-400 bg-slate-900/40 p-1.5 rounded-lg border border-slate-800/60">
                    <span className="font-semibold text-slate-300">In-App Route:</span> {provider.inAppPath}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Total Providers Verified: {PROVIDERS.length}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
}
