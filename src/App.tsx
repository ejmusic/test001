/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { GutterCurtain } from './components/GutterCurtain';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { StageIndicator } from './components/StageIndicator';
import { ProjectOneCutStage } from './components/ProjectOneCutStage';
import { ProjectCompareSlider } from './components/ProjectCompareSlider';
import { ColorPaletteGrid } from './components/ColorPaletteGrid';
import { AwardedRail } from './components/AwardedRail';
import { ExperienceBento } from './components/ExperienceBento';
import { LightboxModal } from './components/LightboxModal';
import { Toast } from './components/Toast';
import { STAGES_CONFIG, P01_PRINCIPLES } from './data/portfolioData';
import {
  ArrowDownToLine,
  Mail,
  Copy,
  ChevronDown,
  ArrowUp,
  Layers,
  Award,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const [currentStage, setCurrentStage] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxCustomImage, setLightboxCustomImage] = useState<{ image: string; title: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const p01Ref = useRef<HTMLElement>(null);
  const p02Ref = useRef<HTMLElement>(null);
  const awardedRef = useRef<HTMLElement>(null);
  const expRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Show temporary toast message
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Copy Color Hex
  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    triggerToast(`색상 코드 ${hex}를 복사했습니다.`);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  // Copy Email
  const userEmail = 'ejkim1770@gmail.com';
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(userEmail);
    triggerToast('이메일 주소를 복사했습니다.');
  };

  // Open Lightbox with specified award
  const handleOpenLightbox = (index: number = 0) => {
    setLightboxCustomImage(null);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleOpenCustomLightbox = (image: string, title: string) => {
    setLightboxCustomImage({ image, title });
    setLightboxOpen(true);
  };

  // Observe scroll and dynamically update CSS variables for temperature
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? scrollY / totalHeight : 0;
      setScrollProgress(progress);

      // Section positions
      const sections = [
        { id: 'hero', ref: heroRef },
        { id: 'about', ref: aboutRef },
        { id: 'p01', ref: p01Ref },
        { id: 'p02', ref: p02Ref },
        { id: 'awarded', ref: awardedRef },
        { id: 'exp', ref: expRef },
        { id: 'contact', ref: contactRef },
      ];

      const viewportCenter = scrollY + window.innerHeight * 0.45;
      let activeId = 'hero';

      for (const sec of sections) {
        if (sec.ref.current) {
          const top = sec.ref.current.offsetTop;
          const height = sec.ref.current.offsetHeight;
          if (viewportCenter >= top && viewportCenter <= top + height) {
            activeId = sec.id;
            break;
          }
        }
      }

      setCurrentStage(activeId);

      // Dynamically update :root CSS variables according to stage
      const stageData = STAGES_CONFIG[activeId as keyof typeof STAGES_CONFIG] || STAGES_CONFIG.hero;
      const root = document.documentElement;

      if (activeId === 'p02' && p02Ref.current) {
        // Special Scrubbed Shift for Project 02: transitions from COOL to WARM
        const p02Top = p02Ref.current.offsetTop;
        const p02Height = p02Ref.current.offsetHeight;
        const relativeScroll = Math.max(0, Math.min(1, (viewportCenter - p02Top) / p02Height));

        if (relativeScroll > 0.55) {
          root.style.setProperty('--bg', stageData.bgWarm || '#CFB083');
          root.style.setProperty('--fg', stageData.fgWarm || '#281214');
          root.style.setProperty('--accent', stageData.accentWarm || '#714E2F');
        } else {
          root.style.setProperty('--bg', stageData.bg);
          root.style.setProperty('--fg', stageData.fg);
          root.style.setProperty('--accent', stageData.accent);
        }
      } else {
        root.style.setProperty('--bg', stageData.bg);
        root.style.setProperty('--fg', stageData.fg);
        root.style.setProperty('--accent', stageData.accent);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen text-[var(--fg)] bg-[var(--bg)] selection:bg-[#FFD557] selection:text-[#0B0B0B] transition-colors duration-700">
      {/* Comic Gutter Curtain Opening Animation (M1) */}
      <GutterCurtain />

      {/* Film Grain Texture Overlay (M9) */}
      <div className="film-grain" />

      {/* Interactive Custom Cursor (M3) */}
      <CustomCursor currentStage={currentStage} />

      {/* Fixed Navigation Bar (5-1) */}
      <Navbar currentStage={currentStage} />

      {/* Stage Tracker: Vertical Progress & Bottom-Left Temperature Gauge */}
      <StageIndicator currentStage={currentStage} scrollProgress={scrollProgress} />

      {/* Main Content Sections */}
      <main className="w-full">
        {/* ======================================================== */}
        {/* 8-1. HERO (S1 / data-stage="hero") */}
        {/* ======================================================== */}
        <section
          id="hero"
          ref={heroRef}
          data-stage="hero"
          className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 sm:pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden"
        >
          {/* Breathing Wine Glow Background Accent */}
          <div className="absolute top-1/4 -left-20 w-[550px] h-[550px] rounded-full bg-[#530B12] filter blur-[140px] pointer-events-none animate-glow opacity-40" />
          <div className="absolute bottom-10 right-10 w-[420px] h-[420px] rounded-full bg-[#281214] filter blur-[120px] pointer-events-none opacity-30" />

          {/* Main Hero Body */}
          <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Typography, Roles, Buttons */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6 sm:gap-8">
              {/* Top Tag & Role Chips */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFD557] animate-pulse" />
                  <span className="text-xs font-mono-code tracking-[0.18em] text-[#CFB083] uppercase">
                    WEBTOON ARTIST · 2026 PORTFOLIO
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <h1 className="font-serif-kr font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#FFF7CB]">
                    KOO MINJIN
                  </h1>
                  <span className="text-xl sm:text-2xl font-serif-kr text-[#CFB083] opacity-90">
                    구민진
                  </span>
                </div>
              </div>

              {/* Display Headline */}
              <div className="flex flex-col gap-2">
                <p className="font-accent-serif italic text-xl sm:text-2xl text-[#FFD557] tracking-wide">
                  Short stories, shaped by color.
                </p>
                <h2 className="font-serif-kr font-bold text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.25] text-[#FFF7CB] text-balance">
                  짧은 이야기에,
                  <br />
                  마음의 온도를 입힙니다.
                </h2>
              </div>

              {/* Subtext */}
              <p className="text-sm sm:text-base font-serif-kr text-[#FFEDD0]/85 leading-relaxed max-w-xl">
                네 컷 안에서 끝까지 이어지는 이야기.
                <br />
                장면의 감정을 따라 바뀌는 색.
              </p>

              {/* Role Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['스토리 구성', '웹툰 채색', '웹툰 작가'].map((role) => (
                  <span
                    key={role}
                    className="px-3.5 py-1.5 rounded-full text-xs font-mono-code border border-[#CFB083]/30 bg-[#281214]/50 text-[#FFEDD0]"
                  >
                    {role}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#about"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#FFD557] text-[#0B0B0B] font-semibold text-sm hover:bg-[#FFF7CB] hover:scale-105 active:scale-95 transition-all shadow-[0_4px_20px_rgba(255,213,87,0.35)]"
                  data-cursor="이동"
                >
                  <span>이야기 따라가기</span>
                  <ChevronDown className="w-4 h-4" />
                </a>

                <a
                  href="/assets/aistudio/____fd51368d.pdf"
                  download="구민진_웹툰포트폴리오_2026.pdf"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#FFF7CB]/30 text-[#FFF7CB] text-sm hover:border-[#FFD557] hover:text-[#FFD557] hover:bg-white/5 transition-all"
                  data-cursor="다운로드"
                >
                  <ArrowDownToLine className="w-4 h-4" />
                  <span>포트폴리오 PDF 받기</span>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual Frame (Cool & Dark Artwork) */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                className="relative p-3 sm:p-4 bg-[#FAF8F5] rounded-xs comic-panel-frame border border-[#E5E0D8] max-w-sm w-full group hover:-translate-y-1 transition-transform duration-500 shadow-2xl"
                data-cursor="확대"
                onClick={() => handleOpenLightbox(0)}
              >
                <div className="relative overflow-hidden aspect-[3/4] bg-[#0B0B0B] rounded-xs flex items-center justify-center">
                  <img
                    src="/assets/cuts/p02-hero-dark.png"
                    alt="구민진 대표 웹툰 컷 - 긴장감 있는 어두운 채색 연출"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono-code text-[#FFD557]">
                        SELECTED FRAME · 2024
                      </span>
                      <span className="text-xs font-serif-kr text-white font-medium">
                        장면의 어둠과 긴장을 담아낸 채색
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono-code text-[#714E2F]">
                  <span>REPRESENTATIVE PANEL</span>
                  <span>COOL &amp; DARK</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Hero Key Metrics */}
          <div className="relative z-10 max-w-7xl mx-auto w-full pt-10 border-t border-[var(--line)] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex flex-col gap-1">
              <span className="font-serif-kr font-bold text-3xl sm:text-4xl text-[#FFD557]">
                6
              </span>
              <span className="text-xs font-mono-code text-[#CFB083]">Awards · 2024</span>
              <p className="text-xs text-[#FFEDD0]/70 font-serif-kr">
                공모전 수상 <span className="text-amber-300 font-mono-code">[수상 등급 확인 필요]</span>
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-serif-kr font-bold text-3xl sm:text-4xl text-[#FFF7CB]">
                4 Panels
              </span>
              <span className="text-xs font-mono-code text-[#CFB083]">Grand Prize</span>
              <p className="text-xs text-[#FFEDD0]/70 font-serif-kr">
                한국신문협회 신문 만화 공모전 대상
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-serif-kr font-bold text-3xl sm:text-4xl text-[#FFF7CB]">
                2026.09
              </span>
              <span className="text-xs font-mono-code text-[#CFB083]">Internship</span>
              <p className="text-xs text-[#FFEDD0]/70 font-serif-kr">
                툰스퀘어 인턴 · 재직 중
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 8-2. ABOUT (S2 / data-stage="about") */}
        {/* ======================================================== */}
        <section
          id="about"
          ref={aboutRef}
          data-stage="about"
          className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-20 border-t border-[var(--line)]"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left 5 Cols: Section Title */}
            <div className="lg:col-span-5 flex flex-col items-start gap-4">
              <span className="text-xs font-mono-code text-[var(--accent)] tracking-widest uppercase">
                01 — ABOUT
              </span>
              <h2 className="font-serif-kr font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.25] text-[var(--fg)] text-balance">
                이야기를 먼저 세우고,
                <br />
                색으로 마음을 건넵니다.
              </h2>

              {/* Creator Profile Portrait Frame */}
              <div className="mt-6 p-3 bg-[#FAF8F5] rounded-xs comic-panel-frame border border-[#E5E0D8] inline-block shadow-md">
                <img
                  src="/assets/cuts/profile-portrait.png"
                  alt="구민진 프로필 사진"
                  className="w-36 sm:w-44 h-auto object-cover rounded-xs"
                />
                <div className="mt-2 text-center text-[10px] font-mono-code text-[#714E2F]">
                  KOO MINJIN · CREATOR
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Body & Info Spec Table */}
            <div className="lg:col-span-7 flex flex-col gap-8 justify-center">
              {/* Introduction Body Sentences */}
              <div className="flex flex-col gap-3 font-serif-kr text-base sm:text-lg leading-[1.8] text-[var(--fg)] opacity-95">
                <p>정화예술대학교 웹툰애니메이션과에서 웹툰을 배우고 있습니다.</p>
                <p>공모전에서는 네 컷 안에 시작과 끝을 만들었습니다.</p>
                <p>팀 프로젝트에서는 장면의 감정에 맞는 색을 골랐습니다.</p>
                <p>지금은 툰스퀘어에서 인턴으로 일하고 있습니다.</p>
              </div>

              {/* Info Table from Spec */}
              <div className="flex flex-col divide-y divide-[var(--line)] border-y border-[var(--line)] text-xs sm:text-sm">
                <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-mono-code text-[var(--accent)] font-semibold w-36">
                    EDUCATION
                  </span>
                  <span className="text-[var(--fg)] font-serif-kr">
                    정화예술대학교 웹툰애니메이션과 · 2027.02 졸업 예정
                  </span>
                </div>

                <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-mono-code text-[var(--accent)] font-semibold w-36">
                    EXPERIENCE
                  </span>
                  <span className="text-[var(--fg)] font-serif-kr">
                    툰스퀘어 인턴 · 2026.09 ~ 재직 중
                  </span>
                </div>

                <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-mono-code text-[var(--accent)] font-semibold w-36">
                    LANGUAGE
                  </span>
                  <span className="text-[var(--fg)] font-serif-kr">
                    JLPT N3 · 2026.07
                  </span>
                </div>

                <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-mono-code text-[var(--accent)] font-semibold w-36">
                    TOOLS
                  </span>
                  <span className="text-[var(--fg)] font-mono-code">
                    Clip Studio Paint · Adobe Photoshop · SketchUp
                  </span>
                </div>
              </div>

              {/* AI assisted workflow disclaimer as specified */}
              <p className="text-xs font-serif-kr text-[var(--muted)] leading-relaxed">
                NovelAI, Grok, Claude는 아이디어 탐색과 자료 정리, 문장 보조에 활용합니다.{' '}
                <span className="text-amber-300 font-mono-code text-[11px]">[NovelAI 사용 범위 확인 필요]</span>
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 8-3. PROJECT 01 (S3 / data-stage="p01") */}
        {/* ======================================================== */}
        <section
          id="p01"
          ref={p01Ref}
          data-stage="p01"
          className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-20 border-t border-[var(--line)]"
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-16">
            {/* Stage Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--line)] pb-8">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-mono-code text-[var(--accent)] tracking-widest uppercase">
                  02 — SELECTED WORK · 2024
                </span>
                <h2 className="font-serif-kr font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--fg)]">
                  네 컷, 한 가족, 하나의 질문.
                </h2>
                <p className="font-serif-kr text-base sm:text-lg text-[var(--fg)] opacity-90">
                  배달되지 않은 신문 하나에서 시작한 이야기.
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono-code bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 font-semibold">
                  한국신문협회 신문 만화 공모전 · 대상
                </span>
                <span className="text-xs font-mono-code text-[var(--muted)]">
                  개인 출품 · 네 컷 만화 · 스토리·전개 구성
                </span>
              </div>
            </div>

            {/* Intro Lead */}
            <div className="max-w-2xl font-serif-kr text-base sm:text-lg leading-relaxed text-[var(--fg)] opacity-90">
              네 컷은 설명할 자리가 많지 않습니다.
              <br />
              그래서 컷마다 맡을 일을 먼저 정했습니다.
            </div>

            {/* Interactive 4-Cut Stop-Motion Stage Component */}
            <ProjectOneCutStage onOpenLightbox={() => handleOpenLightbox(0)} />

            {/* 3 Design Principles Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              {P01_PRINCIPLES.map((card) => (
                <div
                  key={card.num}
                  className="p-6 rounded-xl border border-[var(--line)] bg-[var(--bg)]/60 backdrop-blur-xs flex flex-col justify-between gap-4 hover:border-[var(--accent)] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-code text-[var(--accent)] font-semibold">
                      {card.num} · {card.tag}
                    </span>
                    <Layers className="w-4 h-4 text-[var(--muted)]" />
                  </div>
                  <div>
                    <h4 className="font-serif-kr text-lg font-bold text-[var(--fg)] mb-2">
                      {card.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--fg)] opacity-85 leading-relaxed font-serif-kr">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Closing Headline */}
            <div className="text-center py-8">
              <p className="font-serif-kr text-xl sm:text-2xl font-semibold text-[var(--fg)] tracking-tight">
                "실제로 내가 느낀 것은 색의 변화가 모든 것을 알려준다는 것이었다."
              </p>
              <span className="text-xs font-mono-code text-[var(--accent)] block mt-2 tracking-wider">
                — 작가의 회고
              </span>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 8-4. PROJECT 02 (S4 / data-stage="p02") - CLIMAX STAGE */}
        {/* ======================================================== */}
        <section
          id="p02"
          ref={p02Ref}
          data-stage="p02"
          className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-20 border-t border-[var(--line)]"
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-16">
            {/* Climax Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--line)] pb-8">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono-code text-[var(--accent)] tracking-widest uppercase">
                    03 — TEAM PROJECT
                  </span>
                  <span className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-amber-900/30 text-amber-300 border border-amber-600/30">
                    [2025 · 연도 확인 필요]
                  </span>
                </div>
                <h2 className="font-serif-kr font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--fg)]">
                  긴장에서 안정으로,
                  <br />
                  색이 먼저 말합니다.
                </h2>
                <p className="font-serif-kr text-base sm:text-lg text-[var(--fg)] opacity-90 max-w-2xl">
                  4인 팀 웹툰에서 채색을 맡았습니다. 초반과 후반의 온도를 서사에 맞춰 다르게 칠했습니다.
                </p>
              </div>

              {/* Team Spec Info Box */}
              <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--bg)]/60 text-xs font-mono-code flex flex-col gap-1.5 min-w-[240px]">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">FORMAT</span>
                  <span className="text-[var(--fg)] font-semibold">팀 웹툰 프로젝트</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">TEAM</span>
                  <span className="text-[var(--fg)]">4인</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">TOTAL</span>
                  <span className="text-[var(--fg)]">전체 73컷</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">MY SHARE</span>
                  <span className="text-amber-300">[담당 컷 수 확인 필요]</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">ROLE</span>
                  <span className="text-[var(--fg)]">채색 [조장 역할 확인 필요]</span>
                </div>
              </div>
            </div>

            {/* M6: Interactive Comparison Slider */}
            <div className="flex flex-col items-center gap-6">
              <ProjectCompareSlider onZoom={(img, title) => handleOpenCustomLightbox(img, title)} />
            </div>

            {/* Comparison Narrative Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-[var(--line)] bg-[#0B0B0B]/60 backdrop-blur-xs flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif-kr font-bold text-lg text-[#FFD557]">
                    COOL &amp; DARK — 눌러 담은 긴장
                  </span>
                  <span className="text-xs font-mono-code text-[var(--muted)]">초반부</span>
                </div>
                <p className="text-xs sm:text-sm font-serif-kr text-[#FFEDD0]/90 leading-relaxed">
                  낮은 채도와 어두운 명암으로 인물과 배경의 톤을 눌렀습니다. 긴장감과 무게감이 앞에 서도록.
                </p>
                <div className="pt-2 border-t border-white/10 text-xs font-mono-code text-[#CFB083]">
                  방문자 확인 포인트: 어두운 배경 속에서 인물이 어떻게 구분되는지
                </div>
              </div>

              <div className="p-6 rounded-xl border border-[var(--line)] bg-[#CFB083]/20 backdrop-blur-xs flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif-kr font-bold text-lg text-[#714E2F]">
                    WARM &amp; SOFT — 숨을 돌려주는 온기
                  </span>
                  <span className="text-xs font-mono-code text-[var(--muted)]">후반부</span>
                </div>
                <p className="text-xs sm:text-sm font-serif-kr text-[var(--fg)] leading-relaxed">
                  높아진 명도와 따뜻한 색온도, 부드러운 대비로 편안하고 안정적인 분위기를 만들었습니다.
                </p>
                <div className="pt-2 border-t border-[var(--line)] text-xs font-mono-code text-[#714E2F]">
                  방문자 확인 포인트: 같은 인물이 초반과 어떻게 다르게 보이는지
                </div>
              </div>
            </div>

            {/* M7: Extracted Palettes with Click-to-Copy */}
            <ColorPaletteGrid onCopyColor={handleCopyColor} copiedHex={copiedHex} />

            {/* 3 Sentences Explaining Color Shift */}
            <div className="p-8 rounded-2xl border border-[var(--line)] bg-[var(--bg)]/70 backdrop-blur-xs text-center max-w-3xl mx-auto flex flex-col gap-3">
              <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-[var(--fg)]">
                색이 바뀌는 이유
              </h3>
              <div className="flex flex-col gap-2 font-serif-kr text-sm sm:text-base text-[var(--fg)] opacity-90 leading-relaxed">
                <p>서사의 분위기가 달라지는 지점에서 색도 함께 바뀝니다.</p>
                <p>명도, 색온도, 대비를 함께 조정해 그 변화가 눈에 띄도록 했습니다.</p>
                <p className="font-semibold text-[var(--accent)]">
                  독자는 대사를 읽기 전에 장면의 감정을 먼저 느낄 수 있습니다.
                </p>
              </div>
            </div>

            {/* Webtoon Strip Gallery */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code text-[var(--accent)] tracking-wider uppercase">
                  SAMPLE STRIPS · 채색 컷 분할 샘플
                </span>
                <span className="text-xs font-mono-code text-[var(--muted)]">
                  팀 프로젝트 73컷 작업 중 일부 발췌
                </span>
              </div>
              <div className="p-4 sm:p-6 bg-[#0B0B0B] rounded-xl border border-[var(--line)] overflow-hidden shadow-2xl">
                <img
                  src="/assets/cuts/p02-horizontal-strip.png"
                  alt="팀 프로젝트 채색 작업 예시 가로 컷 샘플"
                  className="w-full h-auto object-contain rounded-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 8-5. AWARDED WORKS (S5 / data-stage="awarded") */}
        {/* ======================================================== */}
        <section
          id="awarded"
          ref={awardedRef}
          data-stage="awarded"
          className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-20 border-t border-[var(--line)]"
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            {/* Stage Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--line)] pb-8">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-mono-code text-[var(--accent)] tracking-widest uppercase">
                  04 — AWARDED WORKS · 2024
                </span>
                <h2 className="font-serif-kr font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--fg)]">
                  여섯 번의 수상,
                  <br />
                  여섯 개의 이야기.
                </h2>
                <p className="font-serif-kr text-base sm:text-lg text-[var(--fg)] opacity-90 max-w-2xl">
                  2024년 공모전에서 받은 수상작을 모았습니다. 공익의 이야기를 웹툰의 장면과 연출로 옮긴 작업입니다.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono-code bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 font-semibold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>2024 공모전 6관</span>
                </span>
              </div>
            </div>

            {/* M8: Horizontal Awarded Rail with Lightbox Trigger */}
            <AwardedRail onSelectAward={(idx) => handleOpenLightbox(idx)} />

            {/* Featured Visual Highlights Grid (from Page 12) */}
            <div className="pt-8 border-t border-[var(--line)] flex flex-col gap-6">
              <h3 className="text-xs font-mono-code text-[var(--accent)] tracking-widest uppercase">
                FEATURED HIGHLIGHTS · 다양한 주제를 담은 세 가지 시선
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: '어둠의 결 (흑백 연출)',
                    caption: '흑백의 명암 대비로 장면의 긴장과 심리를 쌓았습니다.',
                    image: '/assets/cuts/award-dark-01.png',
                    tag: 'BLACK & WHITE',
                    idx: 2,
                  },
                  {
                    title: '망설임의 한 장면 (일상과 메시지)',
                    caption: '일상 속 망설임을 구체적인 대사와 작은 손짓으로 보여줍니다.',
                    image: '/assets/cuts/award-purple-02.png',
                    tag: 'MESSAGE & PACING',
                    idx: 1,
                  },
                  {
                    title: '온기의 색 (색채와 감정)',
                    caption: '따뜻한 노을빛 채색으로 두 인물 사이의 온기를 담았습니다.',
                    image: '/assets/cuts/award-sunset-03.png',
                    tag: 'WARMTH & TONE',
                    idx: 4,
                  },
                ].map((highlight) => (
                  <div
                    key={highlight.title}
                    onClick={() => handleOpenLightbox(highlight.idx)}
                    className="p-4 rounded-xl border border-[var(--line)] bg-[var(--bg)]/70 hover:border-[var(--accent)] hover:-translate-y-1 transition-all cursor-pointer group shadow-md"
                    data-cursor="확대"
                  >
                    <div className="aspect-[4/3] bg-black/60 rounded-lg overflow-hidden mb-3">
                      <img
                        src={highlight.image}
                        alt={highlight.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-[10px] font-mono-code text-[var(--accent)]">
                      {highlight.tag}
                    </span>
                    <h4 className="font-serif-kr font-bold text-base text-[var(--fg)] mt-1 mb-1 group-hover:text-[var(--accent)] transition-colors">
                      {highlight.title}
                    </h4>
                    <p className="text-xs font-serif-kr text-[var(--muted)] leading-relaxed">
                      {highlight.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 8-6. EXPERIENCE & SKILLS (S6 / data-stage="exp") */}
        {/* ======================================================== */}
        <section
          id="exp"
          ref={expRef}
          data-stage="exp"
          className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-20 border-t border-[var(--line)]"
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-16">
            {/* Section Header */}
            <div className="flex flex-col gap-3 border-b border-[var(--line)] pb-8">
              <span className="text-xs font-mono-code text-[var(--accent)] tracking-widest uppercase">
                05 — EXPERIENCE &amp; SKILLS
              </span>
              <h2 className="font-serif-kr font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--fg)]">
                지나온 장면들,
                <br />
                그리고 지금.
              </h2>
            </div>

            {/* Timeline + Bento Grid Component (M14) */}
            <ExperienceBento />
          </div>
        </section>

        {/* ======================================================== */}
        {/* 8-7. CONTACT (S7 / data-stage="contact") - RISING SUN MOTIF */}
        {/* ======================================================== */}
        <section
          id="contact"
          ref={contactRef}
          data-stage="contact"
          className="relative min-h-[90vh] flex flex-col justify-between pt-28 pb-16 px-6 sm:px-12 lg:px-20 border-t border-[var(--line)] overflow-hidden"
        >
          {/* M12: Rising Sun Motif at Bottom (#FFD557 golden semi-circle sun) */}
          <div className="absolute -bottom-48 sm:-bottom-64 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[500px] rounded-t-full bg-gradient-to-t from-[#FFD557] via-[#FFD557]/80 to-[#FFF7CB]/20 pointer-events-none filter blur-[1px] opacity-75 shadow-[0_-20px_100px_rgba(255,213,87,0.35)]" />

          {/* Contact Content Container */}
          <div className="relative z-10 max-w-4xl mx-auto w-full my-auto text-center flex flex-col items-center gap-8">
            <span className="text-xs font-mono-code text-[var(--accent)] tracking-widest uppercase">
              06 — CONTACT
            </span>

            <div className="flex flex-col gap-3">
              <p className="font-accent-serif italic text-2xl sm:text-3xl text-[#714E2F]">
                Let's talk about the next story.
              </p>
              <h2 className="font-serif-kr font-bold text-3xl sm:text-4xl lg:text-6xl text-[var(--fg)] leading-tight text-balance">
                다음 이야기를 함께
                <br />
                이야기해 주세요.
              </h2>
            </div>

            <p className="font-serif-kr text-base sm:text-lg text-[var(--fg)] opacity-90 max-w-xl leading-relaxed">
              웹툰 스토리 구성과 채색 직무에 관심이 있으시다면, 편하게 연락 주세요.
              <br />
              작업 과정에 대한 질문도 기다립니다.
            </p>

            {/* Email Contact Box */}
            <div className="flex flex-col sm:flex-row items-center gap-3 p-2 pl-5 rounded-full border border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur-md shadow-xl">
              <span className="font-mono-code text-sm sm:text-base text-[var(--fg)] select-all">
                {userEmail}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-full bg-[var(--line)] hover:bg-[var(--accent)] hover:text-[#0B0B0B] text-[var(--fg)] transition-colors"
                  title="이메일 주소 복사"
                  data-cursor="복사"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <a
                  href={`mailto:${userEmail}?subject=[웹툰 포트폴리오 문의] 구민진 창작자님께`}
                  className="px-5 py-2.5 rounded-full bg-[#FFD557] text-[#0B0B0B] text-xs font-semibold hover:bg-[#FFF7CB] transition-all flex items-center gap-1.5 shadow-sm"
                  data-cursor="메일"
                >
                  <Mail className="w-4 h-4" />
                  <span>이메일 보내기</span>
                </a>
              </div>
            </div>

            {/* Secondary Action: Download Portfolio PDF */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="/assets/aistudio/____fd51368d.pdf"
                download="구민진_웹툰포트폴리오_2026.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--line)] bg-[var(--bg)]/80 text-xs font-mono-code text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shadow-sm"
                data-cursor="다운로드"
              >
                <ArrowDownToLine className="w-4 h-4" />
                <span>포트폴리오 원본 PDF 받기</span>
              </a>

              <a
                href="#hero"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-[var(--line)] bg-[var(--bg)]/80 text-xs font-mono-code text-[var(--muted)] hover:text-[var(--fg)] transition-all"
                data-cursor="맨 위로"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>↑ 처음으로</span>
              </a>
            </div>
          </div>

          {/* Footer */}
          <footer className="relative z-10 max-w-7xl mx-auto w-full pt-16 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-[var(--muted)]">
            <div>
              © 2026 KOO MINJIN · 모든 작품의 저작권은 각 창작자에게 있습니다.
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-700 text-[11px]">
                [팀 프로젝트 이미지 게재 동의 확인 필요]
              </span>
            </div>
          </footer>
        </section>
      </main>

      {/* Lightbox Modal (M13) */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        initialIndex={lightboxIndex}
        customImage={lightboxCustomImage}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}
