import React from 'react';
import { StudentInfo } from '../types';
import { UserCheck, Shield, Sparkles } from 'lucide-react';

interface IdSectionProps {
  student: StudentInfo;
  onChange: (updated: StudentInfo) => void;
}

export default function IdSection({ student, onChange }: IdSectionProps) {
  const handleChange = (field: keyof StudentInfo, value: string) => {
    onChange({
      ...student,
      [field]: value
    });
  };

  const isIdentified = student.name.trim() && student.group.trim();

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-900/10 shadow-xs mb-8">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-display font-bold text-base sm:text-lg text-amber-950">
              Identificación del Docente / Alumnado
            </h2>
            <p className="text-[11px] text-amber-800/80">
              El nombre y el grupo aparecen en el informe individual oficial de evaluación para el docente.
            </p>
          </div>
        </div>

        {isIdentified ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Identificado</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Pendiente de identificar
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-amber-950 mb-1">
            Nombre y Apellidos <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={student.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Ej. María García López"
            className="w-full bg-amber-50/40 border border-amber-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-amber-950 placeholder-amber-400 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-amber-950 mb-1">
            Grupo / Turno <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={student.group}
            onChange={(e) => handleChange('group', e.target.value)}
            placeholder="Ej. MPCDPD-G1"
            className="w-full bg-amber-50/40 border border-amber-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-amber-950 placeholder-amber-400 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-amber-950 mb-1">
            Fecha de Sesión
          </label>
          <input
            type="date"
            value={student.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="w-full bg-amber-50/40 border border-amber-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-amber-950 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-all cursor-pointer"
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="block text-xs font-bold text-amber-950 mb-1">
          Observaciones personales (opcional)
        </label>
        <input
          type="text"
          value={student.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          placeholder="Anotaciones sobre adaptaciones, modalidad virtual/presencial o contexto del centro"
          className="w-full bg-amber-50/40 border border-amber-200 rounded-xl px-3.5 py-2 text-xs text-amber-950 placeholder-amber-400 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-all"
        />
      </div>
    </section>
  );
}
