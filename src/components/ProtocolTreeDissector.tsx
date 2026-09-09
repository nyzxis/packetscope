import { useState } from 'react';
import { CaretRight, CaretDown, ShieldWarning } from '@phosphor-icons/react';
import type { Packet, ProtocolLayer } from '../types/packet';

interface ProtocolTreeDissectorProps {
  packet: Packet | null;
  activeByteRange: [number, number] | null;
  setActiveByteRange: (range: [number, number] | null) => void;
}

export function ProtocolTreeDissector({
  packet,
  activeByteRange,
  setActiveByteRange
}: ProtocolTreeDissectorProps) {
  const [collapsedLayers, setCollapsedLayers] = useState<Record<string, boolean>>({});

  if (!packet) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-center text-zinc-600 font-mono text-xs">
        No packet selected. Click a frame in the capture stream above to disassemble layers.
      </div>
    );
  }

  const toggleLayer = (layerName: string) => {
    setCollapsedLayers((prev) => ({
      ...prev,
      [layerName]: !prev[layerName]
    }));
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-[#040905] p-3 font-mono text-xs border-r border-[#13331a]">
      <div className="mb-2 flex items-center justify-between border-b border-[#13331a] pb-1.5">
        <span className="font-display text-[11px] font-bold uppercase tracking-wider text-[#00ff66]">
          Frame Dissector [Packet #{packet.number}]
        </span>
        {packet.threatTag && (
          <span className="flex items-center gap-1 rounded border border-amber-500/40 bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-bold text-amber-400">
            <ShieldWarning size={12} weight="fill" />
            {packet.threatTag}
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        {packet.layers.map((layer: ProtocolLayer) => {
          const isCollapsed = collapsedLayers[layer.name];

          return (
            <div key={layer.name} className="rounded border border-[#13331a] bg-[#061108]/80 overflow-hidden">
              {/* Layer Header */}
              <button
                onClick={() => toggleLayer(layer.name)}
                className="w-full flex items-center gap-1.5 px-2.5 py-1.5 text-left text-xs font-semibold text-slate-200 hover:bg-[#0c2412] transition-colors"
              >
                {isCollapsed ? (
                  <CaretRight size={12} className="text-zinc-500" />
                ) : (
                  <CaretDown size={12} className="text-[#00ff66]" />
                )}
                <span className="text-slate-100">{layer.name}</span>
                <span className="text-[10px] text-zinc-500 truncate max-w-xs">
                  ({layer.summary})
                </span>
              </button>

              {/* Layer Fields */}
              {!isCollapsed && (
                <div className="divide-y divide-[#0c1f11] px-4 py-1.5 bg-[#030804]/90">
                  {layer.fields.map((field, idx) => {
                    const isHovered =
                      activeByteRange &&
                      field.byteRange &&
                      activeByteRange[0] === field.byteRange[0] &&
                      activeByteRange[1] === field.byteRange[1];

                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => field.byteRange && setActiveByteRange(field.byteRange)}
                        onMouseLeave={() => setActiveByteRange(null)}
                        className={`flex items-baseline justify-between py-1 px-1.5 rounded transition-colors ${
                          isHovered
                            ? 'bg-[#00ff66]/20 text-white'
                            : 'hover:bg-[#0c2412] text-zinc-300'
                        }`}
                      >
                        <span className="text-zinc-400">{field.label}:</span>
                        <span className="font-semibold text-right text-slate-200 truncate max-w-[200px]">
                          {field.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
