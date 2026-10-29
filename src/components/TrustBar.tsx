import React from 'react';
import { Truck, CreditCard, RotateCcw, Headphones } from 'lucide-react';

export default function TrustBar() {
  const perks = [
    {
      icon: Truck,
      title: 'Paczkomat & Envíos Rápidos',
      subtitle: 'Entrega nacional & internacional desde 3,99 €',
    },
    {
      icon: CreditCard,
      title: 'Bizum, Tarjetas & Apple Pay',
      subtitle: 'Paga de la forma más cómoda y 100% segura',
    },
    {
      icon: RotateCcw,
      title: '30 días de devolución',
      subtitle: 'Garantía total de satisfacción sin preguntas',
    },
    {
      icon: Headphones,
      title: 'Atención 7 días a la semana',
      subtitle: 'Exploradores y veterinarios reales, sin robots',
    },
  ];

  return (
    <section className="bg-[#FAF4E6] border-b border-amber-900/10 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {perks.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/60 hover:bg-white transition-all shadow-xs border border-amber-900/5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 group-hover:bg-amber-200 flex items-center justify-center text-amber-900 shrink-0 transition-colors">
                <Icon className="w-5 h-5 text-amber-800" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs sm:text-sm font-bold text-amber-950 truncate">
                  {p.title}
                </h2>
                <p className="text-[11px] text-amber-800/80 truncate">
                  {p.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
