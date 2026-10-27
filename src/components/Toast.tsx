import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#0B0B0B] text-[#FFF7CB] border border-[#FFD557]/40 shadow-2xl animate-in slide-in-from-bottom-3 duration-200"
    >
      <CheckCircle2 className="w-4 h-4 text-[#FFD557]" />
      <span className="text-xs font-mono-code">{message}</span>
    </div>
  );
};
