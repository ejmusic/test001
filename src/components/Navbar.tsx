import React, { useEffect, useState } from 'react';
import { ArrowDownToLine, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentStage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentStage }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
        // Scrolling down
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else if (lastScrollY - currentScrollY > 10) {
        // Scrolling up
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Project 01', href: '#p01' },
    { label: 'Project 02', href: '#p02' },
    { label: 'Awarded', href: '#awarded' },
    { label: 'Experience', href: '#exp' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-4 sm:py-5">
        <nav className="flex items-center justify-between rounded-full px-5 py-3 border border-[var(--line)] bg-[var(--bg)]/80 backdrop-blur-md shadow-lg transition-colors duration-700">
          {/* Logo / Name */}
          <a
            href="#hero"
            className="flex items-center gap-2 group tracking-tight"
            data-cursor="홈"
          >
            <span className="font-serif-kr font-bold text-base sm:text-lg tracking-wider text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
              KOO MINJIN
            </span>
            <span className="text-xs font-mono-code text-[var(--muted)] hidden sm:inline-block">
              / 구민진
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-mono-code tracking-wider text-[var(--muted)] hover:text-[var(--fg)] relative transition-colors duration-200 py-1"
                data-cursor="이동"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Action: PDF Download */}
          <div className="flex items-center gap-3">
            <a
              href="/assets/aistudio/____fd51368d.pdf"
              download="구민진_웹툰포트폴리오_2026.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono-code tracking-wider border border-[var(--line)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200"
              data-cursor="다운로드"
            >
              <ArrowDownToLine className="w-3.5 h-3.5" />
              <span>PDF</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="mt-2 md:hidden rounded-2xl p-5 border border-[var(--line)] bg-[var(--bg)]/95 backdrop-blur-xl shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-mono-code tracking-wider py-2 border-b border-[var(--line)] text-[var(--fg)] hover:text-[var(--accent)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/assets/aistudio/____fd51368d.pdf"
              download="구민진_웹툰포트폴리오_2026.pdf"
              className="inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-mono-code border border-[var(--accent)] text-[var(--accent)]"
            >
              <ArrowDownToLine className="w-4 h-4" />
              <span>포트폴리오 PDF 다운로드</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
