import { useState, useMemo } from 'react';
import { PCAP_PRESETS } from './data/pcapPresets';
import type { PCAPScenario, Packet } from './types/packet';
import { OscilloscopeHeader } from './components/OscilloscopeHeader';
import { FilterBar } from './components/FilterBar';
import { PacketStreamTable } from './components/PacketStreamTable';
import { ProtocolTreeDissector } from './components/ProtocolTreeDissector';
import { HexDumpViewer } from './components/HexDumpViewer';

export default function App() {
  const [activeScenario, setActiveScenario] = useState<PCAPScenario>(PCAP_PRESETS[0]);
  const [selectedPacket, setSelectedPacket] = useState<Packet | null>(PCAP_PRESETS[0].packets[3] || PCAP_PRESETS[0].packets[0]);
  const [filterText, setFilterText] = useState('');
  const [isCapturing, setIsCapturing] = useState(true);
  const [activeByteRange, setActiveByteRange] = useState<[number, number] | null>(null);

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
    <div className="relative flex h-screen w-screen flex-col overflow-hidden bg-[#030804] text-[#86efac] font-body crt-scanlines">
      {/* Tier 1: Oscilloscope Header */}
      <OscilloscopeHeader
        isCapturing={isCapturing}
        onToggleCapture={() => setIsCapturing(!isCapturing)}
        packetCount={filteredPackets.length}
        threatLevel={activeScenario.threatLevel}
        bitrate="48.2 Mbps"
      />

      {/* Tier 1.5: Wireshark Filter & Scenario Switcher Bar */}
      <FilterBar
        filterText={filterText}
        setFilterText={setFilterText}
        scenarios={PCAP_PRESETS}
        activeScenarioId={activeScenario.id}
        onSelectScenario={handleSelectScenario}
      />

      {/* Tier 2: Upper Packet Stream Table (42% height) */}
      <div className="h-[42%] w-full overflow-hidden">
        <PacketStreamTable
          packets={filteredPackets}
          selectedPacket={selectedPacket}
          onSelectPacket={(pkt) => {
            setSelectedPacket(pkt);
            setActiveByteRange(null);
          }}
        />
      </div>

      {/* Tier 3: Lower Inspection Split (58% height) */}
      <div className="flex h-[58%] w-full flex-col md:flex-row overflow-hidden border-t border-[#13331a]">
        {/* Left Sub-pane: Protocol Dissector Tree (50%) */}
        <div className="h-1/2 md:h-full md:w-1/2 overflow-hidden">
          <ProtocolTreeDissector
            packet={selectedPacket}
            activeByteRange={activeByteRange}
            setActiveByteRange={setActiveByteRange}
          />
        </div>

        {/* Right Sub-pane: Synchronized Hex / ASCII Dump (50%) */}
        <div className="h-1/2 md:h-full md:w-1/2 overflow-hidden">
          <HexDumpViewer
            packet={selectedPacket}
            activeByteRange={activeByteRange}
          />
        </div>
      </div>
    </div>
  );
}
