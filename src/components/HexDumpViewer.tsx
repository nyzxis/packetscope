import { useMemo } from 'react';
import type { Packet } from '../types/packet';

interface HexDumpViewerProps {
  packet: Packet | null;
  activeByteRange: [number, number] | null;
}

export function HexDumpViewer({ packet, activeByteRange }: HexDumpViewerProps) {
  const byteRows = useMemo(() => {
    if (!packet) return [];

    const hexBytes = packet.rawHex.split(' ').filter(Boolean);
    const rows = [];

    for (let i = 0; i < hexBytes.length; i += 16) {
      const slice = hexBytes.slice(i, i + 16);
      const offsetStr = i.toString(16).padStart(4, '0');

      // Convert hex to ASCII printable
      const asciiSlice = slice
        .map((hex) => {
          const charCode = parseInt(hex, 16);
          return charCode >= 32 && charCode <= 126 ? String.fromCharCode(charCode) : '.';
        })
        .join('');

      rows.push({
        offset: offsetStr,
        bytes: slice,
        ascii: asciiSlice,
        startIndex: i
      });
    }

    return rows;
  }, [packet]);

  if (!packet) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-center text-zinc-600 font-mono text-xs">
        Select a packet to inspect binary payload.
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-[#020503] p-3 font-mono text-[11px] select-text">
      <div className="mb-2 flex items-center justify-between border-b border-[#13331a] pb-1.5">
        <span className="font-display text-[11px] font-bold uppercase tracking-wider text-[#00ff66]">
          Packet Bytes [{packet.length} bytes]
        </span>
        <span className="text-[10px] text-zinc-500">OFFSET (HEX) | DUMP | ASCII</span>
      </div>

      <div className="space-y-1">
        {byteRows.map((row) => (
          <div key={row.offset} className="flex items-center gap-4 py-0.5 hover:bg-[#06140a] rounded px-1">
            {/* Offset */}
            <span className="text-zinc-500 w-12 shrink-0">{row.offset}</span>

            {/* 16 Hex Bytes */}
            <div className="flex items-center gap-1.5 shrink-0">
              {row.bytes.map((byte, idx) => {
                const byteIndex = row.startIndex + idx;
                const isHighlighted =
                  activeByteRange &&
                  byteIndex >= activeByteRange[0] &&
                  byteIndex <= activeByteRange[1];

                return (
                  <span
                    key={idx}
                    className={`inline-block w-5 text-center transition-colors ${
                      isHighlighted
                        ? 'bg-[#00ff66] text-black font-bold rounded-xs'
                        : 'text-slate-300'
                    }`}
                  >
                    {byte}
                  </span>
                );
              })}
              {/* Padding if slice < 16 */}
              {Array.from({ length: 16 - row.bytes.length }).map((_, i) => (
                <span key={`pad-${i}`} className="inline-block w-5 text-center text-zinc-800">
                  ..
                </span>
              ))}
            </div>

            {/* ASCII Column */}
            <div className="text-zinc-400 tracking-wider pl-2 border-l border-[#13331a] truncate">
              {row.ascii}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
