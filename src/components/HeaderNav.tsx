import React from 'react';
import { CourseData, AppState } from '../types';
import { getBlockProgress, T } from '../utils/courseHelpers';
import { Compass, Sparkles, BookOpen, User, GraduationCap, BarChart3, FileText, MonitorPlay, Box } from 'lucide-react';

interface HeaderNavProps {
  course: CourseData;
  appState: AppState;
  onSelectBlock: (id: string) => void;
  onToggleTeacher: () => void;
  onOpenProgress: () => void;
  onOpenReport: () => void;
  onOpenPresentation: () => void;
  onOpenThreeModal: () => void;
}

export default function HeaderNav({
  course,
  appState,
  onSelectBlock,
  onToggleTeacher,
  onOpenProgress,
  onOpenReport,
  onOpenPresentation,
  onOpenThreeModal
}: HeaderNavProps) {
  const studentName = appState.student.name.trim();

  return (
    <header className="sticky top-0 z-40 bg-[#3B2211]/95 backdrop-blur-md text-[#FFF8ED] border-b border-[#59371D] shadow-md transition-colors">
      {/* Top Banner Notice in Sklep Amber */}
      <div className="bg-[#2B180A] px-4 py-1.5 text-center text-xs font-semibold text-amber-200/90 flex flex-wrap items-center justify-center gap-2 border-b border-amber-950/40">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Tema Sklep Activo · MPCDPD (1786) RA4 · 4 Sesiones Interactivas con el Joven Explorador</span>
        <span className="hidden sm:inline text-amber-500">|</span>
        <span className="text-amber-300 font-bold">
          {studentName ? `Docente/Estudiante: ${studentName}` : 'Identifícate en el panel inferior'}
        </span>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-amber-950 shadow-md">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-white">
                CDPD <span className="text-amber-400 font-black">RA4</span>
              </span>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                FP 1786
              </span>
            </div>
            <p className="text-[11px] text-amber-200/75 truncate max-w-xs sm:max-w-md">
              {T(course.meta.title)}
            </p>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Teacher Mode Button */}
          <button
            onClick={onToggleTeacher}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
              appState.teacher
                ? 'bg-amber-400 text-amber-950 shadow-md scale-102 ring-2 ring-amber-300'
                : 'bg-[#291709] hover:bg-[#4E2E16] text-amber-200 border border-amber-800/60'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>{appState.teacher ? 'Modo Docente [ACTIVO]' : 'Modo Docente'}</span>
          </button>

          {/* Progress Button */}
          <button
            onClick={onOpenProgress}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold bg-[#291709] hover:bg-[#4E2E16] text-amber-200 border border-amber-800/60 transition-colors cursor-pointer"
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
            <span>Progreso</span>
          </button>

          {/* Presentation Mode Button */}
          <button
            onClick={onOpenPresentation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold bg-[#291709] hover:bg-[#4E2E16] text-amber-200 border border-amber-800/60 transition-colors cursor-pointer"
          >
            <MonitorPlay className="w-3.5 h-3.5 text-amber-400" />
            <span>Presentación</span>
          </button>

          {/* 3D Visor Button */}
          <button
            onClick={onOpenThreeModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold bg-[#291709] hover:bg-[#4E2E16] text-amber-300 border border-amber-800/60 transition-colors cursor-pointer"
          >
            <Box className="w-3.5 h-3.5 text-amber-400" />
            <span>Visor 3D</span>
          </button>

          {/* Report Button Pill */}
          <button
            onClick={onOpenReport}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 font-black rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Informe RA4</span>
          </button>
        </div>
      </div>

      {/* Sessions Route Strip (S14, S15, S16, S17) */}
      <div className="bg-[#2B180A]/80 border-t border-amber-950/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
          <span className="text-[11px] font-bold text-amber-400/80 uppercase tracking-wider shrink-0 mr-2 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> Sesiones:
          </span>

          {course.blocks.map((block, idx) => {
            const prog = getBlockProgress(block, appState);
            const isCur = block.id === appState.cur;

            return (
              <button
                key={block.id}
                onClick={() => onSelectBlock(block.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                  isCur
                    ? 'bg-amber-400 text-amber-950 border-amber-300 shadow-md scale-102'
                    : 'bg-[#381F0D] hover:bg-[#4A2B14] text-amber-100/90 border-amber-900/60'
                }`}
              >
                {/* Status Dot */}
                <span
                  className={`w-2 h-2 rounded-full ${
                    prog.state === 'full'
                      ? 'bg-emerald-500'
                      : prog.state === 'part'
                      ? 'bg-amber-500'
                      : 'bg-stone-500'
                  }`}
                />
                <span>{block.id}</span>
                <span className="text-[11px] font-normal opacity-85">
                  ({prog.d}/{prog.n})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
