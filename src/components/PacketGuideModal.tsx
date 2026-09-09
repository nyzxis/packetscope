import { X, Broadcast, Funnel, TreeStructure, Binary, Pause } from '@phosphor-icons/react';

interface PacketGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PacketGuideModal({ isOpen, onClose }: PacketGuideModalProps) {
  if (!isOpen) return null;

  const steps = [
    {
      icon: <Broadcast size={18} className="text-[#00ff66]" />,
      title: '1. Load PCAP Attack Presets',
      description: 'Use the top PCAP Preset buttons to toggle between realistic cyber traces: TLS 1.3 Downgrade Attack, Distributed SYN Flood, Cleartext Credential Exfiltration, or DNS C2 Tunneling.'
    },
    {
      icon: <Funnel size={18} className="text-[#00ff66]" />,
      title: '2. Filter Capture Stream',
      description: 'Filter packets using the Wireshark-style expression input or quick chips ("tcp", "tls", "http", "dns", "anomaly"). Enter IP addresses or protocol names to isolate specific traffic flows.'
    },
    {
      icon: <TreeStructure size={18} className="text-[#00ff66]" />,
      title: '3. Dissect Protocol Stack',
      description: 'Click any packet row in the upper streaming table. The lower-left Frame Dissector breaks down the packet into Ethernet II, IPv4, TCP, and application layers with collapsible headers.'
    },
    {
      icon: <Binary size={18} className="text-[#00ff66]" />,
      title: '4. Synchronized Byte Offset Highlighting',
      description: 'Hover your mouse over any decoded field in the protocol tree (such as Destination MAC, Source IP, or Cipher Suite). The exact corresponding bytes are highlighted in green in the 16-byte Hex Dump!'
    },
    {
      icon: <Pause size={18} className="text-[#00ff66]" />,
      title: '5. Oscilloscope Signal & Line Controls',
      description: 'Observe the real-time canvas waveform reflecting packet frequency. Use the PAUSE / CAPTURE button to freeze frame delivery for deep forensic analysis.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm crt-scanlines">
      <div className="w-full max-w-xl rounded border border-[#13331a] bg-[#061108] shadow-2xl overflow-hidden flex flex-col text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#13331a] px-6 py-4 bg-[#030804]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-[#00ff66]/40 bg-[#00ff66]/10 text-[#00ff66]">
              <Broadcast size={18} className="animate-pulse" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-white tracking-wider">
                PACKETSCOPE OPERATING MANUAL
              </h3>
              <p className="font-mono text-[10px] text-[#00ff66]">
                WIRE INSPECTION & PACKET DISSECTION PROTOCOL
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded border border-[#13331a] text-zinc-400 hover:border-[#00ff66]/40 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Steps */}
        <div className="p-6 space-y-3.5 max-h-[70vh] overflow-y-auto font-mono text-xs">
          {steps.map((s, idx) => (
            <div key={idx} className="flex items-start gap-3.5 rounded border border-[#13331a] bg-[#030804] p-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[#13331a] bg-[#061108]">
                {s.icon}
              </div>
              <div>
                <h4 className="font-display text-xs font-bold text-[#00ff66] tracking-wide">
                  {s.title}
                </h4>
                <p className="mt-1 text-[11px] leading-relaxed text-zinc-300 font-body">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-[#13331a] px-6 py-3 bg-[#030804]">
          <button
            onClick={onClose}
            className="rounded border border-[#00ff66] bg-[#00ff66]/15 px-4 py-1.5 font-display text-xs font-bold text-[#00ff66] hover:bg-[#00ff66]/25 transition-colors"
          >
            Acknowledge & Dissect
          </button>
        </div>
      </div>
    </div>
  );
}
