import React from 'react';
import { Shield, Clock, BookOpen, Settings, Plus, AlertCircle } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  selectedCountry,
  setSelectedCountry,
  onOpenSettings,
  onOpenDirectory,
  disputeCounts
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <div
            className="flex items-center space-x-3 cursor-pointer group select-none"
            onClick={() => setActiveTab('wizard')}
          >
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs group-hover:bg-slate-800 transition-colors">
              <Shield className="w-5 h-5 text-emerald-400 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base tracking-tight text-slate-900">
                  Dispute Desk
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                  Africa Fintech
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">
                Automated Transaction Dispute & Escalation
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Country Segmented Control */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setSelectedCountry('NG')}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md font-semibold transition-all ${
                  selectedCountry === 'NG'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Nigeria (CBN Consumer Protection)"
              >
                <span>🇳🇬</span>
                <span className="hidden sm:inline">Nigeria</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCountry('ZA')}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md font-semibold transition-all ${
                  selectedCountry === 'ZA'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="South Africa (Financial Ombud Scheme)"
              >
                <span>🇿🇦</span>
                <span className="hidden sm:inline">South Africa</span>
              </button>
            </div>

            {/* Navigation Switch */}
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={() => setActiveTab('wizard')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'wizard'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Dispute</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('tracker')}
                className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'tracker'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Tracker</span>
                {disputeCounts?.total > 0 && (
                  <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    activeTab === 'tracker'
                      ? 'bg-slate-800 text-emerald-400'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {disputeCounts.total}
                  </span>
                )}
                {disputeCounts?.overdue > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
                )}
              </button>
            </div>

            {/* Directory Button */}
            <button
              type="button"
              onClick={onOpenDirectory}
              className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
              title="Verified Bank & Fintech Directory"
            >
              <BookOpen className="w-4 h-4" />
            </button>

            {/* Settings */}
            <button
              type="button"
              onClick={onOpenSettings}
              className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
              title="Settings & AI Engine"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
