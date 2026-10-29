import React, { useRef } from 'react';
import { CourseData, AppState } from '../types';
import { T, getBlockProgress, activityFamily, isActivityDone, pct, fmtPct } from '../utils/courseHelpers';
import { X, Printer, Copy, Download, Upload, Trash2, CheckCircle2, FileText, AlertCircle } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: CourseData;
  appState: AppState;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onUpdateFinalObs: (obs: string) => void;
}

export default function ReportModal({
  isOpen,
  onClose,
  course,
  appState,
  onExport,
  onImport,
  onClear,
  onUpdateFinalObs
}: ReportModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Compute stats
  let totalActs = 0;
  let doneActs = 0;
  let autoDone = 0;
  let autoTotal = 0;
  let autoScore = 0;
  let autoMax = 0;
  let teacherNeed = 0;

  course.blocks.forEach((b) => {
    b.acts.forEach((a) => {
      totalActs++;
      const s = appState.a[a.id] || {};
      const fam = activityFamily(a);
      if (isActivityDone(a, appState)) doneActs++;

      if (fam === 'auto') {
        autoTotal++;
        if (s.attempts) {
          autoDone++;
          autoScore += s.best?.sc || 0;
          autoMax += s.best?.mx || 0;
        }
      } else {
        teacherNeed++;
      }
    });
  });

  const handlePrint = () => {
    window.print();
  };

  const generatePlainText = () => {
    const lines: string[] = [];
    lines.push('================================================================');
    lines.push('INFORME INDIVIDUAL DE EVALUACIÓN DIGITAL — CDPD RA4 (1786)');
    lines.push('================================================================');
    lines.push(`Alumno/a: ${appState.student.name || 'Sin identificar'} [ALUMNO]`);
    lines.push(`Grupo: ${appState.student.group || 'Sin grupo'} [ALUMNO]`);
    lines.push(`Fecha: ${appState.student.date || new Date().toISOString().slice(0, 10)}`);
    lines.push(`Resultado de aprendizaje: RA4 (MPCDPD 1786)`);
    lines.push(`Actividades completadas: ${doneActs} / ${totalActs}`);
    lines.push(`Puntuación autocorregible global: ${autoScore}/${autoMax} (${fmtPct(pct(autoScore, autoMax))}) [AUTO]`);
    lines.push('----------------------------------------------------------------');

    course.blocks.forEach((b) => {
      lines.push(`\n== ${b.id} · ${T(b.title)} ==`);
      b.acts.forEach((a) => {
        const s = appState.a[a.id] || {};
        const fam = activityFamily(a);
        lines.push(`- ${T(a.title)} [${fam.toUpperCase()}]`);
        if (fam === 'auto') {
          if (s.attempts) {
            lines.push(`  Puntuación: ${s.best?.sc}/${s.best?.mx} (${fmtPct(pct(s.best?.sc || 0, s.best?.mx || 1))}) · Intentos: ${s.attempts} [AUTO]`);
          } else {
            lines.push('  Estado: Pendiente de realización [AUTO]');
          }
        } else {
          lines.push(`  Estado: ${s.status === 'lliu' ? 'Entregada' : 'Pendiente'} [ALUMNO]`);
          if (s.text) {
            s.text.forEach((txt, idx) => {
              if (txt) lines.push(`  Campo #${idx + 1}: ${txt} [ALUMNO]`);
            });
          }
          if (s.tGrade) lines.push(`  Calificación Docente: ${s.tGrade} [DOCENTE]`);
          if (s.tComment) lines.push(`  Observaciones Docente: ${s.tComment} [DOCENTE]`);
        }
      });
    });

    lines.push('\n----------------------------------------------------------------');
    lines.push(`Observaciones finales: ${appState.finalObs || '—'}`);
    return lines.join('\n');
  };

  const handleCopy = () => {
    const text = generatePlainText();
    navigator.clipboard.writeText(text);
    alert('¡Informe copiado al portapapeles!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in print:p-0 print:bg-white">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-4xl w-full border-2 border-amber-300 shadow-2xl overflow-hidden my-6 print:border-0 print:shadow-none print:m-0">
        {/* Top Controls Bar (hidden during print) */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#E79A27] via-[#F2AF37] to-[#FCD467] text-amber-950 flex flex-wrap items-center justify-between gap-3 border-b border-amber-400 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-950/15 p-2 flex items-center justify-center">
              <FileText className="w-5 h-5 text-amber-950" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900">
                MPCDPD 1786 · DOCUMENTO OFICIAL
              </span>
              <h2 className="font-display font-extrabold text-lg sm:text-xl text-amber-950">
                Informe Individual de Evaluación RA4
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/90 hover:bg-white text-amber-950 font-bold text-xs rounded-full shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/90 hover:bg-white text-amber-950 font-bold text-xs rounded-full shadow-xs cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar Texto</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-amber-950 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Report Document Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto print:max-h-none print:overflow-visible">
          {/* Legend */}
          <div className="bg-amber-100/70 p-3 rounded-2xl border border-amber-200 text-xs text-amber-950 flex flex-wrap items-center gap-4 font-semibold">
            <span>Leyenda de origen:</span>
            <span className="text-blue-900 bg-blue-100 px-2 py-0.5 rounded-md">[AUTO] = Dato generado por la web</span>
            <span className="text-amber-950 bg-amber-200 px-2 py-0.5 rounded-md">[DOCENTE] = Modo docente</span>
            <span className="text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-md">[ALUMNO] = Respuesta del alumno</span>
          </div>

          {/* Student Info Card */}
          <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-amber-800/80 block font-medium">Nombre y Apellidos:</span>
              <strong className="text-sm text-amber-950 font-bold">{appState.student.name || 'Sin identificar'}</strong>
              <span className="text-[10px] text-emerald-800 ml-1">[ALUMNO]</span>
            </div>
            <div>
              <span className="text-amber-800/80 block font-medium">Grupo:</span>
              <strong className="text-sm text-amber-950 font-bold">{appState.student.group || 'Sin grupo'}</strong>
              <span className="text-[10px] text-emerald-800 ml-1">[ALUMNO]</span>
            </div>
            <div>
              <span className="text-amber-800/80 block font-medium">Fecha:</span>
              <strong className="text-sm text-amber-950 font-bold">{appState.student.date || new Date().toISOString().slice(0, 10)}</strong>
            </div>
            <div>
              <span className="text-amber-800/80 block font-medium">Módulo:</span>
              <strong className="text-sm text-amber-950 font-bold">MPCDPD (1786) · RA4</strong>
            </div>
          </div>

          {/* Progress Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              <span className="text-[11px] text-amber-800/90 font-bold uppercase block">
                Actividades Hechas [AUTO]
              </span>
              <div className="font-display font-black text-2xl text-amber-950 mt-1">
                {doneActs} / {totalActs}
              </div>
              <p className="text-[11px] text-amber-800/80 mt-1">
                {Math.round((doneActs / totalActs) * 100)}% del total del módulo
              </p>
            </div>

            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              <span className="text-[11px] text-amber-800/90 font-bold uppercase block">
                Puntuación Autocorregible [AUTO]
              </span>
              <div className="font-display font-black text-2xl text-amber-950 mt-1">
                {autoScore} / {autoMax}
              </div>
              <p className="text-[11px] text-amber-800/80 mt-1">
                Acierto: {fmtPct(pct(autoScore, autoMax))}
              </p>
            </div>

            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              <span className="text-[11px] text-amber-800/90 font-bold uppercase block">
                Actividades con Revisión
              </span>
              <div className="font-display font-black text-2xl text-amber-950 mt-1">
                {teacherNeed} actividades
              </div>
              <p className="text-[11px] text-amber-800/80 mt-1">
                Requieren valoración del docente
              </p>
            </div>
          </div>

          {/* Detailed results per session */}
          <div className="space-y-6">
            <h3 className="font-display font-extrabold text-lg text-amber-950 border-b border-amber-200 pb-2">
              Resultados Desglosados por Sesión
            </h3>

            {course.blocks.map((block) => (
              <div key={block.id} className="bg-white p-5 rounded-2xl border border-amber-200 space-y-3">
                <div className="flex items-center justify-between border-b border-amber-100 pb-2">
                  <h4 className="font-display font-extrabold text-sm sm:text-base text-amber-950">
                    {block.id} · {T(block.title)}
                  </h4>
                  <span className="text-xs font-bold text-amber-800">
                    {block.acts.length} actividades
                  </span>
                </div>

                <div className="space-y-3">
                  {block.acts.map((act) => {
                    const s = appState.a[act.id] || {};
                    const fam = activityFamily(act);

                    return (
                      <div key={act.id} className="p-3 bg-amber-50/40 rounded-xl border border-amber-100 text-xs">
                        <div className="flex items-center justify-between font-bold text-amber-950 mb-1">
                          <span>{T(act.title)}</span>
                          <span className="text-[10px] uppercase bg-amber-200/80 px-2 py-0.5 rounded-md">
                            {fam}
                          </span>
                        </div>

                        {fam === 'auto' ? (
                          <div className="text-amber-900/80">
                            {s.attempts ? (
                              <span>
                                Resultado: {s.best?.sc}/{s.best?.mx} ({fmtPct(pct(s.best?.sc || 0, s.best?.mx || 1))}) en {s.attempts} intentos [AUTO]
                              </span>
                            ) : (
                              <span className="text-amber-700/60 italic">Pendiente de completar</span>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-1 mt-1">
                            <div>
                              <span className="font-semibold text-amber-900">Estado de entrega: </span>
                              <span className={s.status === 'lliu' ? 'text-emerald-700 font-bold' : 'text-amber-700'}>
                                {s.status === 'lliu' ? 'Entregada por el alumno' : 'Pendiente'} [ALUMNO]
                              </span>
                            </div>
                            {s.text && s.text.some(Boolean) && (
                              <div className="p-2 bg-white rounded-lg border border-amber-100 mt-1 space-y-1">
                                <span className="font-bold text-amber-950 block">Respuestas del alumno [ALUMNO]:</span>
                                {s.text.map((txt, tIdx) => (
                                  txt ? <p key={tIdx} className="text-amber-900/90 whitespace-pre-wrap">{txt}</p> : null
                                ))}
                              </div>
                            )}
                            {s.tGrade && (
                              <p className="text-amber-950 font-bold">
                                Calificación del docente: {s.tGrade} [DOCENTE]
                              </p>
                            )}
                            {s.tComment && (
                              <p className="text-amber-900 italic">
                                Retroalimentación del docente: {s.tComment} [DOCENTE]
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Final Observations */}
          <div className="bg-white p-5 rounded-2xl border border-amber-200">
            <label className="font-display font-bold text-sm text-amber-950 block mb-2">
              Observaciones y Síntesis Final (Alumno o Docente)
            </label>
            <textarea
              rows={3}
              value={appState.finalObs}
              onChange={(e) => onUpdateFinalObs(e.target.value)}
              placeholder="Escribe observaciones finales, conclusiones o recomendaciones..."
              className="w-full bg-amber-50/40 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 focus:outline-hidden focus:border-amber-500"
            />
          </div>

          {/* Data Export / Import footer bar */}
          <div className="bg-[#3B2211] text-amber-200 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs print:hidden">
            <div>
              <span className="font-bold text-white block">Gestión de Copias de Seguridad</span>
              <span className="text-[11px] text-amber-300/80">Exporta tu trabajo en un archivo JSON o importa un archivo previo.</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onExport}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold rounded-full transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar JSON</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white font-bold rounded-full transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Importar</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={onImport}
                className="hidden"
              />
              <button
                onClick={onClear}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white font-bold rounded-full transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Borrar Todo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
