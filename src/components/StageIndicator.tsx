import React from 'react';
import { STAGES_CONFIG } from '../data/portfolioData';

interface StageIndicatorProps {
  currentStage: string;
  scrollProgress: number; // 0 to 1
}

export const StageIndicator: React.FC<StageIndicatorProps> = ({
  currentStage,
  scrollProgress,
}) => {
  const stages = [
    { id: 'hero', num: '00', name: 'Hero' },
    { id: 'about', num: '01', name: 'About' },
    { id: 'p01', num: '02', name: 'Project 01' },
    { id: 'p02', num: '03', name: 'Project 02' },
    { id: 'awarded', num: '04', name: 'Awarded' },
    { id: 'exp', num: '05', name: 'Experience' },
    { id: 'contact', num: '06', name: 'Contact' },
  ];

  const currentStageObj = STAGES_CONFIG[currentStage as keyof typeof STAGES_CONFIG] || STAGES_CONFIG.hero;
  const tempPercent = currentStageObj.temp || Math.round(scrollProgress * 100);

  return (
    <>
      {/* Right Vertical Progress Line (Desktop only) */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3 select-none pointer-events-auto">
        <span className="text-[10px] font-mono-code text-[var(--accent)] tracking-widest uppercase">
          {currentStageObj.label}
        </span>
        <div className="flex flex-col items-center gap-2 py-2">
          {stages.map((stg) => {
            const isActive = stg.id === currentStage;
            return (
              <a
                key={stg.id}
                href={`#${stg.id}`}
                title={stg.name}
                className="group relative flex items-center justify-center p-1"
                data-cursor={stg.name}
              >
                <span
                  className={`block transition-all duration-300 rounded-full ${
                    isActive
                      ? 'w-2 h-5 bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]'
                      : 'w-1 h-2 bg-[var(--line)] group-hover:bg-[var(--fg)] group-hover:h-3'
                  }`}
                />
              </a>
            );
          })}
        </div>
        <span className="text-[9px] font-mono-code text-[var(--muted)]">06</span>
      </div>

      {/* Bottom-Left Temperature Gauge */}
      <div className="fixed bottom-5 left-5 z-30 hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-md text-[11px] font-mono-code text-[var(--muted)] select-none shadow-md transition-colors duration-700">
        <span className="text-[10px] tracking-wider text-[var(--fg)] opacity-80">COOL</span>
        <div className="relative w-20 sm:w-28 h-1 bg-[var(--line)] rounded-full overflow-hidden">
          <div
            className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#530B12] via-[#CFB083] to-[#FFD557] rounded-full transition-all duration-500"
            style={{ width: `${Math.max(12, Math.min(100, tempPercent))}%` }}
          />
        </div>
        <div
          className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent)] transition-all duration-500"
          title={`Temperature stage: ${tempPercent}%`}
        />
        <span className="text-[10px] tracking-wider text-[var(--accent)] font-semibold">WARM</span>
      </div>
    </>
  );
};
