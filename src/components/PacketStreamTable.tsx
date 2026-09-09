import { Warning } from '@phosphor-icons/react';
import type { Packet } from '../types/packet';

interface PacketStreamTableProps {
  packets: Packet[];
  selectedPacket: Packet | null;
  onSelectPacket: (pkt: Packet) => void;
}

export function PacketStreamTable({
  packets,
  selectedPacket,
  onSelectPacket
}: PacketStreamTableProps) {
  const getProtocolBadge = (proto: string) => {
    switch (proto) {
      case 'TLS 1.3':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-700/50';
      case 'TCP':
        return 'bg-sky-950/80 text-sky-400 border-sky-700/50';
      case 'HTTP':
        return 'bg-amber-950/80 text-amber-400 border-amber-700/50';
      case 'DNS':
        return 'bg-purple-950/80 text-purple-400 border-purple-700/50';
      default:
        return 'bg-zinc-900 text-zinc-400 border-zinc-700';
    }
  };

  return (
    <div className="h-full w-full overflow-x-auto overflow-y-auto bg-[#030804] border-b border-[#13331a]">
      <table className="min-w-[640px] w-full text-left font-mono text-xs border-collapse">
        <thead className="sticky top-0 z-10 bg-[#061108] border-b border-[#13331a] text-[10px] text-zinc-400 uppercase">
          <tr>
            <th className="py-1.5 px-3 w-16">No.</th>
            <th className="py-1.5 px-3 w-24">Time</th>
            <th className="py-1.5 px-3 w-36">Source</th>
            <th className="py-1.5 px-3 w-36">Destination</th>
            <th className="py-1.5 px-3 w-24">Protocol</th>
            <th className="py-1.5 px-3 w-16">Length</th>
            <th className="py-1.5 px-3">Info</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#0c1e11]">
          {packets.map((pkt) => {
            const isSelected = selectedPacket?.id === pkt.id;

            return (
              <tr
                key={pkt.id}
                onClick={() => onSelectPacket(pkt)}
                className={`cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-[#0c2e15] text-white'
                    : pkt.isAnomaly
                      ? 'bg-[#180a06]/80 text-amber-300 hover:bg-[#241009]'
                      : 'hover:bg-[#06140a] text-zinc-300'
                }`}
              >
                <td className="py-1.5 px-3 text-zinc-500">{pkt.number}</td>
                <td className="py-1.5 px-3 text-zinc-400">{pkt.timestamp.toFixed(6)}</td>
                <td className="py-1.5 px-3 text-slate-300 font-semibold">{pkt.source}</td>
                <td className="py-1.5 px-3 text-slate-300 font-semibold">{pkt.destination}</td>
                <td className="py-1.5 px-3">
                  <span
                    className={`inline-block rounded px-1.5 py-0.2 text-[10px] font-bold border ${getProtocolBadge(
                      pkt.protocol
                    )}`}
                  >
                    {pkt.protocol}
                  </span>
                </td>
                <td className="py-1.5 px-3 text-zinc-400">{pkt.length}</td>
                <td className="py-1.5 px-3 flex items-center gap-2 truncate">
                  {pkt.isAnomaly && (
                    <Warning size={14} weight="fill" className="text-amber-400 shrink-0" />
                  )}
                  <span className="truncate">{pkt.info}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
