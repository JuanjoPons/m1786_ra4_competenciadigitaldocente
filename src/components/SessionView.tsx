import React from 'react';
import { CourseData, BlockData, AppState, UserActivityState } from '../types';
import { T } from '../utils/courseHelpers';
import Infographics from './Infographics';
import ActivityRenderer from './ActivityRenderer';
import { Compass, BookOpen, ChevronLeft, ChevronRight, FileText, MonitorPlay, Sparkles } from 'lucide-react';

interface SessionViewProps {
  block: BlockData;
  course: CourseData;
  appState: AppState;
  onUpdateActivity: (actId: string, updated: UserActivityState) => void;
  onSelectBlock: (id: string) => void;
  onOpenReport: () => void;
  onOpenPresentation: () => void;
}

export default function SessionView({
  block,
  course,
  appState,
  onUpdateActivity,
  onSelectBlock,
  onOpenReport,
  onOpenPresentation
}: SessionViewProps) {
  const currentIndex = course.blocks.findIndex((b) => b.id === block.id);
  const prevBlock = currentIndex > 0 ? course.blocks[currentIndex - 1] : null;
  const nextBlock = currentIndex < course.blocks.length - 1 ? course.blocks[currentIndex + 1] : null;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Session Cover Banner (Styled in Sklep warm amber & chocolate) */}
      <div className="bg-gradient-to-br from-[#3B2211] via-[#482914] to-[#2D1A0D] text-amber-50 rounded-3xl p-6 sm:p-8 border-2 border-amber-500/30 shadow-xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display font-black text-xs text-amber-950 bg-amber-400 px-3 py-0.5 rounded-full shadow-xs">
                {block.id}
              </span>
              <span className="text-xs font-semibold text-amber-300">
                Sesión {currentIndex + 1} de {course.blocks.length} · 1 Hora de dedicación
              </span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
              {T(block.title)}
            </h2>

            {block.cover?.lead && (
              <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-normal max-w-xl">
                {T(block.cover.lead)}
              </p>
            )}

            {/* Key sign badges */}
            {block.cover?.signs && (
              <div className="flex flex-wrap gap-2 pt-2">
                {block.cover.signs.map((sg, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-100 bg-white/10 px-3 py-1 rounded-full border border-amber-400/20 backdrop-blur-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{T(sg[2])}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right 3D Boy Avatar Badge */}
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 bg-gradient-to-b from-amber-400/20 to-amber-500/10 rounded-3xl p-2 flex items-center justify-center border-2 border-amber-400/40 shadow-inner group">
              <img
                src="/public/assets/aistudio/635289091232512192_236bd8b1.jpeg"
                alt="Leo el Explorador Tutor"
                className="max-h-full max-w-full object-contain filter contrast-105 group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={onOpenPresentation}
                className="absolute -bottom-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold text-[11px] px-3 py-1 rounded-full shadow-md flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
              >
                <MonitorPlay className="w-3 h-3" />
                <span>Presentación</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: TOC Sidebar + Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sticky Table of Contents */}
        <aside className="lg:col-span-3 sticky top-24 space-y-3">
          <div className="bg-white rounded-3xl p-5 border border-amber-900/10 shadow-xs">
            <h3 className="font-display font-extrabold text-xs uppercase tracking-wider text-amber-800 mb-3 flex items-center gap-1.5 pb-2 border-b border-amber-100">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Índice de la sesión</span>
            </h3>

            <nav className="space-y-1">
              {block.sections.map((sec, sIdx) => {
                const secId = `sec-${block.id}-${sec.num}`;
                return (
                  <a
                    key={sIdx}
                    href={`#${secId}`}
                    className="block text-xs font-semibold text-amber-950/80 hover:text-amber-700 hover:bg-amber-50 p-2 rounded-xl transition-colors truncate"
                  >
                    <span className="font-bold text-amber-700 mr-1.5">{sec.num ? `${sec.num}.` : '•'}</span>
                    <span>{T(sec.title)}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="lg:col-span-9 space-y-8">
          {block.sections.map((section, secIdx) => {
            const secId = `sec-${block.id}-${section.num}`;

            // Map activity ids to actual ActivityData objects
            const sectionActs = section.acts
              .map((actId) => block.acts.find((a) => a.id === actId))
              .filter(Boolean) as any[];

            return (
              <section
                key={secIdx}
                id={secId}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-xs space-y-4 scroll-mt-24"
              >
                {/* Section Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-100 pb-3">
                  <h3 className="font-display font-black text-xl sm:text-2xl text-amber-950 leading-snug">
                    {section.num ? <span className="text-amber-700 mr-2">{section.num}.</span> : null}
                    {T(section.title)}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
                    {section.kind}
                  </span>
                </div>

                {/* Section Nodes (Theory, compare, cards, chains) */}
                <div className="space-y-2">
                  {section.nodes.map((node, nIdx) => (
                    <Infographics key={nIdx} node={node} />
                  ))}
                </div>

                {/* Section Activities */}
                {sectionActs.length > 0 && (
                  <div className="pt-4 border-t border-amber-100 space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <h4 className="font-display font-extrabold text-sm sm:text-base text-amber-950 uppercase tracking-wide">
                        Actividades de la sección:
                      </h4>
                    </div>

                    {sectionActs.map((act) => (
                      <ActivityRenderer
                        key={act.id}
                        activity={act}
                        appState={appState}
                        onUpdateActivity={onUpdateActivity}
                      />
                    ))}
                  </div>
                )}
              </section>
            );
          })}

          {/* Bottom Session Navigator */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-amber-200">
            {prevBlock ? (
              <button
                onClick={() => onSelectBlock(prevBlock.id)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-amber-50 text-amber-950 border border-amber-300 font-bold text-xs rounded-full shadow-xs transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-amber-600" />
                <span>Sesión Anterior ({prevBlock.id})</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={onOpenReport}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-extrabold text-xs rounded-full transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-800" />
              <span>Generar Informe de la Sesión</span>
            </button>

            {nextBlock ? (
              <button
                onClick={() => onSelectBlock(nextBlock.id)}
                className="flex items-center gap-2 px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs rounded-full shadow-md transition-all cursor-pointer"
              >
                <span>Siguiente Sesión ({nextBlock.id})</span>
                <ChevronRight className="w-4 h-4 text-amber-950" />
              </button>
            ) : (
              <button
                onClick={onOpenReport}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 font-black text-xs rounded-full shadow-md transition-all cursor-pointer"
              >
                <span>Finalizar y Ver Informe Completo</span>
                <ChevronRight className="w-4 h-4 text-amber-950" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
