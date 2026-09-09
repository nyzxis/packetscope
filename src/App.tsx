import { useState, useMemo } from 'react';
import { PCAP_PRESETS } from './data/pcapPresets';
import type { PCAPScenario, Packet } from './types/packet';
import { OscilloscopeHeader } from './components/OscilloscopeHeader';
import { FilterBar } from './components/FilterBar';
import { PacketStreamTable } from './components/PacketStreamTable';
import { ProtocolTreeDissector } from './components/ProtocolTreeDissector';
import { HexDumpViewer } from './components/HexDumpViewer';
import { PacketGuideModal } from './components/PacketGuideModal';

export default function App() {
  const [activeScenario, setActiveScenario] = useState<PCAPScenario>(PCAP_PRESETS[0]);
  const [selectedPacket, setSelectedPacket] = useState<Packet | null>(PCAP_PRESETS[0].packets[3] || PCAP_PRESETS[0].packets[0]);
  const [filterText, setFilterText] = useState('');
  const [isCapturing, setIsCapturing] = useState(true);
  const [activeByteRange, setActiveByteRange] = useState<[number, number] | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Switch scenario
  const handleSelectScenario = (scenario: PCAPScenario) => {
    setActiveScenario(scenario);
    setSelectedPacket(scenario.packets[0] || null);
    setActiveByteRange(null);
  };

  // Filter packet stream
  const filteredPackets = useMemo(() => {
    if (!filterText.trim()) return activeScenario.packets;

    const term = filterText.toLowerCase().trim();

    return activeScenario.packets.filter((p) => {
      if (term === 'anomaly') return p.isAnomaly;
      if (term === 'tcp') return p.protocol === 'TCP';
      if (term === 'tls') return p.protocol === 'TLS 1.3';
      if (term === 'http') return p.protocol === 'HTTP';
      if (term === 'dns') return p.protocol === 'DNS';

      return (
        p.protocol.toLowerCase().includes(term) ||
        p.source.toLowerCase().includes(term) ||
        p.destination.toLowerCase().includes(term) ||
        p.info.toLowerCase().includes(term)
      );
    });
  }, [activeScenario, filterText]);

  return (
    <div className="min-h-screen w-full bg-[#020503] text-[#86efac] font-body py-3 sm:py-8 px-3 sm:px-6 flex flex-col items-center justify-start crt-scanlines selection:bg-[#00ff66]/30 selection:text-white">
      {/* Containerized Shell */}
      <div className="w-full max-w-7xl mx-auto rounded-2xl border border-[#13331a] bg-[#061108] shadow-2xl overflow-hidden flex flex-col">
        {/* Tier 1: Oscilloscope Header */}
        <OscilloscopeHeader
          isCapturing={isCapturing}
          onToggleCapture={() => setIsCapturing(!isCapturing)}
          packetCount={filteredPackets.length}
          threatLevel={activeScenario.threatLevel}
          bitrate="48.2 Mbps"
          onOpenGuide={() => setIsGuideOpen(true)}
        />

        {/* Tier 1.5: Wireshark Filter & Scenario Switcher Bar */}
        <FilterBar
          filterText={filterText}
          setFilterText={setFilterText}
          scenarios={PCAP_PRESETS}
          activeScenarioId={activeScenario.id}
          onSelectScenario={handleSelectScenario}
        />

        {/* Tier 2: Upper Packet Stream Table */}
        <div className="h-[260px] sm:h-[300px] lg:h-[340px] w-full overflow-hidden">
          <PacketStreamTable
            packets={filteredPackets}
            selectedPacket={selectedPacket}
            onSelectPacket={(pkt) => {
              setSelectedPacket(pkt);
              setActiveByteRange(null);
            }}
          />
        </div>

        {/* Tier 3: Lower Inspection Split (Responsive Stacking on Mobile) */}
        <div className="flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 lg:divide-x divide-[#13331a] border-t border-[#13331a]">
          {/* Left Sub-pane: Protocol Dissector Tree */}
          <div className="w-full lg:w-1/2 h-[320px] sm:h-[360px] lg:h-[420px] overflow-hidden">
            <ProtocolTreeDissector
              packet={selectedPacket}
              activeByteRange={activeByteRange}
              setActiveByteRange={setActiveByteRange}
            />
          </div>

          {/* Right Sub-pane: Synchronized Hex / ASCII Dump */}
          <div className="w-full lg:w-1/2 h-[320px] sm:h-[360px] lg:h-[420px] overflow-hidden">
            <HexDumpViewer
              packet={selectedPacket}
              activeByteRange={activeByteRange}
            />
          </div>
        </div>
      </div>

      {/* Footer Attribution */}
      <footer className="mt-6 text-center font-mono text-[11px] text-zinc-600">
        PacketScope • Wire-Level PCAP Dissector • Built by <a href="https://nyzxis.vercel.app/" target="_blank" rel="noreferrer" className="text-[#00ff66]/80 hover:text-[#00ff66]">nyzxis</a>
      </footer>

      {/* Instructional Guide Modal */}
      <PacketGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
