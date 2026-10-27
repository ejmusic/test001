import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeftRight, Maximize2, Sparkles } from 'lucide-react';

interface ProjectCompareSliderProps {
  onZoom?: (img: string, title: string) => void;
}

export const ProjectCompareSlider: React.FC<ProjectCompareSliderProps> = ({ onZoom }) => {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPos((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-10">
      {/* 1. Main Interactive Comparison Slider (M6) - Always Visible! */}
      <div className="w-full flex flex-col items-center">
        {/* Slider Hint and Status */}
        <div className="w-full max-w-4xl flex items-center justify-between flex-wrap gap-2 mb-3 text-xs font-mono-code text-[var(--muted)]">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4 text-[var(--accent)]" />
            <span className="text-[var(--fg)] font-semibold">
              가운데 선을 드래그하여 서사별 채색 온도를 비교해보세요
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--line)] text-[var(--fg)]">
              초반 {Math.round(sliderPos)}% : 후반 {100 - Math.round(sliderPos)}%
            </span>
            <button
              onClick={() =>
                onZoom?.('/assets/cuts/p02-complete-board.png', '초반부와 후반부 채색 비교 전체 원본 보드')
              }
              className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
              data-cursor="확대"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>전체 원본 보기</span>
            </button>
          </div>
        </div>

        {/* Outer Framed Box: Prevents any clipping of artwork or swatches */}
        <div className="w-full max-w-4xl p-2 sm:p-4 rounded-2xl border-2 border-[var(--line)] bg-[#0B0B0B]/90 backdrop-blur-md shadow-2xl">
          <div
            ref={containerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[680/420] overflow-hidden rounded-xl bg-[#090909] cursor-ew-resize select-none focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            data-cursor="드래그"
            aria-label="초반부 COOL & DARK와 후반부 WARM & SOFT 채색 비교 슬라이더"
          >
            {/* Layer 1: WARM & SOFT (Underneath layer) */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#251A14]">
              <img
                src="/assets/cuts/p02-warm-full-card.png"
                alt="후반부 WARM & SOFT 채색: 따뜻한 색온도와 높은 명도 및 색상표"
                className="w-full h-full object-contain"
              />
              {/* Label Right */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-[#281214]/90 text-[#FFF7CB] text-[11px] font-mono-code backdrop-blur-md border border-[#CFB083]/40 shadow-lg">
                후반부 · WARM &amp; SOFT
              </div>
            </div>

            {/* Layer 2: COOL & DARK (Clipped on top layer) */}
            <div
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#0B0B0B] overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src="/assets/cuts/p02-cool-full-card.png"
                alt="초반부 COOL & DARK 채색: 낮은 채도와 어두운 명암 및 색상표"
                className="w-full h-full object-contain"
              />
              {/* Label Left */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-[#0B0B0B]/90 text-[#FFD557] text-[11px] font-mono-code backdrop-blur-md border border-[#FFD557]/40 shadow-lg">
                초반부 · COOL &amp; DARK
              </div>
            </div>

            {/* Draggable Divider Line & Knob */}
            <div
              className="absolute top-0 bottom-0 z-20 w-0.5 bg-[var(--accent)] shadow-[0_0_14px_var(--accent)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[var(--accent)] text-[#0B0B0B] flex items-center justify-center shadow-2xl border-2 border-white/80 transition-transform active:scale-110">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Side-by-Side Clean Boxed Frames (Artwork + Full Palette without Clipping) */}
      <div className="w-full max-w-4xl flex flex-col gap-4">
        <div className="flex items-center gap-2 text-xs font-mono-code text-[var(--muted)]">
          <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>각 구간의 연출 컷과 색상표를 박스 안에서 개별적으로 온전히 확인하실 수 있습니다.</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Box 1: COOL & DARK Box */}
          <div className="p-4 sm:p-5 rounded-2xl border border-[var(--line)] bg-[#0B0B0B]/85 backdrop-blur-md flex flex-col justify-between gap-3 shadow-xl group hover:border-[#FFD557]/50 transition-all">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#530B12] shadow-[0_0_8px_#530B12]" />
                <h4 className="font-serif-kr font-bold text-sm sm:text-base text-[#FFD557]">
                  초반부 · COOL &amp; DARK
                </h4>
              </div>
              <span className="text-[10px] font-mono-code text-[#CFB083] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                긴장과 무게감
              </span>
            </div>

            {/* Image Frame: Full content, zero clipping */}
            <div
              className="relative rounded-xl overflow-hidden bg-[#121212] border border-white/10 p-2 flex items-center justify-center cursor-pointer"
              onClick={() =>
                onZoom?.('/assets/cuts/p02-cool-full-card.png', '초반부 COOL & DARK 원본 컷 및 색상표')
              }
              data-cursor="확대"
            >
              <img
                src="/assets/cuts/p02-cool-full-card.png"
                alt="초반부 COOL & DARK - 컷 연출과 하단 색상표 원본"
                className="w-full h-auto object-contain rounded-lg group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono-code text-[var(--muted)]">
              <span>낮은 채도 · 어두운 명암 · 차가운 톤</span>
              <button
                onClick={() =>
                  onZoom?.('/assets/cuts/p02-cool-full-card.png', '초반부 COOL & DARK 원본')
                }
                className="text-[#FFD557] hover:underline"
              >
                크게 보기 →
              </button>
            </div>
          </div>

          {/* Box 2: WARM & SOFT Box */}
          <div className="p-4 sm:p-5 rounded-2xl border border-[var(--line)] bg-[#CFB083]/20 backdrop-blur-md flex flex-col justify-between gap-3 shadow-xl group hover:border-[#714E2F]/50 transition-all">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFD557] shadow-[0_0_8px_#FFD557]" />
                <h4 className="font-serif-kr font-bold text-sm sm:text-base text-[#714E2F]">
                  후반부 · WARM &amp; SOFT
                </h4>
              </div>
              <span className="text-[10px] font-mono-code text-[#714E2F] px-2 py-0.5 rounded bg-black/5 border border-black/10">
                온기와 안정감
              </span>
            </div>

            {/* Image Frame: Full content, zero clipping */}
            <div
              className="relative rounded-xl overflow-hidden bg-[#F5EFE6] border border-black/10 p-2 flex items-center justify-center cursor-pointer"
              onClick={() =>
                onZoom?.('/assets/cuts/p02-warm-full-card.png', '후반부 WARM & SOFT 원본 컷 및 색상표')
              }
              data-cursor="확대"
            >
              <img
                src="/assets/cuts/p02-warm-full-card.png"
                alt="후반부 WARM & SOFT - 컷 연출과 하단 색상표 원본"
                className="w-full h-auto object-contain rounded-lg group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono-code text-[var(--muted)]">
              <span>높아진 명도 · 따뜻한 색온도 · 부드러운 대비</span>
              <button
                onClick={() =>
                  onZoom?.('/assets/cuts/p02-warm-full-card.png', '후반부 WARM & SOFT 원본')
                }
                className="text-[#714E2F] hover:underline"
              >
                크게 보기 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
