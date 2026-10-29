import React from 'react';
import { X, Check, Sparkles, ExternalLink } from 'lucide-react';

interface ReferenceViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReferenceViewerModal({ isOpen, onClose }: ReferenceViewerModalProps) {
  if (!isOpen) return null;

  const adaptations = [
    {
      title: 'Paleta cromática y estética Sklep',
      desc: 'Gradiente miel/ámbar cálido en el hero (#E79A27 -> #FCD467), fondos crema (#FAF4E6 / #FFFDF9), tarjetas squircle con bordes suaves y elevaciones limpias.'
    },
    {
      title: 'Sustitución completa de perros por el chico 3D',
      desc: 'El perro border collie "Biscuit" y toda mención a perros ha sido sustituida por el personaje 3D del joven explorador (Leo) con gorro verde, mochila y lupa, y accesorios de aventura.'
    },
    {
      title: 'Mascota con animación de seguimiento del cursor',
      desc: 'El personaje 3D se inclina dinámicamente con perspectiva tridimensional cuando el usuario mueve el ratón, con reflejos en la lupa y bocadillos de diálogo interactivos.'
    },
    {
      title: 'Inclusión de gráficos y visor 3D en tiempo real',
      desc: 'Incorporación de Three.js (WebGL) con brújula y emblema tridimensional interactivo con materiales metálicos PBR, rotación libre en 360° y cambio de iluminación.'
    },
    {
      title: 'Franja de confianza y cuadrícula de categorías',
      desc: 'Las 4 tarjetas de confianza (envíos, pagos, devoluciones, soporte) y categorías rediseñadas con compañeros 3D (gato, ave, hámster, camaleón y explorador).'
    },
    {
      title: 'Oferta de la semana con cuenta regresiva',
      desc: 'Mochila de explorador en 3D con descuento del -30%, temporizador dinámico y productos complementarios con botón de compra rápida.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-4xl w-full border-2 border-amber-300 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#301B0E] p-6 text-white flex items-center justify-between border-b border-amber-900/30">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Comparativa & Adaptación de Diseño</span>
            </div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white">
              Imágenes de Referencia & Cambios Realizados
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          {/* Side by side images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image 1: Sklep original reference */}
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              <span className="text-xs font-bold text-amber-900 block mb-2">
                1. Imagen Original de Referencia (Sklep Pawzo)
              </span>
              <div className="aspect-9/16 sm:aspect-3/4 bg-black/5 rounded-xl overflow-hidden flex items-center justify-center border border-amber-200">
                <img
                  src="/public/assets/aistudio/Sklep_internetowy_dla_zwierza_t_z_maskotka___kto_ra_s_ledzi_kursor___animacja___pet_shop_web_design_786a1fe0.jpeg"
                  alt="Diseño original Sklep con perro"
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <p className="text-[11px] text-amber-800/80 mt-2">
                Diseño base: cabecera cálida, mascota que sigue el cursor, barra de confianza y ofertas.
              </p>
            </div>

            {/* Image 2: 3D Boy Character replacing the dog */}
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              <span className="text-xs font-bold text-amber-900 block mb-2">
                2. Nuevo Personaje 3D (Chico Explorador)
              </span>
              <div className="aspect-9/16 sm:aspect-3/4 bg-black/5 rounded-xl overflow-hidden flex items-center justify-center border border-amber-200">
                <img
                  src="/public/assets/aistudio/635289091232512192_236bd8b1.jpeg"
                  alt="Chico 3D explorador con lupa y gorro verde"
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <p className="text-[11px] text-amber-800/80 mt-2">
                Sustituto de la mascota: el chico explorador con lupa, gorro verde y mochila de aventura.
              </p>
            </div>
          </div>

          {/* Adaptation Checklist */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-amber-950">
              Checklist de requisitos cumplidos:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {adaptations.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-amber-200 shadow-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-3" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-amber-950">{item.title}</h4>
                    <p className="text-[11px] text-amber-900/75 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
