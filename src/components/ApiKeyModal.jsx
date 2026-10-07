import React, { useState } from 'react';
import { Key, Sparkles, Shield, Code, CheckCircle2, AlertCircle, Copy, ExternalLink } from 'lucide-react';
import { EXTRACTION_SYSTEM_PROMPT, CLAUDE_MODELS } from '../utils/claudeService';

export default function ApiKeyModal({ isOpen, onClose, apiKey, onSaveApiKey }) {
  if (!isOpen) return null;

  const [inputKey, setInputKey] = useState(apiKey || "");
  const [activeTab, setActiveTab] = useState("settings"); // 'settings' | 'prompts'
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const handleSave = () => {
    onSaveApiKey(inputKey.trim());
    onClose();
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(EXTRACTION_SYSTEM_PROMPT);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-white">
                Claude AI Engine & Prompt Auditor
              </h3>
              <p className="text-[11px] text-slate-400">
                Claude Startups Application Technical Architecture
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            ✕
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-5 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`py-2.5 px-4 font-semibold border-b-2 transition-all ${
              activeTab === 'settings'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            API Key Configuration
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('prompts')}
            className={`py-2.5 px-4 font-semibold border-b-2 transition-all ${
              activeTab === 'prompts'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Audit Claude Prompts & Schemas
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'settings' ? (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-slate-300 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Zero-Config Reviewer Demo Mode Active</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-300">
                  You do not need to provide an API key to evaluate Dispute Desk! The application includes an offline high-fidelity Claude simulation engine with realistic sample receipts and legal complaint generation.
                </p>
              </div>

              <div>
                <label className="font-semibold text-slate-200 block mb-1.5">
                  Anthropic Claude API Key (Optional)
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    placeholder="sk-ant-api03-..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Stored solely in your browser's local session. Never sent to third-party tracking servers.
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px] block">
                  Configured Claude Specifications:
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400">Vision Model:</span>
                    <span className="text-slate-200 font-mono ml-1.5">{CLAUDE_MODELS.DEFAULT}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Endpoint:</span>
                    <span className="text-slate-200 font-mono ml-1.5">v1/messages</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Input Modality:</span>
                    <span className="text-emerald-400 font-semibold ml-1.5">Image Base64 + Text</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Output Schema:</span>
                    <span className="text-emerald-400 font-semibold ml-1.5">Strict Typed JSON</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                  Claude Vision Forensic Prompt & Schema
                </span>
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center space-x-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedPrompt ? "Copied" : "Copy Prompt"}</span>
                </button>
              </div>

              <pre className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-300 whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed">
                {EXTRACTION_SYSTEM_PROMPT}
              </pre>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-slate-300 text-[11px]">
                <span className="font-bold text-white block">Statutory Legal Prompt Engine:</span>
                <p>
                  Claude's complaint generation injects verified support routing addresses, statutory SLA hours (CBN Circular on Settlement of Failed Transactions / SA Code of Banking Practice), ASCII transaction schedules, and tone controls (Polite, Firm, Final notice).
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
          >
            Close
          </button>

          {activeTab === 'settings' && (
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-md shadow-emerald-500/20"
            >
              Save Configuration
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
