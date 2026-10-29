import React from 'react';
import { CourseData, AppState } from '../types';
import { getBlockProgress, T } from '../utils/courseHelpers';
import { X, BarChart3, CheckCircle2, Clock } from 'lucide-react';

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: CourseData;
  appState: AppState;
  onSelectBlock: (id: string) => void;
}

export default function ProgressModal({
  isOpen,
  onClose,
  course,
  appState,
  onSelectBlock
}: ProgressModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-xl w-full border-2 border-amber-300 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#E79A27] via-[#F2AF37] to-[#FCD467] text-amber-950 flex items-center justify-between border-b border-amber-400">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-950/15 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-amber-950" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">
                Seguimiento del Módulo
              </span>
              <h3 className="font-display font-extrabold text-lg text-amber-950">
                Progreso por Sesiones (RA4)
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/70 hover:bg-white text-amber-950 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of sessions progress */}
        <div className="p-6 space-y-4">
          {course.blocks.map((block) => {
            const prog = getBlockProgress(block, appState);
            const isFull = prog.state === 'full';

            return (
              <div
                key={block.id}
                onClick={() => {
                  onSelectBlock(block.id);
                  onClose();
                }}
                className="p-4 bg-white hover:bg-amber-50/70 rounded-2xl border border-amber-200 shadow-xs cursor-pointer transition-all flex flex-col gap-2 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-display font-extrabold text-sm text-amber-950 group-hover:text-amber-700 transition-colors">
                      {block.id} · {T(block.title)}
                    </span>
                    <span className="text-xs text-amber-800/80 block mt-0.5">
                      {prog.d} de {prog.n} actividades completadas ({prog.pct}%)
                    </span>
                  </div>
                  {isFull ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completa
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5" /> En curso
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="w-full bg-amber-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${prog.pct}%` }}
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-300"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
