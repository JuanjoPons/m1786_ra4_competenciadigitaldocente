import React, { useState } from 'react';
import ThreeCanvas from './ThreeCanvas';
import { Sparkles, Compass, ShieldCheck, Award, Zap } from 'lucide-react';

export default function ThreeStudioSection() {
  const [activeTab, setActiveTab] = useState<'compass' | 'badge'>('compass');

  return (
    <section id="3d-studio" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-[#2F1D11] via-[#3E2514] to-[#25160C] text-amber-50 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border-2 border-amber-600/30 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text & Features */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 border border-amber-400/30">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>TECNOLOGÍA & MODELADO 3D INTERACTIVO</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
              Experiencia 3D en Tiempo Real
            </h2>

            <p className="text-sm sm:text-base text-amber-100/85 leading-relaxed font-normal">
              Inspirado en el diseño animado de Sklep y enriquecido con renderizado tridimensional interactivo.
              Interactúa directamente con la brújula del explorador, manipula la iluminación ambiental y
              observa los reflejos físicos PBR a 60 fotogramas por segundo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-white/5 border border-amber-500/20 p-3.5 rounded-2xl">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-white">Rotación 360°</h3>
                  <p className="text-[11px] text-amber-200/70 mt-0.5">
                    Arrastra el cursor sobre el lienzo para girar el objeto en cualquier ángulo.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 border border-amber-500/20 p-3.5 rounded-2xl">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-white">Materiales PBR</h3>
                  <p className="text-[11px] text-amber-200/70 mt-0.5">
                    Cristal óptico translúcido, latón dorado brillante y partículas flotantes.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2 text-xs text-amber-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> WebGL acelerado por hardware
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" /> Tres.js Studio Edition
              </span>
            </div>
          </div>

          {/* Right: Live Interactive Three.js Viewport */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-lg bg-[#1F1209]/80 backdrop-blur-lg rounded-3xl p-5 border-2 border-amber-400/40 shadow-2xl">
              <ThreeCanvas />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
