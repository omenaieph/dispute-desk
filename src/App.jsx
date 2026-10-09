import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import DisputeWizard from './components/DisputeWizard';
import DisputeTracker from './components/DisputeTracker';
import ProviderDirectoryModal from './components/ProviderDirectoryModal';
import ApiKeyModal from './components/ApiKeyModal';
import { getStoredDisputes, getStoredSettings, saveSettings } from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing'); // 'landing' | 'wizard' | 'tracker'
  const [selectedCountry, setSelectedCountry] = useState('NG');
  const [disputes, setDisputes] = useState(() => getStoredDisputes());
  const [settings, setSettings] = useState(() => getStoredSettings());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [initialSample, setInitialSample] = useState(null);

  useEffect(() => {
    if (settings.country) {
      setSelectedCountry(settings.country);
    }
  }, [settings.country]);

  const now = Date.now();
  const overdueCount = disputes.filter((d) => {
    if (d.status === 'resolved' || !d.deadlineAt) return false;
    return new Date(d.deadlineAt).getTime() - now <= 0;
  }).length;

  const disputeCounts = {
    total: disputes.length,
    overdue: overdueCount,
    resolved: disputes.filter((d) => d.status === 'resolved').length
  };

  const handleStartDispute = () => {
    setInitialSample(null);
    setActiveTab('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSample = (sample) => {
    setSelectedCountry(sample.country);
    setInitialSample(sample);
    setActiveTab('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveApiKey = (key) => {
    const updated = { ...settings, apiKey: key };
    setSettings(updated);
    saveSettings(updated);
  };

  const handleDisputeCreated = (newDispute) => {
    setDisputes((prev) => [newDispute, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans w-full max-w-full overflow-x-hidden">
      {/* Top Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedCountry={selectedCountry}
        setSelectedCountry={(c) => {
          setSelectedCountry(c);
          const updated = { ...settings, country: c };
          setSettings(updated);
          saveSettings(updated);
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenDirectory={() => setIsDirectoryOpen(true)}
        disputeCounts={disputeCounts}
      />

      <main className="flex-1">
        {/* 1. Landing Page View */}
        {activeTab === 'landing' && (
          <LandingPage
            onStartDispute={handleStartDispute}
            onSelectSample={handleSelectSample}
            onOpenDirectory={() => setIsDirectoryOpen(true)}
          />
        )}

        {/* 2. Dispute Creator Wizard View */}
        {activeTab === 'wizard' && (
          <div className="py-6">
            <DisputeWizard
              selectedCountry={selectedCountry}
              apiKey={settings.apiKey}
              initialSample={initialSample}
              onDisputeCreated={handleDisputeCreated}
              onNavigateToTracker={() => setActiveTab('tracker')}
            />
          </div>
        )}

        {/* 3. Dispute Tracker Ledger View */}
        {activeTab === 'tracker' && (
          <div className="py-6">
            <DisputeTracker
              disputes={disputes}
              setDisputes={setDisputes}
              onStartNewDispute={handleStartDispute}
            />
          </div>
        )}
      </main>

      {/* Directory Modal */}
      <ProviderDirectoryModal
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
        selectedCountry={selectedCountry}
      />

      {/* Settings / API Key Modal */}
      <ApiKeyModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={settings.apiKey}
        onSaveApiKey={handleSaveApiKey}
      />

      {/* Institutional Footer */}
      <footer className="border-t border-slate-200 bg-white py-10 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                DD
              </div>
              <span className="font-bold text-slate-900">Dispute Desk</span>
            </div>
            <span className="hidden sm:inline text-slate-300">—</span>
            <span className="text-slate-500">Turn failed African fintech transactions into a ready complaint in 60 seconds.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => {
                setActiveTab('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-900 transition-colors"
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setIsDirectoryOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              Bank Directory
            </button>
            <button
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              AI Engine Specs
            </button>
            <span className="text-slate-300">|</span>
            <span className="text-slate-700 font-semibold">Powered by Claude</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 text-center sm:text-left">
          <p>
            Founded by <span className="text-slate-600 font-medium">Ephraim Omenai</span> · Lagos, Nigeria · Contact: <a href="mailto:ephraim@mydisputedesk.app" className="text-slate-600 hover:text-slate-900 underline font-medium">ephraim@mydisputedesk.app</a> · Serving Nigeria &amp; South Africa
          </p>
          <p>
            Referenced against Central Bank of Nigeria (CBN) Consumer Protection Framework & SA National Financial Ombud Scheme (NFOSA, nfosa.co.za) guidance.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 text-[11px] text-slate-400 text-center sm:text-left">
          <p>
            Receipts are read by Claude and never stored on our servers · Account numbers masked to last 4 digits
          </p>
        </div>
      </footer>
    </div>
  );
}
