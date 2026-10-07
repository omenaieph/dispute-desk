import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DisputeWizard from './components/DisputeWizard';
import DisputeTracker from './components/DisputeTracker';
import ProviderDirectoryModal from './components/ProviderDirectoryModal';
import ApiKeyModal from './components/ApiKeyModal';
import { getStoredDisputes, getStoredSettings, saveSettings } from './utils/storage';
import { ShieldCheck, Heart, Sparkles, Scale, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('wizard'); // 'wizard' | 'tracker'
  const [selectedCountry, setSelectedCountry] = useState('NG'); // 'NG' | 'ZA'
  const [disputes, setDisputes] = useState(() => getStoredDisputes());
  const [settings, setSettings] = useState(() => getStoredSettings());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [initialSample, setInitialSample] = useState(null);

  // Synchronize country from settings if saved
  useEffect(() => {
    if (settings.country) {
      setSelectedCountry(settings.country);
    }
  }, [settings.country]);

  // Compute counts for Header badges
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

  const handleSelectSample = (sample) => {
    setSelectedCountry(sample.country);
    setInitialSample(sample);
    setActiveTab('wizard');
    window.scrollTo({ top: 380, behavior: 'smooth' });
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
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
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
        {/* Hero Section */}
        {activeTab === 'wizard' && (
          <Hero
            onSelectSample={handleSelectSample}
            onStartBlank={() => {
              setInitialSample(null);
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
            selectedCountry={selectedCountry}
          />
        )}

        {/* Core Workspace */}
        {activeTab === 'wizard' ? (
          <DisputeWizard
            selectedCountry={selectedCountry}
            apiKey={settings.apiKey}
            initialSample={initialSample}
            onDisputeCreated={handleDisputeCreated}
            onNavigateToTracker={() => setActiveTab('tracker')}
          />
        ) : (
          <DisputeTracker
            disputes={disputes}
            setDisputes={setDisputes}
            onStartNewDispute={() => {
              setInitialSample(null);
              setActiveTab('wizard');
            }}
          />
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

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              DD
            </div>
            <span className="font-bold text-slate-200">Dispute Desk</span>
            <span>—</span>
            <span>Turn failed fintech transactions into resolved refunds under 60 seconds.</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setIsDirectoryOpen(true)}
              className="hover:text-emerald-400 transition-colors"
            >
              Provider Directory
            </button>
            <button
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              className="hover:text-emerald-400 transition-colors"
            >
              Claude AI Specs
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-semibold">Claude Startups Demo</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <p>
            Operating in accordance with Central Bank of Nigeria (CBN) Consumer Protection Regulations & South African National Financial Ombud Scheme guidelines.
          </p>
          <p className="text-slate-400">
            Client-side forensic parsing · Zero remote server storage · Account masking active
          </p>
        </div>
      </footer>
    </div>
  );
}
