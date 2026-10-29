import React, { useState, useEffect } from 'react';
import { CourseData, BlockData } from '../types';
import { T } from '../utils/courseHelpers';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, BookOpen } from 'lucide-react';
import Infographics from './Infographics';

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  block: BlockData;
  course: CourseData;
}

export default function PresentationModal({
  isOpen,
  onClose,
  block,
  course
}: PresentationModalProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  // Collect slides: Slide 0 is Cover, then each section with theory/visuals
  const validSections = block.sections.filter(
    (s) => s.kind === 'intro' || s.kind === 'theory' || s.kind === 'selfcheck'
  );

  const totalSlides = 1 + validSections.length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setSlideIndex((prev) => Math.min(totalSlides - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, totalSlides, onClose]);

  if (!isOpen) return null;

  const currentSection = slideIndex > 0 ? validSections[slideIndex - 1] : null;

  return (
    <div className="fixed inset-0 z-50 bg-[#261509] text-amber-50 flex flex-col justify-between overflow-hidden animate-fade-in select-none">
      {/* Top Header */}
      <div className="p-4 bg-[#351F0D] flex items-center justify-between border-b border-amber-900/50">
        <div className="flex items-center gap-2">
          <span className="bg-amber-400 text-amber-950 font-black text-xs px-2.5 py-0.5 rounded-full">
            {block.id}
          </span>
          <span className="font-display font-bold text-sm text-white truncate max-w-md">
            {T(block.title)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-amber-300 font-bold">
            Diapositiva {slideIndex + 1} de {totalSlides}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-[#1A0E06] h-1.5">
        <div
          style={{ width: `${((slideIndex + 1) / totalSlides) * 100}%` }}
          className="h-full bg-amber-400 transition-all duration-300"
        />
      </div>

      {/* Slide Body */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-12 max-w-5xl mx-auto w-full flex flex-col justify-center">
        {slideIndex === 0 ? (
          /* Cover Slide */
          <div className="bg-gradient-to-b from-[#E79A27] via-[#F2AF37] to-[#FCD467] rounded-3xl p-8 sm:p-12 text-amber-950 shadow-2xl flex flex-col sm:flex-row items-center gap-8 border-4 border-amber-400">
            <div className="flex-1 space-y-4">
              <span className="bg-amber-950 text-amber-300 text-xs font-black uppercase px-3 py-1 rounded-full">
                Sesión {block.id} · 1 Hora
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-[#291708] leading-tight">
                {T(block.title)}
              </h2>
              {block.cover?.lead && (
                <p className="text-base text-amber-900 font-medium leading-relaxed">
                  {T(block.cover.lead)}
                </p>
              )}
            </div>

            <div className="w-48 h-48 rounded-3xl bg-white/40 p-3 flex items-center justify-center shrink-0 border-2 border-white/80 shadow-lg">
              <img
                src="/public/assets/aistudio/635289091232512192_236bd8b1.jpeg"
                alt="Leo el Explorador"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        ) : (
          /* Content Slide */
          currentSection && (
            <div className="bg-white rounded-3xl p-8 sm:p-10 text-amber-950 shadow-2xl border border-amber-300 space-y-5">
              <div className="border-b border-amber-100 pb-3 flex items-center justify-between">
                <h3 className="font-display font-black text-xl sm:text-2xl text-amber-950">
                  {currentSection.num ? `${currentSection.num}. ` : ''}
                  {T(currentSection.title)}
                </h3>
                <span className="text-xs font-bold uppercase bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
                  {currentSection.kind}
                </span>
              </div>

              {/* Visuals or Nodes */}
              <div className="space-y-4">
                {currentSection.nodes.map((n, nIdx) => (
                  <Infographics key={nIdx} node={n} />
                ))}
              </div>
            </div>
          )
        )}
      </div>

      {/* Bottom Navigation Controls */}
      <div className="p-4 bg-[#351F0D] flex items-center justify-between border-t border-amber-900/50">
        <button
          disabled={slideIndex === 0}
          onClick={() => setSlideIndex(slideIndex - 1)}
          className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white font-bold text-xs rounded-full transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        <span className="text-xs text-amber-300/80 font-medium">
          Usa las flechas del teclado (← / →) o la barra espaciadora para avanzar.
        </span>

        <button
          disabled={slideIndex === totalSlides - 1}
          onClick={() => setSlideIndex(slideIndex + 1)}
          className="flex items-center gap-1.5 px-5 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-30 text-amber-950 font-black text-xs rounded-full shadow-md transition-all cursor-pointer"
        >
          <span>Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
