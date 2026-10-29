import React from 'react';
import { Target, Brain, ShieldCheck, Laptop } from 'lucide-react';

export default function TrustStrip() {
  const highlights = [
    {
      icon: Target,
      title: 'Tres Funciones Evaluativas',
      subtitle: 'Diagnóstica (inicio), formativa (proceso) y sumativa (término)',
    },
    {
      icon: Brain,
      title: 'Inteligencia Artificial Ética',
      subtitle: 'Detección de patrones siempre contrastada con criterio pedagógico',
    },
    {
      icon: ShieldCheck,
      title: 'Seguridad & Protección RGPD',
      subtitle: 'Contraseñas robustas, sin dispositivos personales y canales privados',
    },
    {
      icon: Laptop,
      title: 'CoRubrics & Padlet',
      subtitle: 'Automatización de rúbricas y seguimiento colaborativo en tiempo real',
    },
  ];

  return (
    <section className="bg-[#FAF4E6] border-b border-amber-900/10 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {highlights.map((h, idx) => {
          const Icon = h.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/70 hover:bg-white transition-all shadow-xs border border-amber-900/5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 group-hover:bg-amber-200 flex items-center justify-center text-amber-900 shrink-0 transition-colors">
                <Icon className="w-5 h-5 text-amber-800" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs sm:text-sm font-bold text-amber-950 truncate">
                  {h.title}
                </h2>
                <p className="text-[11px] text-amber-800/80 truncate">
                  {h.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
