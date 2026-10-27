import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Award, ShieldAlert, Sparkles } from 'lucide-react';
import { AWARD_ITEMS, AwardItem } from '../data/portfolioData';

interface AwardedRailProps {
  onSelectAward: (index: number) => void;
}

export const AwardedRail: React.FC<AwardedRailProps> = ({ onSelectAward }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 380;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Rail Nav Buttons & Hint */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono-code text-[var(--muted)]">
          <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>가로로 밀어서 작품을 살펴보세요. 클릭 시 상세 라이트박스가 열립니다.</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2.5 rounded-full border border-[var(--line)] bg-[var(--bg)]/80 text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors shadow-sm"
            aria-label="이전 카드"
            data-cursor="이전"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2.5 rounded-full border border-[var(--line)] bg-[var(--bg)]/80 text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors shadow-sm"
            aria-label="다음 카드"
            data-cursor="다음"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Rail Cards Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-auto pb-6 pt-2 px-1 snap-x snap-mandatory no-scrollbar"
      >
        {AWARD_ITEMS.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => onSelectAward(idx)}
            className="snap-start shrink-0 w-[300px] sm:w-[350px] rounded-xl border border-[var(--line)] bg-[var(--bg)]/60 backdrop-blur-xs hover:border-[var(--accent)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between shadow-lg group"
            data-cursor="열기"
          >
            {/* Thumbnail Header with grayscale to color hover */}
            <div className="relative aspect-[4/3] bg-[#0E0E0E] overflow-hidden">
              <img
                src={item.image || '/assets/cuts/p01-full.png'}
                alt={item.title}
                className="w-full h-full object-cover transition-all duration-500 filter grayscale group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono-code text-[#FFD557] border border-white/10">
                NO. 0{item.num}
              </div>

              {item.isSensitive && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-red-900/80 backdrop-blur-md text-[10px] font-mono-code text-red-200 flex items-center gap-1 border border-red-500/30">
                  <ShieldAlert className="w-3 h-3" />
                  <span>사전안내</span>
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono-code text-[var(--muted)] mb-1.5">
                  <span>{item.year}</span>
                  <span>{item.submissionType}</span>
                </div>
                <h3 className="font-serif-kr text-base sm:text-lg font-bold text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30">
                  <Award className="w-3.5 h-3.5" />
                  {item.rank}
                </span>
                {!item.rankVerified && (
                  <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-amber-900/30 text-amber-300 border border-amber-600/30">
                    [확인 필요]
                  </span>
                )}
              </div>

              <p className="text-xs text-[var(--fg)] opacity-80 line-clamp-2 font-serif-kr leading-relaxed">
                {item.captionExcerpt}
              </p>

              <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between text-[11px] font-mono-code text-[var(--muted)]">
                <span>주제: {item.theme}</span>
                <span className="group-hover:translate-x-1 transition-transform text-[var(--accent)]">
                  상세 보기 →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
