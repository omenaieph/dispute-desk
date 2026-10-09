import React, { useState } from 'react';
import {
  Shield,
  Clock,
  BookOpen,
  Settings,
  Plus,
  ArrowRight,
  Home,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  selectedCountry,
  setSelectedCountry,
  onOpenSettings,
  onOpenDirectory,
  disputeCounts
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const handleOpenDirectory = () => {
    onOpenDirectory();
    setIsMobileMenuOpen(false);
  };

  const handleOpenSettings = () => {
    onOpenSettings();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs w-full max-w-full">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group select-none shrink-0"
            onClick={() => handleNavClick('landing')}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs group-hover:bg-slate-800 transition-colors shrink-0">
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

          {/* DESKTOP CONTROLS (Hidden on mobile < md) */}
          <div className="hidden md:flex items-center space-x-2.5 shrink-0">
            {/* Country Segmented Selector */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setSelectedCountry('NG')}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-md font-semibold transition-all ${
                  selectedCountry === 'NG'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Nigeria (CBN Consumer Protection)"
              >
                <span>🇳🇬</span>
                <span>Nigeria</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCountry('ZA')}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-md font-semibold transition-all ${
                  selectedCountry === 'ZA'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="South Africa (Financial Ombud Scheme)"
              >
                <span>🇿🇦</span>
                <span>South Africa</span>
              </button>
            </div>

            {/* Navigation buttons */}
            {activeTab === 'landing' ? (
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleNavClick('tracker')}
                  className="relative px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center space-x-1.5"
                  title={`Tracker (${disputeCounts.total} cases)`}
                >
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Tracker ({disputeCounts.total})</span>
                  {disputeCounts?.overdue > 0 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('wizard')}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs"
                >
                  <span>Start Dispute</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5">
                <button
                  type="button"
                  onClick={() => handleNavClick('landing')}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 transition-colors flex items-center space-x-1"
                  title="Return to Landing Page"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('wizard')}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'wizard'
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                  }`}
                  title="Start a new dispute"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Dispute</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('tracker')}
                  className={`relative flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'tracker'
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                  }`}
                  title="Complaint Tracker"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Tracker</span>
                  {disputeCounts?.total > 0 && (
                    <span
                      className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        activeTab === 'tracker'
                          ? 'bg-slate-800 text-emerald-400'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
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
              className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors flex-shrink-0"
              title="Verified Bank & Fintech Directory"
            >
              <BookOpen className="w-4 h-4" />
            </button>

            {/* Settings */}
            <button
              type="button"
              onClick={onOpenSettings}
              className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors flex-shrink-0"
              title="Settings & AI Engine"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* MOBILE CONTROLS (Visible on screens < md) */}
          <div className="flex md:hidden items-center space-x-1.5 shrink-0">
            {/* Country Selector (Flag Icons Only) */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setSelectedCountry('NG')}
                className={`px-1.5 py-1 rounded-md text-sm transition-all ${
                  selectedCountry === 'NG'
                    ? 'bg-white shadow-2xs scale-105'
                    : 'opacity-60 hover:opacity-100'
                }`}
                title="Nigeria (CBN)"
              >
                🇳🇬
              </button>
              <button
                type="button"
                onClick={() => setSelectedCountry('ZA')}
                className={`px-1.5 py-1 rounded-md text-sm transition-all ${
                  selectedCountry === 'ZA'
                    ? 'bg-white shadow-2xs scale-105'
                    : 'opacity-60 hover:opacity-100'
                }`}
                title="South Africa (NFOSA)"
              >
                🇿🇦
              </button>
            </div>

            {/* Contextual Quick Action Button */}
            {activeTab === 'landing' ? (
              <button
                type="button"
                onClick={() => handleNavClick('wizard')}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs"
              >
                <span>Start</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : activeTab === 'wizard' ? (
              <button
                type="button"
                onClick={() => handleNavClick('tracker')}
                className="relative flex items-center space-x-1 px-2 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
              >
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Tracker</span>
                {disputeCounts.total > 0 && (
                  <span className="px-1 py-0.2 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                    {disputeCounts.total}
                  </span>
                )}
                {disputeCounts.overdue > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleNavClick('wizard')}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New</span>
              </button>
            )}

            {/* Mobile Hamburger / Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`relative p-2 rounded-lg border transition-colors ${
                isMobileMenuOpen
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
              {/* Overdue/Active badge */}
              {!isMobileMenuOpen && disputeCounts.overdue > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
              )}
              {!isMobileMenuOpen && disputeCounts.overdue === 0 && disputeCounts.total > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE EXPANDED MENU DRAWER */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-16 z-30 bg-slate-900/30 backdrop-blur-xs md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative z-40 md:hidden border-t border-slate-200 bg-white px-4 py-4 shadow-xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Primary Navigation Chips */}
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
              <button
                type="button"
                onClick={() => handleNavClick('landing')}
                className={`flex items-center space-x-2 p-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'landing'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Overview</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('wizard')}
                className={`flex items-center space-x-2 p-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'wizard'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>New Dispute</span>
              </button>
            </div>

            {/* Dispute Tracker Card */}
            <button
              type="button"
              onClick={() => handleNavClick('tracker')}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                activeTab === 'tracker'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    activeTab === 'tracker'
                      ? 'bg-slate-800 text-emerald-400'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold flex items-center space-x-1.5">
                    <span>Dispute Tracker</span>
                    {disputeCounts.overdue > 0 && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    )}
                  </div>
                  <div
                    className={`text-[11px] ${
                      activeTab === 'tracker' ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    Track statutory SLA countdowns &amp; follow-ups
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1.5 shrink-0">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    activeTab === 'tracker'
                      ? 'bg-slate-800 text-emerald-400'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {disputeCounts.total}
                </span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </div>
            </button>

            {/* Bank & Neobank Directory */}
            <button
              type="button"
              onClick={handleOpenDirectory}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Bank &amp; Neobank Directory
                  </div>
                  <div className="text-[11px] text-slate-500">
                    16 verified dispute inboxes &amp; statutory SLAs
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            </button>

            {/* AI Engine Specs & Settings */}
            <button
              type="button"
              onClick={handleOpenSettings}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    AI Engine Specs &amp; Settings
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Claude Vision &amp; Writing API configuration
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            </button>

            {/* Jurisdiction details bar */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 px-1">
              <span>Jurisdiction:</span>
              <div className="flex items-center space-x-1.5 font-semibold text-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCountry('NG');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-2 py-1 rounded-md text-[11px] transition-all ${
                    selectedCountry === 'NG'
                      ? 'bg-slate-900 text-white'
                      : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  🇳🇬 Nigeria (CBN)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCountry('ZA');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-2 py-1 rounded-md text-[11px] transition-all ${
                    selectedCountry === 'ZA'
                      ? 'bg-slate-900 text-white'
                      : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  🇿🇦 South Africa (NFOSA)
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
