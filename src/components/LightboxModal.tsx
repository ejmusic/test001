import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import { AWARD_ITEMS } from '../data/portfolioData';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
  customImage?: { image: string; title: string } | null;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  initialIndex = 0,
  customImage = null,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [unlockedSensitive, setUnlockedSensitive] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!customImage) {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, customImage]);

  if (!isOpen) return null;

  // Custom Image View Mode (e.g., Project 02 Comparison Board or P01 Full Original)
  if (customImage) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0B0B0B]/95 backdrop-blur-2xl animate-in fade-in duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FFF7CB] transition-colors"
          aria-label="닫기 (Esc)"
          data-cursor="닫기"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative max-w-6xl w-full max-h-[92vh] flex flex-col bg-[#141414] rounded-2xl overflow-hidden border border-white/15 shadow-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <h3 className="font-serif-kr text-base sm:text-lg font-bold text-[#FFF7CB]">
              {customImage.title}
            </h3>
            <span className="text-xs font-mono-code text-[#CFB083]">원본 고해상도 뷰</span>
          </div>
          <div className="flex-1 flex items-center justify-center overflow-auto p-2 bg-[#090909] rounded-xl">
            <img
              src={customImage.image}
              alt={customImage.title}
              className="max-h-[75vh] w-auto object-contain rounded shadow-xl"
            />
          </div>
          <div className="pt-3 text-center text-xs font-mono-code text-[var(--muted)]">
            Esc 키 또는 우측 상단 X 버튼으로 닫을 수 있습니다.
          </div>
        </div>
      </div>
    );
  }

  const currentItem = AWARD_ITEMS[currentIndex];
  const isSensitiveLocked = currentItem.isSensitive && !unlockedSensitive[currentItem.id];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : AWARD_ITEMS.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < AWARD_ITEMS.length - 1 ? prev + 1 : 0));
  };

  const handleUnlock = () => {
    setUnlockedSensitive((prev) => ({ ...prev, [currentItem.id]: true }));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0B0B0B]/92 backdrop-blur-xl animate-in fade-in duration-200"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FFF7CB] transition-colors"
        aria-label="닫기 (Esc)"
        data-cursor="닫기"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-[#FFD557] hover:text-[#0B0B0B] text-[#FFF7CB] transition-all"
        aria-label="이전 작품 (←)"
        data-cursor="이전"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-[#FFD557] hover:text-[#0B0B0B] text-[#FFF7CB] transition-all"
        aria-label="다음 작품 (→)"
        data-cursor="다음"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content Container */}
      <div className="relative max-w-5xl w-full max-h-[92vh] flex flex-col md:flex-row bg-[#151515] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Left: Artwork View */}
        <div className="relative flex-1 bg-[#090909] flex items-center justify-center p-4 sm:p-8 min-h-[300px] md:min-h-[500px]">
          {isSensitiveLocked ? (
            <div className="max-w-md p-6 rounded-2xl bg-[#281214] border border-[#530B12] text-center flex flex-col items-center gap-4 animate-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-[#530B12] flex items-center justify-center text-[#FFD557]">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="font-serif-kr text-base font-bold text-[#FFF7CB]">
                  주제 관련 사전 안내
                </h4>
                <p className="text-xs text-[#FFEDD0]/80 leading-relaxed">
                  이 작품은 생명존중과 관련된 주제를 다룹니다. 열어서 볼까요?
                </p>
              </div>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={handleUnlock}
                  className="px-5 py-2 rounded-full bg-[#FFD557] text-[#0B0B0B] text-xs font-semibold hover:bg-[#FFEDD0] transition-colors"
                >
                  열기
                </button>
                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-full border border-white/20 text-xs text-[#FFEDD0] hover:bg-white/10 transition-colors"
                >
                  다음 작품 보기
                </button>
              </div>
            </div>
          ) : (
            <img
              src={currentItem.image || '/assets/cuts/p01-full.png'}
              alt={currentItem.title}
              className="max-h-[75vh] w-auto object-contain rounded-sm shadow-xl"
            />
          )}
        </div>

        {/* Right: Info Panel */}
        <div className="w-full md:w-80 lg:w-96 p-6 sm:p-7 flex flex-col justify-between bg-[#1A1A1A] text-[#FFEDD0] border-t md:border-t-0 md:border-l border-white/10 overflow-y-auto max-h-[300px] md:max-h-[92vh]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono-code text-[#FFD557] tracking-wider uppercase">
                {String(currentItem.num).padStart(2, '0')} / {String(AWARD_ITEMS.length).padStart(2, '0')}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 font-mono-code text-[#FFEDD0]">
                {currentItem.year}
              </span>
            </div>

            <div>
              <h3 className="font-serif-kr text-lg sm:text-xl font-bold text-[#FFF7CB] leading-snug">
                {currentItem.title}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-[#FFD557]/15 border border-[#FFD557]/30 text-[#FFD557] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {currentItem.rank}
                </span>
                {!currentItem.rankVerified && (
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-amber-900/40 text-amber-200 border border-amber-500/30">
                    [확인 필요]
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[#FFEDD0]/80 border-t border-b border-white/10 py-3">
              {currentItem.captionExcerpt}
            </p>

            <div className="flex flex-col gap-2 text-xs font-mono-code">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#808080]">주제</span>
                <span className="text-[#FFF7CB]">{currentItem.theme}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#808080]">형식</span>
                <span className="text-[#FFF7CB]">{currentItem.format}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#808080]">작업 포인트</span>
                <span className="text-[#FFF7CB]">{currentItem.focusPoint}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#808080]">출품 형식</span>
                <span className="text-[#FFF7CB]">{currentItem.submissionType}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-code text-[#808080]">
            <span>좌우 방향키(←, →)로 전환</span>
            <span>Esc로 닫기</span>
          </div>
        </div>
      </div>
    </div>
  );
};
