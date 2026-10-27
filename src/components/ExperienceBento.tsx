import React from 'react';
import { TIMELINE_MILESTONES } from '../data/portfolioData';
import { Briefcase, BookOpen, Sparkles, Palette, Users, Wrench } from 'lucide-react';

export const ExperienceBento: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-12">
      {/* Horizontal Interactive Timeline (M14) */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-mono-code text-[var(--accent)] tracking-widest uppercase">
          TIMELINE · 지나온 궤적
        </h3>

        <div className="relative py-8">
          {/* Timeline continuous horizontal connector bar */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[var(--line)] -translate-y-1/2 z-0" />

          {/* 4 Milestones */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE_MILESTONES.map((item, idx) => (
              <div
                key={item.year}
                className="flex flex-col items-start bg-[var(--bg)]/90 backdrop-blur-md p-4 rounded-xl border border-[var(--line)] shadow-sm hover:border-[var(--accent)] transition-colors group"
              >
                {/* Node Dot */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
                  <span className="text-xs font-mono-code font-bold text-[var(--accent)]">
                    {item.year}
                  </span>
                </div>
                <h4 className="font-serif-kr text-sm font-bold text-[var(--fg)] mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[var(--muted)] leading-relaxed font-serif-kr">
                  {item.subtitle}
                </p>
                <div className="mt-3">
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-[var(--line)] text-[var(--fg)]">
                    {item.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Internship Featured Card */}
      <div className="p-6 sm:p-8 rounded-2xl border border-[var(--line)] bg-[var(--bg)]/60 backdrop-blur-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/15 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h4 className="font-serif-kr text-xl font-bold text-[var(--fg)]">
                툰스퀘어 (Toonsquare) 인턴
              </h4>
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-emerald-900/30 text-emerald-300 border border-emerald-600/30">
                재직 중
              </span>
            </div>
            <p className="text-xs font-mono-code text-[var(--muted)]">
              2026.09.03 ~ 현재
            </p>
            <p className="text-sm font-serif-kr text-[var(--fg)] opacity-90 mt-1">
              2026년 9월, 툰스퀘어에서 인턴으로 첫걸음을 뗐습니다.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-center">
          <span className="text-xs font-mono-code text-[var(--muted)]">
            담당 업무:
          </span>
          <span className="text-xs font-mono-code px-2.5 py-1 rounded bg-amber-900/30 text-amber-300 border border-amber-600/30">
            [담당 업무 확인 필요]
          </span>
        </div>
      </div>

      {/* Bento Grid 4 Blocks: 2x1, 1x1, 1x1, 2x1 */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-mono-code text-[var(--accent)] tracking-widest uppercase">
          SKILLS &amp; METHODOLOGY · 벤토 그리드
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Block 1: Storytelling (2 cols on md) */}
          <div className="md:col-span-2 p-6 sm:p-7 rounded-2xl border border-[var(--line)] bg-[var(--bg)]/70 backdrop-blur-xs flex flex-col justify-between gap-4 hover:border-[var(--accent)] transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-[var(--accent)] tracking-wider">
                01 · STORYTELLING
              </span>
              <BookOpen className="w-4 h-4 text-[var(--muted)]" />
            </div>
            <div>
              <h4 className="font-serif-kr text-lg sm:text-xl font-bold text-[var(--fg)] mb-2">
                짧은 분량 안의 시작과 끝
              </h4>
              <p className="text-sm leading-relaxed text-[var(--fg)] opacity-90 font-serif-kr">
                컷마다 역할을 명확하게 나누어 이야기가 군더더기 없이 끝까지 이어지게 만듭니다.
                일상의 사소한 질문 하나로 독자의 흥미를 열고, 감정의 완결로 닫는 구조를 지향합니다.
              </p>
            </div>
            <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono-code text-[var(--muted)]">
              <span>근거 프로젝트: Project 01 (공모전 대상작)</span>
              <span className="text-[var(--accent)]">4컷 호흡 설계</span>
            </div>
          </div>

          {/* Block 2: Coloring (1 col) */}
          <div className="p-6 rounded-2xl border border-[var(--line)] bg-[var(--bg)]/70 backdrop-blur-xs flex flex-col justify-between gap-4 hover:border-[var(--accent)] transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-[var(--accent)] tracking-wider">
                02 · COLORING
              </span>
              <Palette className="w-4 h-4 text-[var(--muted)]" />
            </div>
            <div>
              <h4 className="font-serif-kr text-lg font-bold text-[var(--fg)] mb-2">
                감정의 온도 조절
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-[var(--fg)] opacity-90 font-serif-kr">
                장면의 서사 변화에 맞춰 명도, 색온도, 대비를 미세하게 조절하여 대사 이전에 감정이 먼저 닿도록 합니다.
              </p>
            </div>
            <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono-code text-[var(--muted)]">
              <span>Project 02</span>
              <span className="text-[var(--accent)]">Cool ↔ Warm</span>
            </div>
          </div>

          {/* Block 3: Collaboration (1 col) */}
          <div className="p-6 rounded-2xl border border-[var(--line)] bg-[var(--bg)]/70 backdrop-blur-xs flex flex-col justify-between gap-4 hover:border-[var(--accent)] transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-[var(--accent)] tracking-wider">
                03 · COLLABORATION
              </span>
              <Users className="w-4 h-4 text-[var(--muted)]" />
            </div>
            <div>
              <h4 className="font-serif-kr text-lg font-bold text-[var(--fg)] mb-2">
                4인 팀에서의 채색
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-[var(--fg)] opacity-90 font-serif-kr">
                팀 웹툰 프로젝트에서 전체 서사의 톤앤매너를 지키며 통일성 있는 채색 작업을 조율했습니다.
              </p>
            </div>
            <div className="pt-3 border-t border-[var(--line)] text-xs font-mono-code text-[var(--muted)] flex items-center justify-between">
              <span>팀워크 &amp; 파이프라인</span>
              <span className="text-[10px] text-amber-300">[역할 확인 중]</span>
            </div>
          </div>

          {/* Block 4: Tools (2 cols on md) */}
          <div className="md:col-span-2 p-6 sm:p-7 rounded-2xl border border-[var(--line)] bg-[var(--bg)]/70 backdrop-blur-xs flex flex-col justify-between gap-4 hover:border-[var(--accent)] transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-[var(--accent)] tracking-wider">
                04 · TOOLS &amp; WORKFLOW
              </span>
              <Wrench className="w-4 h-4 text-[var(--muted)]" />
            </div>
            <div>
              <h4 className="font-serif-kr text-lg sm:text-xl font-bold text-[var(--fg)] mb-3">
                작업에 쓰는 도구
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { name: 'Clip Studio Paint', desc: '선화 & 메인 채색' },
                  { name: 'Adobe Photoshop', desc: '후가공 & 톤 보정' },
                  { name: 'SketchUp', desc: '공간 배경 배치' },
                  { name: 'AI-assisted workflow', desc: '아이디어 탐색 & 자료 정리' },
                ].map((t) => (
                  <div
                    key={t.name}
                    className="flex flex-col px-3.5 py-2 rounded-xl border border-[var(--line)] bg-[var(--bg)] text-xs"
                  >
                    <span className="font-mono-code font-semibold text-[var(--fg)]">
                      {t.name}
                    </span>
                    <span className="text-[10px] text-[var(--muted)] font-serif-kr mt-0.5">
                      {t.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs font-serif-kr text-[var(--muted)] border-t border-[var(--line)] pt-3 leading-relaxed">
              * NovelAI, Grok, Claude는 아이디어 탐색과 자료 정리, 문장 보조용으로만 윤리적으로 활용합니다.{' '}
              <span className="text-amber-300 font-mono-code text-[10px]">[NovelAI 사용 범위 확인 필요]</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
