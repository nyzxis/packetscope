import { useEffect, useRef } from 'react';
import { Broadcast, Play, Pause, ArrowClockwise, ShieldWarning } from '@phosphor-icons/react';

interface OscilloscopeHeaderProps {
  isCapturing: boolean;
  onToggleCapture: () => void;
  packetCount: number;
  threatLevel: string;
  bitrate: string;
}

export function OscilloscopeHeader({
  isCapturing,
  onToggleCapture,
  packetCount,
  threatLevel,
  bitrate
}: OscilloscopeHeaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = isCapturing ? '#00ff66' : '#22c55e50';
      ctx.shadowColor = isCapturing ? '#00ff66' : '#00000000';
      ctx.shadowBlur = 6;

      ctx.beginPath();
      const height = canvas.height;
      const width = canvas.width;
      const mid = height / 2;

      for (let x = 0; x < width; x++) {
        // Multi-frequency simulated packet pulse wave
        const freq1 = Math.sin((x * 0.04) + phase);
        const freq2 = Math.sin((x * 0.12) - phase * 1.5) * 0.4;
        const noise = isCapturing ? (Math.random() - 0.5) * 4 : 0;
        const y = mid + (freq1 + freq2) * (isCapturing ? 12 : 2) + noise;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      if (isCapturing) {
        phase += 0.08;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isCapturing]);

  return (
    <header className="border-b border-[#13331a] bg-[#061108] px-4 py-2.5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Oscilloscope */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-[#00ff66]/40 bg-[#00ff66]/10">
              <Broadcast size={18} className="text-[#00ff66] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-bold tracking-wider text-white">
                  PACKETSCOPE
                </span>
                <span className="rounded border border-[#00ff66]/40 bg-[#00ff66]/10 px-1.5 py-0.2 font-mono text-[9px] font-bold text-[#00ff66]">
                  SIGINT v3.2
                </span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500">
                PROMISCUOUS PCAP DISSECTOR
              </span>
            </div>
          </div>

          {/* Inline Oscilloscope Display */}
          <div className="hidden sm:flex items-center gap-2 rounded border border-[#13331a] bg-[#030804] px-2.5 py-1">
            <canvas ref={canvasRef} width={160} height={26} className="h-6 w-40" />
            <span className="font-mono text-[10px] text-[#00ff66]">
              {isCapturing ? 'RX LIVE' : 'HOLD'}
            </span>
          </div>
        </div>

        {/* Telemetry Chips */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">PACKETS:</span>
            <span className="font-bold text-[#00ff66]">{packetCount}</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-zinc-500">LINE RATE:</span>
            <span className="text-slate-300">{bitrate}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded border border-[#ffb703]/30 bg-[#ffb703]/10 px-2 py-0.5 text-[11px] text-[#ffb703]">
            <ShieldWarning size={14} weight="fill" />
            <span>{threatLevel}</span>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onToggleCapture}
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-bold transition-all border ${
                isCapturing
                  ? 'border-red-500/40 bg-red-500/15 text-red-400 hover:bg-red-500/25'
                  : 'border-[#00ff66]/40 bg-[#00ff66]/15 text-[#00ff66] hover:bg-[#00ff66]/25'
              }`}
            >
              {isCapturing ? <Pause size={13} weight="bold" /> : <Play size={13} weight="bold" />}
              {isCapturing ? 'PAUSE' : 'CAPTURE'}
            </button>
            <button
              onClick={onToggleCapture}
              title="Restart Capture Buffer"
              className="flex h-7 w-7 items-center justify-center rounded border border-[#13331a] text-zinc-400 transition-colors hover:border-[#00ff66]/40 hover:text-white"
            >
              <ArrowClockwise size={13} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
