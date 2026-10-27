import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GutterCurtainProps {
  onComplete?: () => void;
}

export const GutterCurtain: React.FC<GutterCurtainProps> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Start curtain opening after 800ms
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 900);

    // Completely remove from DOM after 1800ms
    const removeTimer = setTimeout(() => {
      setIsRemoved(true);
      onComplete?.();
    }, 1800);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  if (isRemoved) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden">
        {/* 4 Comic Gutters Panels */}
        {/* Top-Left */}
        <motion.div
          initial={{ x: 0, y: 0 }}
          animate={isOpen ? { x: '-100%', y: '-100%' } : { x: 0, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#0B0B0B] border-r border-b border-[#281214]"
        />

        {/* Top-Right */}
        <motion.div
          initial={{ x: 0, y: 0 }}
          animate={isOpen ? { x: '100%', y: '-100%' } : { x: 0, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#0B0B0B] border-l border-b border-[#281214]"
        />

        {/* Bottom-Left */}
        <motion.div
          initial={{ x: 0, y: 0 }}
          animate={isOpen ? { x: '-100%', y: '100%' } : { x: 0, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#0B0B0B] border-r border-t border-[#281214]"
        />

        {/* Bottom-Right */}
        <motion.div
          initial={{ x: 0, y: 0 }}
          animate={isOpen ? { x: '100%', y: '100%' } : { x: 0, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#0B0B0B] border-l border-t border-[#281214]"
        />

        {/* Center Comic Crossline & Status Badge */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-auto"
          >
            <div className="flex flex-col items-center gap-2 px-6 py-4 rounded-full bg-[#0B0B0B]/90 border border-[#CFB083]/30 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FFD557] animate-ping" />
                <span className="text-xs font-mono-code tracking-widest text-[#FFEDD0]">
                  첫 컷을 불러오는 중
                </span>
              </div>
              <span className="text-[11px] font-mono-code text-[#CFB083]/70">
                KOO MINJIN · 2026 WEBTOON PORTFOLIO
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};
