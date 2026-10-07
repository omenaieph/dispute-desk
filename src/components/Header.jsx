import React from 'react';
import { Shield, Clock, BookOpen, Settings, Plus, ArrowRight, Home } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group select-none min-w-0 flex-shrink-0"
            onClick={() => setActiveTab('landing')}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs group-hover:bg-slate-800 transition-colors flex-shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-bold text-sm sm:text-base tracking-tight text-slate-900 truncate">
                  Dispute Desk
                </span>
                <span className="hidden md:inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Consumer Protection
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden lg:block truncate">
                African Fintech Transaction Advocate
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-1 sm:space-x-2.5 flex-shrink-0">
            {/* Country Segmented Selector */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setSelectedCountry('NG')}
                className={`flex items-center space-x-1 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md font-semibold transition-all ${
                  selectedCountry === 'NG'
                    ? 'bg-white text-slate-900 shadow-2xs'
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
                className={`flex items-center space-x-1 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md font-semibold transition-all ${
                  selectedCountry === 'ZA'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="South Africa (Financial Ombud Scheme)"
              >
                <span>🇿🇦</span>
                <span className="hidden sm:inline">South Africa</span>
              </button>
            </div>

            {/* Navigation buttons */}
            {activeTab === 'landing' ? (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('tracker')}
                  className="relative p-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 sm:border-transparent transition-colors flex items-center space-x-1"
                  title={`Tracker (${disputeCounts.total} cases)`}
                >
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Tracker ({disputeCounts.total})</span>
                  {disputeCounts.total > 0 && (
                    <span className="sm:hidden px-1 py-0.2 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {disputeCounts.total}
                    </span>
                  )}
                  {disputeCounts?.overdue > 0 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('wizard')}
                  className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs"
                >
                  <span>Start Dispute</span>
                  <ArrowRight className="w-3.5 h-3.5 hidden xs:inline" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('landing')}
                  className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 transition-colors flex items-center space-x-1"
                  title="Return to Landing Page"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Home</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('wizard')}
                  className={`flex items-center space-x-1 p-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'wizard'
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                  }`}
                  title="Start a new dispute"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">New Dispute</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('tracker')}
                  className={`relative flex items-center space-x-1 p-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'tracker'
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                  }`}
                  title="Complaint Tracker"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tracker</span>
                  {disputeCounts?.total > 0 && (
                    <span className={`ml-0.5 sm:ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
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
            )}

            {/* Directory Button */}
            <button
              type="button"
              onClick={onOpenDirectory}
              className="p-1.5 sm:p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors flex-shrink-0"
              title="Verified Bank & Fintech Directory"
            >
              <BookOpen className="w-4 h-4" />
            </button>

            {/* Settings */}
            <button
              type="button"
              onClick={onOpenSettings}
              className="p-1.5 sm:p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors flex-shrink-0"
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
