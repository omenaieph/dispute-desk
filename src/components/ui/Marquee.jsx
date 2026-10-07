import React from 'react';
import { PROVIDERS } from '../../data/providers';

export default function Marquee() {
  // Double the list for seamless infinite loop
  const duplicatedProviders = [...PROVIDERS, ...PROVIDERS];

  return (
    <div className="relative w-full overflow-hidden py-4 bg-slate-50/70 border-y border-slate-200/80">
      {/* Side gradient fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-slate-50 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-slate-50 to-transparent" />

      <div className="flex animate-marquee items-center gap-6 whitespace-nowrap">
        {duplicatedProviders.map((provider, idx) => (
          <div
            key={`${provider.id}-${idx}`}
            className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-colors"
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: provider.brandColor || "#059669" }}
            />
            <span className="text-xs font-bold text-slate-800">
              {provider.name}
            </span>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200/60">
              SLA {provider.slaLabel}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
