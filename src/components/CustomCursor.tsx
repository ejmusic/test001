import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface CustomCursorProps {
  currentStage: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ currentStage }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsHovered(true);
      } else {
        const isInteractive = target.closest('button, a, input, [role="button"]');
        if (isInteractive) {
          setCursorText('');
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const isDarkStage = ['hero', 'about', 'p01', 'p02'].includes(currentStage);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <motion.div
        animate={{
          x: position.x - (isHovered ? (cursorText ? 36 : 18) : 6),
          y: position.y - (isHovered ? (cursorText ? 16 : 18) : 6),
          scale: isHovered ? (cursorText ? 1 : 1.4) : 1,
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 400,
          mass: 0.2,
        }}
        className={`fixed top-0 left-0 flex items-center justify-center transition-colors duration-300 ${
          cursorText
            ? 'px-3 py-1.5 rounded-full bg-[#FFD557] text-[#0B0B0B] font-mono-code text-[11px] font-semibold tracking-wide shadow-lg border border-[#0B0B0B]/20'
            : isHovered
            ? isDarkStage
              ? 'w-9 h-9 rounded-full border-2 border-[#FFD557] bg-[#FFD557]/20'
              : 'w-9 h-9 rounded-full border-2 border-[#281214] bg-[#281214]/15'
            : isDarkStage
            ? 'w-3 h-3 rounded-full bg-[#FFD557] shadow-[0_0_12px_#FFD557]'
            : 'w-3 h-3 rounded-full bg-[#281214] shadow-[0_0_8px_rgba(40,18,20,0.3)]'
        }`}
      >
        {cursorText && <span>{cursorText}</span>}
      </motion.div>
    </div>
  );
};
