import React from 'react';
import { Copy, Check } from 'lucide-react';
import { COOL_PALETTE, WARM_PALETTE } from '../data/portfolioData';

interface ColorPaletteGridProps {
  onCopyColor: (hex: string) => void;
  copiedHex: string | null;
}

export const ColorPaletteGrid: React.FC<ColorPaletteGridProps> = ({
  onCopyColor,
  copiedHex,
}) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cool & Dark Palette Row */}
        <div className="p-5 rounded-xl border border-[var(--line)] bg-[#0B0B0B]/40 backdrop-blur-xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-[#FFD557] tracking-wider uppercase">
              COOL &amp; DARK PALETTE (초반부)
            </span>
            <span className="text-[11px] font-mono-code text-[var(--muted)]">5 Tones</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {COOL_PALETTE.map((c) => {
              const isCopied = copiedHex === c.hex;
              return (
                <button
                  key={c.hex}
                  onClick={() => onCopyColor(c.hex)}
                  data-cursor="복사"
                  className="group relative flex flex-col items-center gap-1.5 focus:outline-none"
                  title={`${c.name} (${c.hex}) - 클릭하여 복사`}
                >
                  <div
                    className="w-full h-14 sm:h-16 rounded-md border border-white/10 group-hover:scale-105 group-hover:shadow-lg transition-transform duration-200 flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: c.hex }}
                  >
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                      {isCopied ? <Check className="w-4 h-4 text-[#FFD557]" /> : <Copy className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono-code text-[var(--fg)] tracking-tight group-hover:text-[#FFD557]">
                    {c.hex}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {['낮은 채도', '낮은 명도', '차가운 톤', '강한 명암'].map((chip) => (
              <span key={chip} className="text-[10px] font-mono-code px-2 py-0.5 rounded-full border border-[var(--line)] text-[var(--muted)]">
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Warm & Soft Palette Row */}
        <div className="p-5 rounded-xl border border-[var(--line)] bg-[#CFB083]/15 backdrop-blur-xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-[#714E2F] font-semibold tracking-wider uppercase">
              WARM &amp; SOFT PALETTE (후반부)
            </span>
            <span className="text-[11px] font-mono-code text-[var(--muted)]">5 Tones</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {WARM_PALETTE.map((c) => {
              const isCopied = copiedHex === c.hex;
              return (
                <button
                  key={c.hex}
                  onClick={() => onCopyColor(c.hex)}
                  data-cursor="복사"
                  className="group relative flex flex-col items-center gap-1.5 focus:outline-none"
                  title={`${c.name} (${c.hex}) - 클릭하여 복사`}
                >
                  <div
                    className="w-full h-14 sm:h-16 rounded-md border border-black/10 group-hover:scale-105 group-hover:shadow-lg transition-transform duration-200 flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: c.hex }}
                  >
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                      {isCopied ? <Check className="w-4 h-4 text-[#FFD557]" /> : <Copy className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono-code text-[var(--fg)] tracking-tight group-hover:text-[#714E2F]">
                    {c.hex}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {['높아진 명도', '따뜻한 색온도', '부드러운 대비'].map((chip) => (
              <span key={chip} className="text-[10px] font-mono-code px-2 py-0.5 rounded-full border border-[var(--line)] text-[var(--muted)]">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-xs font-mono-code text-[var(--muted)]">
        ※ 팔레트는 원본 이미지의 픽셀에서 추출했습니다. 칩을 클릭하면 색상 코드가 복사됩니다.
      </p>
    </div>
  );
};
