import React, { useState } from 'react';
import { P01_PANELS } from '../data/portfolioData';
import { Maximize2, Layers, Grid } from 'lucide-react';

interface ProjectOneCutStageProps {
  onOpenLightbox: () => void;
}

export const ProjectOneCutStage: React.FC<ProjectOneCutStageProps> = ({
  onOpenLightbox,
}) => {
  const [activeCutIndex, setActiveCutIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'stepped' | 'full'>('stepped');

  const activePanel = P01_PANELS[activeCutIndex];

  return (
    <div className="w-full flex flex-col gap-8">
      {/* View Mode Switcher */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[var(--line)] pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('stepped')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono-code transition-all ${
              viewMode === 'stepped'
                ? 'bg-[var(--fg)] text-[var(--bg)] font-semibold shadow-md'
                : 'border border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>컷별 집중 보기 (스톱모션)</span>
          </button>
          <button
            onClick={() => setViewMode('full')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono-code transition-all ${
              viewMode === 'full'
                ? 'bg-[var(--fg)] text-[var(--bg)] font-semibold shadow-md'
                : 'border border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)]'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>전체 4컷 한눈에 보기</span>
          </button>
        </div>

        <button
          onClick={onOpenLightbox}
          className="inline-flex items-center gap-1.5 text-xs font-mono-code text-[var(--accent)] hover:underline underline-offset-4"
          data-cursor="확대"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>네 컷 원본 크게 보기 →</span>
        </button>
      </div>

      {viewMode === 'stepped' ? (
        /* Stepped Stop-Motion Stage (M5) */
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Left: Active Panel Image Stage on Clean Paper Frame */}
          <div className="relative w-full lg:w-1/2 flex justify-center">
            <div className="relative p-3.5 sm:p-5 bg-[#FAF8F5] rounded-xs comic-panel-frame border border-[#E5E0D8] max-w-sm sm:max-w-md w-full select-none">
              <div className="relative overflow-hidden rounded-xs aspect-[310/330] bg-[#EFECE6] flex items-center justify-center">
                <img
                  key={activePanel.id}
                  src={activePanel.image}
                  alt={`네 컷 만화 ${activePanel.num}번째 컷: ${activePanel.title}`}
                  className="w-full h-full object-contain"
                />

                {/* Comic SFX Stamp for Panel 02: 멍!! */}
                {activePanel.sfx && (
                  <div className="absolute top-4 right-4 z-10 animate-stamp bg-[#FFD557] text-[#0B0B0B] font-extrabold text-2xl px-3 py-1 rounded-sm border-2 border-black shadow-lg">
                    {activePanel.sfx}
                  </div>
                )}
              </div>

              {/* Panel Footnote inside paper frame */}
              <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono-code text-[#714E2F]">
                <span>PANEL {activePanel.num} / 04</span>
                <span className="uppercase tracking-widest">{activePanel.stage}</span>
              </div>
            </div>
          </div>

          {/* Right: Step Navigation & Deep Story Interpretation */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {/* Cut Step Pill Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {P01_PANELS.map((p, idx) => {
                const isCurrent = idx === activeCutIndex;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveCutIndex(idx)}
                    className={`flex flex-col items-center py-2.5 px-1 rounded-lg border text-center transition-all ${
                      isCurrent
                        ? 'border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)]'
                        : 'border-[var(--line)] bg-[var(--bg)]/40 text-[var(--muted)] hover:border-[var(--fg)] hover:text-[var(--fg)]'
                    }`}
                  >
                    <span className="text-[10px] font-mono-code">CUT {p.num}</span>
                    <span className="text-xs font-semibold mt-0.5 truncate w-full">{p.stage}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Cut Content Details */}
            <div className="flex flex-col gap-4 p-6 rounded-xl border border-[var(--line)] bg-[var(--bg)]/50 backdrop-blur-xs min-h-[200px]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono-code px-2.5 py-1 rounded-full bg-[var(--accent)] text-[#0B0B0B] font-bold">
                  CUT {activePanel.num}
                </span>
                <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-[var(--fg)]">
                  {activePanel.title}
                </h3>
              </div>

              {/* Dialogue Balloon Box */}
              {activePanel.dialogue && (
                <div className="relative p-4 rounded-xl bg-[var(--fg)] text-[var(--bg)] shadow-md animate-bubble">
                  <div className="text-xs font-mono-code opacity-70 mb-1">대사 발췌</div>
                  <p className="text-sm sm:text-base font-serif-kr leading-relaxed">
                    "{activePanel.dialogue}"
                  </p>
                </div>
              )}

              {/* Composition Narrative Purpose */}
              <div className="flex flex-col gap-1.5 pt-2 border-t border-[var(--line)]">
                <span className="text-[11px] font-mono-code text-[var(--accent)] tracking-wider">
                  연출 및 서사 의도
                </span>
                <p className="text-sm leading-relaxed text-[var(--fg)] opacity-90">
                  {activePanel.caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Full 4-cut Comic Overview Mode */
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 sm:p-6 bg-[#FAF8F5] rounded-xs comic-panel-frame border border-[#E5E0D8] max-w-2xl w-full">
            <img
              src="/assets/cuts/p01-full.png"
              alt="한국신문협회 신문 만화 공모전 대상 - 네 컷 만화 최종 원본"
              className="w-full h-auto object-contain rounded-xs shadow-md"
            />
          </div>
          <p className="text-xs font-mono-code text-[var(--muted)] tracking-wider">
            최종본 · 원본 읽기 순서: 상단 왼쪽부터
          </p>
        </div>
      )}
    </div>
  );
};
