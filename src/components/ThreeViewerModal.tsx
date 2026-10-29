import React from 'react';
import { X, Sparkles, Box, ShieldCheck } from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';

interface ThreeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThreeViewerModal({ isOpen, onClose }: ThreeViewerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-2xl w-full border-2 border-amber-300 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#E79A27] via-[#F2AF37] to-[#FCD467] text-amber-950 flex items-center justify-between border-b border-amber-400">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-950/15 flex items-center justify-center">
              <Box className="w-5 h-5 text-amber-950" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">
                WebGL 3D Interactive Studio
              </span>
              <h3 className="font-display font-extrabold text-lg text-amber-950">
                Emblema & Brújula 3D del Explorador
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

        {/* 3D Canvas Box */}
        <div className="p-6 space-y-4">
          <ThreeCanvas className="w-full h-80" />

          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Gráficos 3D en tiempo real con Three.js</span>
            </p>
            <p className="leading-relaxed text-amber-900/80">
              Este modelo 3D responde interactivamente al arrastre del ratón o dedo para una rotación en 360 grados,
              con materiales reflectantes PBR, partículas orbitales y conmutador de iluminación de estudio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
