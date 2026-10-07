import React, { useState } from 'react';
import { Key, Shield, Code, CheckCircle2, Copy } from 'lucide-react';
import { EXTRACTION_SYSTEM_PROMPT, CLAUDE_MODELS } from '../utils/claudeService';

export default function ApiKeyModal({ isOpen, onClose, apiKey, onSaveApiKey }) {
  if (!isOpen) return null;

  const [inputKey, setInputKey] = useState(apiKey || "");
  const [activeTab, setActiveTab] = useState("settings");
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
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-2xl max-h-[94vh] sm:max-h-[90vh] flex flex-col shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-white">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              AI Engine & Architecture Specifications
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Claude Messages API integration & prompt verification
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg min-h-[36px]"
          >
            ✕
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-3 sm:px-5 text-xs overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`py-2.5 px-3 sm:px-4 font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'settings'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            API Key Configuration
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('prompts')}
            className={`py-2.5 px-4 font-semibold border-b-2 transition-all ${
              activeTab === 'prompts'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Inspect Prompts & Schemas
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'settings' ? (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-slate-700 space-y-1">
                <div className="flex items-center space-x-1.5 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Offline / Demo Simulation Active</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  You do not need to enter an API key to evaluate Dispute Desk. The application includes a high-fidelity local simulation engine that returns realistic extraction schemas and statutory complaint drafts.
                </p>
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1.5">
                  Anthropic Claude API Key (Optional)
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    placeholder="sk-ant-api03-..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 font-mono focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Stored solely in your browser's local session. Never sent to any telemetry server.
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                  Model Architecture:
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-500">Vision Model:</span>
                    <span className="text-slate-800 font-mono ml-1 font-semibold">{CLAUDE_MODELS.DEFAULT}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">API Endpoint:</span>
                    <span className="text-slate-800 font-mono ml-1">v1/messages</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Input Modality:</span>
                    <span className="text-slate-800 font-medium ml-1">Base64 Image + Text</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Output Schema:</span>
                    <span className="text-emerald-800 font-semibold ml-1">Strict JSON</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  Claude Vision System Prompt & Schema
                </span>
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center space-x-1"
                >
                  <Copy className="w-3 h-3 text-slate-500" />
                  <span>{copiedPrompt ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <pre className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] font-mono text-slate-800 whitespace-pre-wrap max-h-64 overflow-y-auto leading-relaxed">
                {EXTRACTION_SYSTEM_PROMPT}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-200 bg-white flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold"
          >
            Close
          </button>

          {activeTab === 'settings' && (
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-xs"
            >
              Save Configuration
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
