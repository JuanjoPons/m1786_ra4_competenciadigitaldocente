import React from 'react';
import { Compass, Heart, ShieldCheck, Mail, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenRefModal: () => void;
  onOpenEduModal: () => void;
}

export default function Footer({ onOpenRefModal, onOpenEduModal }: FooterProps) {
  return (
    <footer className="bg-[#2D1B0F] text-amber-100/90 pt-16 pb-12 border-t-4 border-amber-500/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-amber-900/40">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-xl font-extrabold text-amber-400">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-amber-950 shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-display tracking-tight text-white">
                PAWZO <span className="text-amber-400">EXPLORER</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-amber-200/80 max-w-sm leading-relaxed">
              Inspirado en el diseño web de Sklep, adaptado con el carismático personaje 3D del joven
              explorador para sustituir todas las referencias caninas y llevar la ilusión de la
              naturaleza y el cuidado animal a cada hogar.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpenRefModal}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white bg-amber-900/40 px-3 py-1.5 rounded-full border border-amber-800/60 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Ver comparativa de diseño</span>
              </button>
              <button
                onClick={onOpenEduModal}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white bg-amber-900/40 px-3 py-1.5 rounded-full border border-amber-800/60 transition-colors"
              >
                <span>Aula CDPD RA4</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-white mb-3">Compañeros 3D</h4>
            <ul className="space-y-2 text-xs text-amber-200/75 font-medium">
              <li><a href="#categories" className="hover:text-amber-300 transition-colors">Joven Explorador</a></li>
              <li><a href="#categories" className="hover:text-amber-300 transition-colors">Gatitos Felices</a></li>
              <li><a href="#categories" className="hover:text-amber-300 transition-colors">Aves Cantoras</a></li>
              <li><a href="#categories" className="hover:text-amber-300 transition-colors">Pequeños Roedores</a></li>
              <li><a href="#categories" className="hover:text-amber-300 transition-colors">Reptiles Curiosos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-white mb-3">Servicios & Ayuda</h4>
            <ul className="space-y-2 text-xs text-amber-200/75 font-medium">
              <li><span className="hover:text-amber-300 cursor-pointer">Envíos 24 horas</span></li>
              <li><span className="hover:text-amber-300 cursor-pointer">Devoluciones de 30 días</span></li>
              <li><span className="hover:text-amber-300 cursor-pointer">Guías de Expedición</span></li>
              <li><span className="hover:text-amber-300 cursor-pointer">Atención personalizada</span></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="font-display font-bold text-sm text-white mb-2">Club de Exploradores</h4>
            <p className="text-xs text-amber-200/75 mb-3 leading-relaxed">
              Recibe consejos semanales de Leo y descuentos exclusivos en equipo 3D.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('¡Bienvenido al Club de Exploradores!'); }} className="space-y-2">
              <input
                type="email"
                placeholder="tu-correo@ejemplo.com"
                className="w-full bg-[#1F1209] border border-amber-900/60 rounded-full px-3.5 py-2 text-xs text-white placeholder-amber-400/40 focus:outline-hidden focus:border-amber-400"
              />
              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs py-2 rounded-full transition-colors cursor-pointer"
              >
                Suscribirme gratis
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-300/60 gap-4">
          <p>© 2026 PAWZO EXPLORER · Adaptación estética de Sklep con personaje 3D.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Compra 100% Protegida
            </span>
            <span>·</span>
            <span>Diseño libre de perros · Centrado en el Chico Explorador 3D</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
