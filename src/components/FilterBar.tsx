import { Funnel, X } from '@phosphor-icons/react';
import type { PCAPScenario } from '../types/packet';

interface FilterBarProps {
  filterText: string;
  setFilterText: (val: string) => void;
  scenarios: PCAPScenario[];
  activeScenarioId: string;
  onSelectScenario: (sc: PCAPScenario) => void;
}

export function FilterBar({
  filterText,
  setFilterText,
  scenarios,
  activeScenarioId,
  onSelectScenario
}: FilterBarProps) {
  const QUICK_FILTERS = ['tcp', 'tls', 'http', 'dns', 'anomaly'];

  return (
    <div className="border-b border-[#13331a] bg-[#040b05] px-4 py-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      {/* Wireshark Expression Input */}
      <div className="flex-1 flex items-center gap-2">
        <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-xs">
          <Funnel size={14} className="text-[#00ff66]" />
          <span>FILTER:</span>
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Apply a display filter ... e.g. tls, tcp.port == 443, ip.src == 192.168.1.105"
            className="w-full rounded border border-[#13331a] bg-[#030804] px-3 py-1 font-mono text-xs text-[#00ff66] placeholder:text-zinc-600 focus:border-[#00ff66]/60 focus:outline-none focus:ring-1 focus:ring-[#00ff66]/30"
          />
          {filterText && (
            <button
              onClick={() => setFilterText('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Quick Filter Chips */}
        <div className="hidden lg:flex items-center gap-1">
          {QUICK_FILTERS.map((q) => (
            <button
              key={q}
              onClick={() => setFilterText(q)}
              className={`rounded px-1.5 py-0.5 font-mono text-[10px] transition-colors border ${
                filterText.toLowerCase() === q
                  ? 'border-[#00ff66] bg-[#00ff66]/20 text-white'
                  : 'border-[#13331a] bg-[#061108] text-zinc-400 hover:text-[#00ff66]'
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Preset PCAP Scenarios Selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider whitespace-nowrap">
          PCAP PRESET:
        </span>
        {scenarios.map((sc) => {
          const isActive = sc.id === activeScenarioId;

          return (
            <button
              key={sc.id}
              onClick={() => onSelectScenario(sc)}
              className={`whitespace-nowrap rounded px-2.5 py-1 font-mono text-[11px] font-medium transition-all border ${
                isActive
                  ? 'border-[#00ff66] bg-[#00ff66]/15 text-[#00ff66] font-bold shadow-sm shadow-[#00ff66]/20'
                  : 'border-[#13331a] bg-[#061108] text-zinc-400 hover:border-zinc-700 hover:text-slate-200'
              }`}
            >
              {sc.name.split(' ')[0]} {sc.name.split(' ')[1] || ''}
            </button>
          );
        })}
      </div>
    </div>
  );
}
