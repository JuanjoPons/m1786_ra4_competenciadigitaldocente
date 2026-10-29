import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Search, Star, Sparkles, MessageCircle, Eye, Box } from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';

interface HeroMascotProps {
  onExploreClick: () => void;
  onOpenTestModal: () => void;
}

export default function HeroMascot({ onExploreClick, onOpenTestModal }: HeroMascotProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeSpeech, setActiveSpeech] = useState('¡Hola! Soy Leo. ¡Acompáñame a explorar!');
  const [showThreeView, setShowThreeView] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Quotes when mouse moves over the mascot
  const speechQuotes = [
    '¡Hola! Soy Leo. ¡Acompáñame a explorar!',
    '¡Mira hacia allí con mi lupa!',
    '¡Encontré un rastro de huellas curiosas!',
    '¡Todo el equipo listo para la expedición!',
    '¡Aprender y explorar es lo más divertido!'
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setMousePos({ x, y });
  };

  const handleMascotClick = () => {
    const nextIdx = Math.floor(Math.random() * speechQuotes.length);
    setActiveSpeech(speechQuotes[nextIdx]);
  };

  // Periodic greeting change
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        const nextIdx = Math.floor(Math.random() * speechQuotes.length);
        setActiveSpeech(speechQuotes[nextIdx]);
      }
    }, 9000);
    return () => clearInterval(timer);
  }, [isHovered]);

  // Compute 3D tilt styles
  const tiltX = -mousePos.y * 22; // deg
  const tiltY = mousePos.x * 24;  // deg
  const shadowX = -mousePos.x * 25;
  const shadowY = -mousePos.y * 25;

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-gradient-to-b from-[#E79A27] via-[#F2AF37] to-[#FCD467] text-[#331C08] pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500/30"
    >
      {/* Decorative ambient background rings */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[36rem] h-[36rem] bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        {/* Left Column: Hero Copy & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#2D1B0F]/15 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-bold text-[#3B220B] tracking-wide uppercase border border-amber-900/10 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-900 animate-ping" />
            <span>+ ENVÍOS EN 24 HORAS · ¡NUEVAS AVENTURAS!</span>
          </div>

          {/* Big Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#291708] tracking-tight leading-[1.08] text-balance">
            Felicidad en cada aventura{' '}
            <span className="relative inline-block">
              <span className="relative z-10 underline decoration-amber-900/40 decoration-wavy decoration-3">
                — ¡el explorador a tu puerta!
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#442812]/95 font-medium max-w-xl leading-relaxed">
            Equipamiento de exploración, mochilas, lupas y cuidados para tus pequeños compañeros del hogar:
            gatos, aves, roedores y reptiles. Todo lo necesario para alimentar la curiosidad, el juego y la alegría.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#2B1809] hover:bg-[#3D230E] text-[#FFF7ED] font-bold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explorar tienda</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>

            <button
              onClick={onOpenTestModal}
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/70 hover:bg-white text-[#2B1809] font-bold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer border border-amber-900/15"
            >
              <Search className="w-4 h-4 text-amber-700" />
              <span>Buscar equipo ideal</span>
            </button>
          </div>

          {/* Statistics Bar (Exactly like Sklep) */}
          <div className="pt-6 grid grid-cols-3 gap-6 sm:gap-10 border-t border-amber-900/15 w-full max-w-lg">
            <div>
              <div className="font-display text-2xl sm:text-3xl font-black text-[#2B1809] tabular-nums">
                12 000+
              </div>
              <div className="text-xs sm:text-sm text-[#4E2E15] font-semibold">
                productos en stock
              </div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-black text-[#2B1809] tabular-nums">
                96 000
              </div>
              <div className="text-xs sm:text-sm text-[#4E2E15] font-semibold">
                exploradores felices
              </div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-black text-[#2B1809] flex items-center gap-1 tabular-nums">
                4.9 <Star className="w-5 h-5 fill-amber-900 text-amber-900" />
              </div>
              <div className="text-xs sm:text-sm text-[#4E2E15] font-semibold">
                valoración media
              </div>
            </div>
          </div>

          {/* Mouse tracking note (Adapted from Sklep "Move your mouse — Biscuit comes alive") */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#4A2B14] bg-white/40 px-3.5 py-2 rounded-full border border-amber-900/10">
            <span className="animate-bounce">🖱️</span>
            <span>Mueve el ratón sobre la pantalla — ¡Leo el explorador te sigue con la mirada!</span>
          </div>
        </div>

        {/* Right Column: 3D Mascot Character with Interactive Tilt & Mode Switcher */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative perspective-1000">
          {/* View Mode Switcher */}
          <div className="mb-3 flex items-center gap-1 bg-[#2D1B0F]/20 backdrop-blur-md p-1 rounded-full border border-amber-900/15 z-20">
            <button
              onClick={() => setShowThreeView(false)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                !showThreeView
                  ? 'bg-white text-amber-950 shadow-sm'
                  : 'text-amber-950/80 hover:text-amber-950'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Mascota 3D (Leo)</span>
            </button>
            <button
              onClick={() => setShowThreeView(true)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                showThreeView
                  ? 'bg-amber-400 text-amber-950 shadow-sm'
                  : 'text-amber-950/80 hover:text-amber-950'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Visor 3D Three.js</span>
            </button>
          </div>

          {showThreeView ? (
            <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl p-4 shadow-2xl border-2 border-amber-300">
              <ThreeCanvas />
            </div>
          ) : (
            /* Main 3D Boy Mascot Card with Depth Parallax */
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleMascotClick}
              style={{
                transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
                boxShadow: `${shadowX}px ${shadowY + 25}px 45px rgba(68, 40, 18, 0.28)`,
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out, box-shadow 0.4s ease-out'
              }}
              className="relative w-full max-w-sm sm:max-w-md aspect-3/4 rounded-3xl bg-gradient-to-b from-white/70 via-amber-50/80 to-amber-100/90 border-2 border-white/80 p-5 flex flex-col items-center justify-end preserve-3d cursor-pointer select-none group"
            >
              {/* Speech Bubble attached to mascot */}
              <div
                style={{
                  transform: `translateZ(50px) translateX(${mousePos.x * 15}px)`,
                  transition: 'transform 0.15s ease-out'
                }}
                className="absolute top-4 left-6 right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-amber-200/80 flex items-start gap-2.5 z-20 group-hover:scale-105 transition-transform"
              >
                <MessageCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-bold text-amber-950 leading-snug">
                    {activeSpeech}
                  </p>
                  <p className="text-[10px] text-amber-700/80 font-medium mt-0.5">
                    Tócame para hablar · Leo el explorador
                  </p>
                </div>
              </div>

              {/* Character 3D Graphic */}
              <div
                style={{
                  transform: `translateZ(30px) scale(${1 + Math.abs(mousePos.x) * 0.05})`,
                  transition: 'transform 0.15s ease-out'
                }}
                className="relative w-full h-[82%] flex items-end justify-center"
              >
                {/* Background soft aura */}
                <div className="absolute inset-0 bg-radial from-amber-300/40 via-transparent to-transparent rounded-full blur-xl transform scale-90" />

                {/* The 3D Boy Image supplied by the user */}
                <img
                  src="/public/assets/aistudio/635289091232512192_236bd8b1.jpeg"
                  alt="Leo el Chico Explorador 3D con lupa y gorro verde"
                  className="max-h-full w-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.25)] filter contrast-105 transition-transform duration-200 pointer-events-none"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle Interactive Magnifying Glass Spotlight */}
                <div
                  style={{
                    transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 30}px) translateZ(60px)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                  className="absolute top-1/4 left-1/4 pointer-events-none w-20 h-20 rounded-full border border-white/60 bg-white/10 backdrop-blur-[1px] shadow-inner opacity-75"
                />
              </div>

              {/* Bottom Card Pill Tag */}
              <div
                style={{ transform: 'translateZ(40px)' }}
                className="mt-2 w-full bg-[#2A1608] text-white py-2 px-4 rounded-xl flex items-center justify-between text-xs font-bold shadow-md"
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Leo · Guía de Expedición</span>
                </div>
                <span className="text-[11px] font-semibold text-amber-300">
                  En busca de aventuras
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
