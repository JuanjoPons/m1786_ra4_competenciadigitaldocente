import React from 'react';
import { SectionNode } from '../types';
import { T } from '../utils/courseHelpers';
import {
  CheckCircle2,
  AlertTriangle,
  Folder,
  Settings,
  Cloud,
  BarChart2,
  Lightbulb,
  Lock,
  LogOut,
  RefreshCw,
  Search,
  Target,
  Brain,
  Shield,
  Laptop,
  MessageSquare,
  History,
  FileCheck,
  ExternalLink,
  Users
} from 'lucide-react';

interface InfographicsProps {
  node: SectionNode;
}

export default function Infographics({ node }: InfographicsProps) {
  if (node.t === 'p') {
    return (
      <p className="text-xs sm:text-sm text-[#442812]/90 leading-relaxed my-2.5">
        {T(node.x)}
      </p>
    );
  }

  if (node.t === 'h3') {
    return (
      <h3 className="font-display font-extrabold text-base sm:text-lg text-amber-950 mt-5 mb-2">
        {T(node.x)}
      </h3>
    );
  }

  if (node.t === 'sub') {
    return (
      <h4 className="font-display font-bold text-sm sm:text-base text-amber-900 mt-4 mb-1.5 flex items-center gap-2">
        <span className="w-1.5 h-4 bg-amber-500 rounded-full" />
        <span>{T(node.x)}</span>
      </h4>
    );
  }

  if (node.t === 'list') {
    const isOrdered = node.k === 'ol';
    return (
      <div className="my-3 pl-2">
        {isOrdered ? (
          <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-amber-950/90 font-medium">
            {(node.items || []).map((it, idx) => (
              <li key={idx} className="pl-1">
                {T(it)}
              </li>
            ))}
          </ol>
        ) : (
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-amber-950/90 font-medium">
            {(node.items || []).map((it, idx) => (
              <li key={idx} className="pl-1">
                {T(it)}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  if (node.t === 'links') {
    return (
      <div className="my-5 space-y-2">
        {node.title && (
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-amber-800">
            {T(node.title)}
          </h4>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(node.items || []).map((item, idx) => (
            <a
              key={idx}
              href={T(item.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-amber-800 mb-1">
                  <span className="font-display font-bold text-xs text-amber-950 group-hover:text-amber-700">
                    {T(item.x)}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </div>
                {item.d && (
                  <p className="text-[11px] text-amber-900/70 line-clamp-2">
                    {T(item.d)}
                  </p>
                )}
              </div>
              <span className="text-[10px] text-amber-600 font-semibold mt-2 block">
                Ver recurso oficial ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (node.t === 'viz' && node.v) {
    const v = node.v;

    // 1. COMPARE VIZ
    if (v.type === 'compare') {
      const cols = v.cols || [];
      return (
        <div className="my-6 bg-gradient-to-b from-amber-50/60 to-white rounded-3xl p-5 sm:p-6 border border-amber-200/80 shadow-xs">
          {v.title && (
            <h4 className="font-display font-extrabold text-sm sm:text-base text-amber-950 mb-4 pb-2 border-b border-amber-200">
              {T(v.title)}
            </h4>
          )}
          <div className={`grid grid-cols-1 md:grid-cols-${cols.length} gap-4`}>
            {cols.map((col: any, idx: number) => {
              const isSafe = col.s === 'safe';
              const isWarn = col.s === 'warn';
              const isInfo = col.s === 'info';

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex flex-col justify-between ${
                    isSafe
                      ? 'bg-emerald-50/70 border-emerald-200'
                      : isWarn
                      ? 'bg-amber-100/60 border-amber-300'
                      : 'bg-white border-amber-200 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      {isSafe ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : isWarn ? (
                        <AlertTriangle className="w-4 h-4 text-amber-700" />
                      ) : (
                        <Target className="w-4 h-4 text-amber-600" />
                      )}
                      <span className="font-display font-black text-xs sm:text-sm text-amber-950">
                        {T(col.x)}
                      </span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-amber-950/85">
                      {(col.items || []).map((it: any, iIdx: number) => (
                        <li key={iIdx} className="flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{T(it)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
          {v.note && (
            <p className="text-[10px] text-amber-700/80 mt-3 text-right italic">
              {T(v.note)}
            </p>
          )}
        </div>
      );
    }

    // 2. CARDS VIZ
    if (v.type === 'cards') {
      const items = v.items || [];
      return (
        <div className="my-6 bg-white rounded-3xl p-5 sm:p-6 border border-amber-200/80 shadow-xs">
          {v.title && (
            <h4 className="font-display font-extrabold text-sm sm:text-base text-amber-950 mb-4 pb-2 border-b border-amber-200">
              {T(v.title)}
            </h4>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {items.map((it: any, idx: number) => (
              <div
                key={idx}
                className="bg-amber-50/50 hover:bg-amber-50 p-4 rounded-2xl border border-amber-200/60 transition-all flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-amber-950">
                    {T(it.x)}
                  </h5>
                  {it.d && (
                    <p className="text-[11px] text-amber-900/75 mt-0.5 leading-relaxed">
                      {T(it.d)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 3. CHAIN VIZ
    if (v.type === 'chain') {
      const items = v.items || [];
      return (
        <div className="my-6 bg-gradient-to-r from-amber-50 via-white to-amber-50 rounded-3xl p-5 sm:p-6 border border-amber-200 shadow-xs">
          {v.title && (
            <h4 className="font-display font-extrabold text-sm sm:text-base text-amber-950 mb-4 text-center">
              {T(v.title)}
            </h4>
          )}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {items.map((it: any, idx: number) => (
              <React.Fragment key={idx}>
                <div className="bg-amber-100 text-amber-950 px-4 py-2 rounded-2xl border border-amber-300 font-display font-bold text-xs sm:text-sm shadow-xs flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-black">
                    {idx + 1}
                  </span>
                  <span>{T(it.x)}</span>
                </div>
                {idx < items.length - 1 && (
                  <span className="text-amber-600 font-black text-sm">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      );
    }

    // 4. KEY VIZ
    if (v.type === 'key') {
      return (
        <div className="my-6 bg-gradient-to-r from-amber-100/80 to-amber-50 p-5 rounded-3xl border-2 border-amber-300 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            {v.big && (
              <span className="text-[10px] font-black tracking-wider uppercase bg-amber-400/80 text-amber-950 px-2.5 py-0.5 rounded-full">
                {T(v.big)}
              </span>
            )}
            <blockquote className="font-display font-bold text-sm sm:text-base text-amber-950 mt-1">
              "{T(v.x)}"
            </blockquote>
            {v.src && (
              <p className="text-[11px] text-amber-800/80 mt-1 font-medium italic">
                — {T(v.src)}
              </p>
            )}
          </div>
        </div>
      );
    }

    // 5. SCENE VIZ
    if (v.type === 'scene') {
      return (
        <div className="my-6 bg-amber-50/60 p-4 rounded-3xl border border-amber-200 text-center">
          <div className="w-12 h-12 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center mx-auto mb-2">
            <Users className="w-6 h-6" />
          </div>
          <p className="font-display font-bold text-xs sm:text-sm text-amber-950">
            {T(v.title || 'Coordinación del Equipo Docente')}
          </p>
          {v.note && (
            <p className="text-[11px] text-amber-800/70 mt-0.5 italic">{T(v.note)}</p>
          )}
        </div>
      );
    }
  }

  return null;
}
