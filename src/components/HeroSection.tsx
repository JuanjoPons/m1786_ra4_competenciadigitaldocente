import React, { useState, useRef } from 'react';
import { CourseData, AppState } from '../types';
import { T } from '../utils/courseHelpers';
import { ArrowRight, Star, Sparkles, MessageCircle, Eye, Box, FileText, CheckCircle2 } from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';

interface HeroSectionProps {
  course: CourseData;
  appState: AppState;
  onJumpToCurrentSession: () => void;
  onOpenReport: () => void;
}

export default function HeroSection({
  course,
  appState,
  onJumpToCurrentSession,
  onOpenReport
}: HeroSectionProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [showThreeView, setShowThreeView] = useState(false);
  const [activeSpeech, setActiveSpeech] = useState(
    '¡Hola! Soy Leo, tu guía en la evaluación con tecnologías digitales. ¡Acompáñame!'
  );
  const heroRef = useRef<HTMLDivElement>(null);

  const quotes = [
    '¡Hola! Soy Leo, tu guía en la evaluación con tecnologías digitales. ¡Acompáñame!',
    'Recuerda: la evaluación diagnóstica, formativa y sumativa tienen finalidades distintas.',
    'La IA identifica patrones, pero la decisión última y ética siempre es del docente.',
    '¡Protege siempre los datos del alumnado y usa canales seguros para la retroalimentación!',
    'CoRubrics y Padlet facilitan el seguimiento de competencias y proyectos colaborativos.'
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMascotClick = () => {
    const nextIdx = Math.floor(Math.random() * quotes.length);
    setActiveSpeech(quotes[nextIdx]);
  };

  const tiltX = -mousePos.y * 22;
  const tiltY = mousePos.x * 24;

  const currentBlock = course.blocks.find((b) => b.id === appState.cur) || course.blocks[0];

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-gradient-to-b from-[#E79A27] via-[#F2AF37] to-[#FCD467] text-[#331C08] pt-8 pb-14 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500/30 shadow-inner"
    >
      {/* Ambient background glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[36rem] h-[36rem] bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        {/* Left Column: Course Intro in Sklep Typography */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#2D1B0F]/15 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-bold text-[#3B220B] tracking-wide uppercase border border-amber-900/10 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-900 animate-ping" />
            <span>MPCDPD (1786) · RESULTADO DE APRENDIZAJE 4</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#291708] tracking-tight leading-[1.12] text-balance">
            Evaluación del Proceso de Enseñanza-Aprendizaje mediante Tecnologías Digitales
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#442812]/95 font-medium max-w-xl leading-relaxed">
            Plataforma didáctica interactiva oficial para la capacitación docente en evaluación diagnóstica,
            formativa y sumativa, tratamiento de datos con Inteligencia Artificial, seguridad y CoRubrics.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onJumpToCurrentSession}
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#2B1809] hover:bg-[#3D230E] text-[#FFF7ED] font-bold text-xs sm:text-sm rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Ir a la sesión actual: {currentBlock.id}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>

            <button
              onClick={onOpenReport}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white/70 hover:bg-white text-[#2B1809] font-bold text-xs sm:text-sm rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer border border-amber-900/15"
            >
              <FileText className="w-4 h-4 text-amber-700" />
              <span>Generar Informe Individual</span>
            </button>
          </div>

          {/* Stats strip in Sklep layout */}
          <div className="pt-4 grid grid-cols-3 gap-6 sm:gap-10 border-t border-amber-900/15 w-full max-w-lg">
            <div>
              <div className="font-display text-2xl sm:text-3xl font-black text-[#2B1809] tabular-nums">
                4
              </div>
              <div className="text-xs text-[#4E2E15] font-semibold">
                Sesiones (S14 a S17)
              </div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-black text-[#2B1809] tabular-nums">
                13
              </div>
              <div className="text-xs text-[#4E2E15] font-semibold">
                Actividades & Prácticas
              </div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-black text-[#2B1809] flex items-center gap-1 tabular-nums">
                100% <CheckCircle2 className="w-5 h-5 text-amber-900" />
              </div>
              <div className="text-xs text-[#4E2E15] font-semibold">
                Autocorregible & Rúbricas
              </div>
            </div>
          </div>

          {/* Mascot Tracking note */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#4A2B14] bg-white/40 px-3.5 py-1.5 rounded-full border border-amber-900/10">
            <span className="animate-bounce">🖱️</span>
            <span>Mueve el ratón — ¡Leo el joven explorador digital te acompaña en la sesión!</span>
          </div>
        </div>

        {/* Right Column: 3D Boy Mascot Card with Depth Tilt & Three.js Switcher */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative perspective-1000">
          {/* Switcher */}
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
              <span>Guía 3D (Leo)</span>
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
            <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl p-4 shadow-2xl border-2 border-amber-300">
              <ThreeCanvas />
            </div>
          ) : (
            /* 3D Boy Mascot Card */
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleMascotClick}
              style={{
                transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
                boxShadow: `0 20px 40px rgba(68, 40, 18, 0.25)`,
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out'
              }}
              className="relative w-full max-w-sm sm:max-w-md aspect-3/4 rounded-3xl bg-gradient-to-b from-white/80 via-amber-50/85 to-amber-100/90 border-2 border-white/80 p-5 flex flex-col items-center justify-end preserve-3d cursor-pointer select-none group"
            >
              {/* Speech bubble */}
              <div
                style={{ transform: `translateZ(45px)` }}
                className="absolute top-4 left-5 right-5 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-amber-200/80 flex items-start gap-2.5 z-20 group-hover:scale-102 transition-transform"
              >
                <MessageCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-bold text-amber-950 leading-snug">
                    {activeSpeech}
                  </p>
                  <p className="text-[10px] text-amber-700/80 font-medium mt-0.5">
                    Pulsa para nuevo consejo · Leo el explorador
                  </p>
                </div>
              </div>

              {/* 3D Boy Image */}
              <div
                style={{ transform: `translateZ(25px)` }}
                className="relative w-full h-[80%] flex items-end justify-center"
              >
                <div className="absolute inset-0 bg-radial from-amber-300/40 via-transparent to-transparent rounded-full blur-xl transform scale-90" />
                <img
                  src="/public/assets/aistudio/635289091232512192_236bd8b1.jpeg"
                  alt="Leo el Chico Explorador 3D con lupa y gorro verde"
                  className="max-h-full w-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.22)] filter contrast-105 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Bottom Card Pill Tag */}
              <div
                style={{ transform: 'translateZ(35px)' }}
                className="mt-2 w-full bg-[#2A1608] text-white py-2 px-4 rounded-xl flex items-center justify-between text-xs font-bold shadow-md"
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Leo · Tutor Digital</span>
                </div>
                <span className="text-[11px] font-semibold text-amber-300">
                  CDPD RA4 · Sesión {appState.cur}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
