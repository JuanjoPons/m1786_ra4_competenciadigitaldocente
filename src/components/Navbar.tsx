import React from 'react';
import { ShoppingBag, Search, Sparkles, BookOpen, Compass, Image as ImageIcon } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenEduModal: () => void;
  onOpenRefModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: any) => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenEduModal,
  onOpenRefModal,
  searchQuery,
  onSearchChange,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#422817]/95 backdrop-blur-md text-[#FFF8ED] border-b border-[#5C3B24] transition-colors">
      {/* Top Banner Notice */}
      <div className="bg-[#2D1B0F] px-4 py-1.5 text-center text-xs font-medium text-amber-200/90 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>¡Nuevo tema Sklep activo! Explora con nuestro compañero 3D y descubre el mundo natural</span>
        <button
          onClick={onOpenRefModal}
          className="ml-2 underline hover:text-white transition-colors cursor-pointer text-[11px] font-semibold text-amber-300"
        >
          Ver diseño de referencia (Sklep)
        </button>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 group"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-amber-950 shadow-md group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <span className="font-display tracking-tight text-white flex items-center gap-1">
            PAWZO <span className="text-amber-400 font-bold">EXPLORER</span>
          </span>
        </a>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar equipo, compañeros, mochilas..."
            className="w-full bg-[#352013] border border-[#5a3b26] rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-amber-200/50 focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
          />
          <Search className="w-4 h-4 text-amber-300/70 absolute left-3.5 top-2.5" />
        </div>

        {/* 4–5 Single-Line Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-amber-100/90">
          <a href="#catalog" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            Catálogo
          </a>
          <a href="#deals" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            Ofertas Semanales
          </a>
          <a href="#3d-studio" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1">
            <span>Visor 3D</span>
            <span className="text-[10px] bg-amber-400 text-amber-950 font-bold px-1.5 py-0.2 rounded-full">3D</span>
          </a>
          <button
            onClick={onOpenEduModal}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer text-amber-300"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Aula CDPD RA4</span>
          </button>
        </nav>

        {/* Primary Action Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenRefModal}
            title="Ver imagen original Sklep y chico 3D"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-amber-200 bg-[#352013] hover:bg-[#482c1b] border border-[#5a3b26] rounded-full transition-colors cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Referencias</span>
          </button>

          {/* Cart Button Pill */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 font-bold text-xs rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Carrito</span>
            <span className="ml-0.5 bg-amber-950 text-amber-200 px-1.5 py-0.5 rounded-full text-[11px] font-extrabold">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
