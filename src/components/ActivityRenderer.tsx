import React, { useState } from 'react';
import { ActivityData, AppState, UserActivityState } from '../types';
import {
  T,
  activityFamily,
  getItemsOf,
  pct,
  fmtPct,
  seeded
} from '../utils/courseHelpers';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Check,
  Send,
  Eye,
  GraduationCap,
  Sparkles,
  Lock,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface ActivityRendererProps {
  activity: ActivityData;
  appState: AppState;
  onUpdateActivity: (actId: string, updated: UserActivityState) => void;
}

export default function ActivityRenderer({
  activity,
  appState,
  onUpdateActivity
}: ActivityRendererProps) {
  const state: UserActivityState = appState.a[activity.id] || {};
  const fam = activityFamily(activity);
  const isTeacherMode = appState.teacher;

  // AUTO ACTIVITIES
  if (fam === 'auto') {
    // 1. ORDER ACTIVITY
    if (activity.type === 'order') {
      const items = activity.items || [];
      const currentOrder: number[] =
        state.resp && state.resp.length === items.length
          ? state.resp
          : seeded(activity.id, items.length);

      const isChecked = !!state.checked;

      const handleMove = (index: number, direction: -1 | 1) => {
        const nextOrder = [...currentOrder];
        const target = index + direction;
        if (target < 0 || target >= nextOrder.length) return;
        const temp = nextOrder[index];
        nextOrder[index] = nextOrder[target];
        nextOrder[target] = temp;
        onUpdateActivity(activity.id, { ...state, resp: nextOrder });
      };

      const handleCheck = () => {
        let correctCount = 0;
        currentOrder.forEach((val, pos) => {
          if (val === pos) correctCount++;
        });
        const attempts = (state.attempts || 0) + 1;
        const best =
          !state.best || correctCount > state.best.sc
            ? { sc: correctCount, mx: items.length }
            : state.best;

        onUpdateActivity(activity.id, {
          ...state,
          checked: true,
          attempts,
          resp: currentOrder,
          best,
          last: {
            sc: correctCount,
            mx: items.length,
            at: new Date().toISOString(),
            resp: [...currentOrder]
          }
        });
      };

      const handleRetry = () => {
        onUpdateActivity(activity.id, {
          ...state,
          checked: false,
          resp: seeded(activity.id + (state.attempts || 1), items.length)
        });
      };

      return (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-amber-300 shadow-sm my-6">
          <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-amber-100">
            <div>
              <span className="text-[10px] font-bold text-amber-800 uppercase bg-amber-100 px-2.5 py-0.5 rounded-full">
                AUTOCORREGIBLE · {activity.time ? T(activity.time) : 'Ordenación'}
              </span>
              <h4 className="font-display font-extrabold text-base sm:text-lg text-amber-950 mt-1">
                {T(activity.title)}
              </h4>
            </div>
            {state.best && (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Mejor: {state.best.sc}/{state.best.mx} ({fmtPct(pct(state.best.sc, state.best.mx))})
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-amber-900/80 mb-4 font-medium">
            {activity.instr ? T(activity.instr) : 'Ordena los pasos utilizando los botones de subir y bajar.'}
          </p>

          <div className="space-y-2">
            {currentOrder.map((itIdx, pos) => {
              const isCorrect = itIdx === pos;
              return (
                <div
                  key={pos}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all ${
                    isChecked
                      ? isCorrect
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                        : 'bg-red-50 border-red-300 text-red-950'
                      : 'bg-amber-50/50 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-950 flex items-center justify-center font-bold text-xs shrink-0">
                      {pos + 1}
                    </span>
                    <span>{T(items[itIdx])}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {isChecked ? (
                      isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )
                    ) : (
                      <>
                        <button
                          disabled={pos === 0}
                          onClick={() => handleMove(pos, -1)}
                          className="p-1.5 rounded-lg bg-white border border-amber-300 hover:bg-amber-100 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5 text-amber-950" />
                        </button>
                        <button
                          disabled={pos === currentOrder.length - 1}
                          onClick={() => handleMove(pos, 1)}
                          className="p-1.5 rounded-lg bg-white border border-amber-300 hover:bg-amber-100 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5 text-amber-950" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {isChecked && activity.exp && (
            <p className="text-xs text-amber-900 bg-amber-50 p-3 rounded-xl border border-amber-200 mt-3">
              {T(activity.exp)}
            </p>
          )}

          <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between">
            <span className="text-[11px] text-amber-800/70">
              1 punto por cada posición correcta en su lugar.
            </span>
            {isChecked ? (
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs rounded-full transition-colors cursor-pointer"
              >
                Volver a intentarlo
              </button>
            ) : (
              <button
                onClick={handleCheck}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold text-xs rounded-full shadow-md transition-all cursor-pointer"
              >
                Corregir orden
              </button>
            )}
          </div>
        </div>
      );
    }

    // 2. STANDARD AUTO (classify, match, tf, fill)
    const items = getItemsOf(activity);
    const userSelections: (number | null)[] =
      state.resp && state.resp.length === items.length
        ? state.resp
        : items.map(() => null);

    const isChecked = !!state.checked;

    const handleSelectOption = (idx: number, optIdx: number | null) => {
      const next = [...userSelections];
      next[idx] = optIdx;
      onUpdateActivity(activity.id, { ...state, resp: next });
    };

    const handleCheck = () => {
      let sc = 0;
      items.forEach((it, i) => {
        if (userSelections[i] === it.ans) sc++;
      });
      const attempts = (state.attempts || 0) + 1;
      const best =
        !state.best || sc > state.best.sc ? { sc, mx: items.length } : state.best;

      onUpdateActivity(activity.id, {
        ...state,
        checked: true,
        attempts,
        resp: userSelections,
        best,
        last: {
          sc,
          mx: items.length,
          at: new Date().toISOString(),
          resp: [...userSelections]
        }
      });
    };

    const handleRetry = () => {
      onUpdateActivity(activity.id, {
        ...state,
        checked: false,
        resp: items.map(() => null)
      });
    };

    const allAnswered = userSelections.every((v) => v !== null);

    return (
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-amber-300 shadow-sm my-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-amber-100">
          <div>
            <span className="text-[10px] font-bold text-amber-800 uppercase bg-amber-100 px-2.5 py-0.5 rounded-full">
              AUTOCORREGIBLE · {activity.time ? T(activity.time) : 'Test'}
            </span>
            <h4 className="font-display font-extrabold text-base sm:text-lg text-amber-950 mt-1">
              {T(activity.title)}
            </h4>
          </div>
          {state.best && (
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Mejor: {state.best.sc}/{state.best.mx} ({fmtPct(pct(state.best.sc, state.best.mx))})
            </span>
          )}
        </div>

        {activity.instr && (
          <p className="text-xs sm:text-sm text-amber-900/80 mb-4 font-medium">
            {T(activity.instr)}
          </p>
        )}

        {/* Questions list */}
        <div className="space-y-3.5">
          {items.map((it, qIdx) => {
            const selectedOpt = userSelections[qIdx];
            const isCorrect = selectedOpt === it.ans;

            return (
              <div
                key={qIdx}
                className={`p-4 rounded-2xl border transition-all ${
                  isChecked
                    ? isCorrect
                      ? 'bg-emerald-50/70 border-emerald-300'
                      : 'bg-red-50/70 border-red-200'
                    : 'bg-amber-50/40 border-amber-200/80'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-start gap-2 flex-1">
                    <span className="font-display font-bold text-xs text-amber-800 shrink-0 mt-0.5">
                      {qIdx + 1}.
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-amber-950 leading-relaxed">
                      {T(it.label)}
                    </span>
                  </div>

                  {/* Dropdown or radio selector */}
                  <div className="sm:w-64 shrink-0">
                    <select
                      disabled={isChecked}
                      value={selectedOpt !== null ? selectedOpt : ''}
                      onChange={(e) =>
                        handleSelectOption(qIdx, e.target.value === '' ? null : Number(e.target.value))
                      }
                      className={`w-full p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        isChecked
                          ? isCorrect
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                            : 'bg-red-100 border-red-300 text-red-950'
                          : 'bg-white border-amber-300 text-amber-950 focus:border-amber-500'
                      }`}
                    >
                      <option value="">— Seleccionar opción —</option>
                      {(it.opts || []).map((opt: any, oIdx: number) => (
                        <option key={oIdx} value={oIdx}>
                          {T(opt)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Feedback line after check */}
                {isChecked && (
                  <div
                    className={`mt-2.5 text-xs p-2.5 rounded-xl flex items-start gap-2 ${
                      isCorrect ? 'bg-emerald-100/70 text-emerald-900' : 'bg-red-100/70 text-red-900'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      {!isCorrect && (
                        <span className="font-bold mr-1">
                          Solución correcta: {T(it.opts[it.ans as number])}.
                        </span>
                      )}
                      {it.exp && <span>{T(it.exp)}</span>}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="mt-5 pt-3 border-t border-amber-100 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] text-amber-800/80">
            {isChecked
              ? `Puntuación obtenida: ${state.last?.sc}/${state.last?.mx} (${fmtPct(pct(state.last?.sc || 0, state.last?.mx || 1))})`
              : 'Responde a todas las preguntas antes de comprobar.'}
          </span>

          <div className="flex items-center gap-2">
            {isChecked ? (
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs rounded-full transition-colors cursor-pointer"
              >
                Volver a intentarlo
              </button>
            ) : (
              <button
                onClick={handleCheck}
                disabled={!allAnswered}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-amber-950 font-black text-xs rounded-full shadow-md transition-all cursor-pointer"
              >
                Comprobar respuestas
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // TEACHER ACTIVITIES (Manual design, cases, rubric, editable grid)
  const isDelivered = state.status === 'lliu';
  const showSolution = isDelivered || state.tReviewed || isTeacherMode;

  const handleToggleDelivery = () => {
    const nextStatus = isDelivered ? 'pend' : 'lliu';
    onUpdateActivity(activity.id, {
      ...state,
      status: nextStatus
    });
  };

  const handleFieldChange = (idx: number, val: string) => {
    const nextText = [...(state.text || [])];
    nextText[idx] = val;
    onUpdateActivity(activity.id, { ...state, text: nextText });
  };

  const handleGridChange = (r: number, c: number, val: string) => {
    const nextGrid = (state.grid || []).map((row) => [...row]);
    if (!nextGrid[r]) nextGrid[r] = [];
    nextGrid[r][c] = val;
    onUpdateActivity(activity.id, { ...state, grid: nextGrid });
  };

  const handleTeacherUpdate = (field: 'tGrade' | 'tComment' | 'tReviewed', val: any) => {
    onUpdateActivity(activity.id, {
      ...state,
      [field]: val,
      tBy: 'docent'
    });
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-amber-300 shadow-sm my-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-amber-100">
        <div>
          <span className="text-[10px] font-bold text-amber-900 uppercase bg-amber-100 px-2.5 py-0.5 rounded-full">
            REVISIÓN DOCENTE · {activity.time ? T(activity.time) : 'Actividad Práctica'}
          </span>
          <h4 className="font-display font-extrabold text-base sm:text-lg text-amber-950 mt-1">
            {T(activity.title)}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${
              isDelivered
                ? 'bg-emerald-100 text-emerald-900'
                : 'bg-amber-100 text-amber-900'
            }`}
          >
            {isDelivered ? 'Entregada por el alumnado' : 'Pendiente de entrega'}
          </span>
          {state.tReviewed && (
            <span className="text-xs font-bold bg-blue-100 text-blue-900 px-3 py-1 rounded-full">
              Revisada por el docente
            </span>
          )}
        </div>
      </div>

      {activity.instr && (
        <p className="text-xs sm:text-sm text-amber-950/85 mb-4 font-medium leading-relaxed">
          {T(activity.instr)}
        </p>
      )}

      {/* Editable Grid / Table if present */}
      {activity.grid && (
        <div className="overflow-x-auto my-4 border border-amber-200 rounded-2xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#3B2211] text-amber-200">
              <tr>
                {activity.grid.cols.map((col, cIdx) => (
                  <th key={cIdx} className="p-2.5 font-bold border-r border-amber-800/40 last:border-0">
                    {T(col)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100">
              {Array.from({ length: activity.grid.rows }).map((_, rIdx) => (
                <tr key={rIdx} className="bg-amber-50/30">
                  {activity.grid!.cols.map((_, cIdx) => (
                    <td key={cIdx} className="p-1.5 border-r border-amber-100 last:border-0">
                      <textarea
                        rows={2}
                        value={(state.grid && state.grid[rIdx] && state.grid[rIdx][cIdx]) || ''}
                        onChange={(e) => handleGridChange(rIdx, cIdx, e.target.value)}
                        placeholder="Escribe aquí..."
                        className="w-full bg-white border border-amber-200 rounded-lg p-1.5 text-xs text-amber-950 focus:outline-hidden focus:border-amber-500"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Text Fields */}
      {(activity.fields || []).map((f, fIdx) => (
        <div key={fIdx} className="my-3">
          <label className="block text-xs font-bold text-amber-950 mb-1">
            {activity.fields!.length > 1 ? `${fIdx + 1}. ` : ''}
            {T(f)}
          </label>
          <textarea
            rows={3}
            value={(state.text && state.text[fIdx]) || ''}
            onChange={(e) => handleFieldChange(fIdx, e.target.value)}
            placeholder="Introduce tu respuesta argumentada..."
            className="w-full bg-amber-50/30 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-all"
          />
        </div>
      ))}

      {activity.rubric && (
        <p className="text-[11px] text-amber-800/80 italic mt-2">
          Criterio orientativo: {T(activity.rubric)}
        </p>
      )}

      {/* Official Solution (Unlocked upon delivery or in Teacher Mode) */}
      {activity.solution && (
        <div className="mt-4 pt-3 border-t border-amber-100">
          {showSolution ? (
            <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-300">
              <span className="font-display font-extrabold text-xs text-emerald-900 block mb-2">
                ✓ Solución propuesta en el manual:
              </span>
              <div className="space-y-1.5 text-xs text-emerald-950 leading-relaxed">
                {activity.solution.map((sol, sIdx) => (
                  <p key={sIdx}>{T(sol)}</p>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-amber-800/80 bg-amber-50 p-3 rounded-xl border border-amber-200">
              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                La solución propuesta en el manual se desbloqueará en cuanto marques la actividad como entregada.
              </span>
            </div>
          )}
        </div>
      )}

      {/* Delivery Toggle Button */}
      <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between">
        <button
          onClick={handleToggleDelivery}
          className={`flex items-center gap-1.5 px-5 py-2 rounded-full font-bold text-xs transition-all cursor-pointer ${
            isDelivered
              ? 'bg-amber-100 hover:bg-amber-200 text-amber-950'
              : 'bg-amber-400 hover:bg-amber-300 text-amber-950 shadow-md'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>{isDelivered ? 'Volver a marcar como pendiente' : 'Marcar como entregada'}</span>
        </button>
      </div>

      {/* Teacher Box */}
      <div className="mt-5 p-4 rounded-2xl bg-amber-50/70 border-2 border-dashed border-amber-300">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-amber-800" />
            <h5 className="font-display font-bold text-xs sm:text-sm text-amber-950">
              Espacio de Calificación y Retroalimentación del Docente
            </h5>
          </div>
          {!isTeacherMode && (
            <span className="text-[10px] text-amber-800/70 italic">
              (Editable activando el Modo Docente arriba)
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-1">
            <label className="block text-[11px] font-bold text-amber-950 mb-1">
              Calificación (opcional)
            </label>
            <input
              type="text"
              disabled={!isTeacherMode}
              value={state.tGrade || ''}
              onChange={(e) => handleTeacherUpdate('tGrade', e.target.value)}
              placeholder="Ej. 9 / 10"
              className="w-full bg-white border border-amber-300 rounded-xl px-3 py-1.5 text-xs text-amber-950 disabled:opacity-60"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-[11px] font-bold text-amber-950 mb-1">
              Comentarios y retroalimentación pedagógica
            </label>
            <input
              type="text"
              disabled={!isTeacherMode}
              value={state.tComment || ''}
              onChange={(e) => handleTeacherUpdate('tComment', e.target.value)}
              placeholder="Escribe observaciones para el informe del alumno..."
              className="w-full bg-white border border-amber-300 rounded-xl px-3 py-1.5 text-xs text-amber-950 disabled:opacity-60"
            />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <input
            type="checkbox"
            id={`chk-${activity.id}`}
            disabled={!isTeacherMode}
            checked={!!state.tReviewed}
            onChange={(e) => handleTeacherUpdate('tReviewed', e.target.checked)}
            className="w-4 h-4 text-amber-600 rounded-md focus:ring-amber-400"
          />
          <label htmlFor={`chk-${activity.id}`} className="text-xs font-bold text-amber-950 cursor-pointer">
            Marcar como revisada por el docente [DOCENTE]
          </label>
        </div>
      </div>
    </div>
  );
}
