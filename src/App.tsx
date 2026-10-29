/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { COURSE_DATA } from './data/courseData';
import { CourseData, AppState, UserActivityState, StudentInfo } from './types';
import HeaderNav from './components/HeaderNav';
import HeroSection from './components/HeroSection';
import TrustStrip from './components/TrustStrip';
import IdSection from './components/IdSection';
import SessionView from './components/SessionView';
import ReportModal from './components/ReportModal';
import ProgressModal from './components/ProgressModal';
import PresentationModal from './components/PresentationModal';
import ThreeViewerModal from './components/ThreeViewerModal';
import ReferenceViewerModal from './components/ReferenceViewerModal';
import Footer from './components/Footer';

const STORAGE_KEY = 'cdpd_ra4_sklep_state_v2';

export default function App() {
  const course: CourseData = COURSE_DATA as any;

  // Initialize state from localStorage or default
  const [appState, setAppState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.day === course.day) {
          return {
            ...parsed,
            teacher: false // teacher mode reset on reload for security
          };
        }
      }
    } catch (e) {
      console.warn('Could not read localStorage', e);
    }

    return {
      day: course.day,
      lang: 'es',
      cur: course.blocks[0].id,
      teacher: false,
      student: {
        name: '',
        group: '',
        date: new Date().toISOString().slice(0, 10),
        notes: ''
      },
      a: {},
      vids: {},
      finalObs: ''
    };
  });

  // Modal visibility states
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [isThreeModalOpen, setIsThreeModalOpen] = useState(false);
  const [isRefModalOpen, setIsRefModalOpen] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
      console.warn('Could not write to localStorage', e);
    }
  }, [appState]);

  // Handlers
  const handleSelectBlock = (blockId: string) => {
    setAppState((prev) => ({ ...prev, cur: blockId }));
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleToggleTeacher = () => {
    if (!appState.teacher) {
      const confirm = window.confirm(
        '¿Activar el Modo Docente? Permite introducir calificaciones y observaciones que se reflejarán en el informe del alumnado.'
      );
      if (!confirm) return;
    }
    setAppState((prev) => ({ ...prev, teacher: !prev.teacher }));
  };

  const handleUpdateStudent = (student: StudentInfo) => {
    setAppState((prev) => ({ ...prev, student }));
  };

  const handleUpdateActivity = (actId: string, updated: UserActivityState) => {
    setAppState((prev) => ({
      ...prev,
      a: {
        ...prev.a,
        [actId]: updated
      }
    }));
  };

  const handleUpdateFinalObs = (obs: string) => {
    setAppState((prev) => ({ ...prev, finalObs: obs }));
  };

  // Export state to JSON file
  const handleExport = () => {
    const dataToExport = {
      app: 'cdpd_ra4_sklep',
      day: course.day,
      exportedAt: new Date().toISOString(),
      state: { ...appState, teacher: false }
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CDPD_RA4_${appState.student.name.replace(/\s+/g, '_') || 'Alumno'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import state from JSON file
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.state && parsed.day === course.day) {
          setAppState({ ...parsed.state, teacher: false });
          alert('¡Trabajo importado correctamente!');
        } else {
          alert('El archivo no corresponde a este módulo CDPD RA4.');
        }
      } catch (err) {
        alert('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  // Reset all state
  const handleClear = () => {
    if (
      window.confirm(
        '¿Seguro que deseas borrar todas las respuestas y datos de este módulo en este navegador?'
      )
    ) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      setAppState({
        day: course.day,
        lang: 'es',
        cur: course.blocks[0].id,
        teacher: false,
        student: {
          name: '',
          group: '',
          date: new Date().toISOString().slice(0, 10),
          notes: ''
        },
        a: {},
        vids: {},
        finalObs: ''
      });
      alert('Datos borrados correctamente.');
    }
  };

  const currentBlock =
    course.blocks.find((b) => b.id === appState.cur) || course.blocks[0];

  const jumpToSession = () => {
    const el = document.getElementById('session-content');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2D241E] flex flex-col font-sans selection:bg-amber-300 selection:text-amber-950">
      {/* Top Header Navigation */}
      <HeaderNav
        course={course}
        appState={appState}
        onSelectBlock={handleSelectBlock}
        onToggleTeacher={handleToggleTeacher}
        onOpenProgress={() => setIsProgressOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenPresentation={() => setIsPresentationOpen(true)}
        onOpenThreeModal={() => setIsThreeModalOpen(true)}
      />

      {/* Hero Section in Sklep style with 3D Boy mascot */}
      <HeroSection
        course={course}
        appState={appState}
        onJumpToCurrentSession={jumpToSession}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Pedagogical 4-Perks Strip */}
      <TrustStrip />

      {/* Main Course Body Container */}
      <main id="session-content" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Student Identification Section */}
        <IdSection
          student={appState.student}
          onChange={handleUpdateStudent}
        />

        {/* Current Session Content (Theory, Infographics, Activities) */}
        <SessionView
          block={currentBlock}
          course={course}
          appState={appState}
          onUpdateActivity={handleUpdateActivity}
          onSelectBlock={handleSelectBlock}
          onOpenReport={() => setIsReportOpen(true)}
          onOpenPresentation={() => setIsPresentationOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenRefModal={() => setIsRefModalOpen(true)}
        onOpenEduModal={() => setIsReportOpen(true)}
      />

      {/* Modals */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        course={course}
        appState={appState}
        onExport={handleExport}
        onImport={handleImport}
        onClear={handleClear}
        onUpdateFinalObs={handleUpdateFinalObs}
      />

      <ProgressModal
        isOpen={isProgressOpen}
        onClose={() => setIsProgressOpen(false)}
        course={course}
        appState={appState}
        onSelectBlock={handleSelectBlock}
      />

      <PresentationModal
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        block={currentBlock}
        course={course}
      />

      <ThreeViewerModal
        isOpen={isThreeModalOpen}
        onClose={() => setIsThreeModalOpen(false)}
      />

      <ReferenceViewerModal
        isOpen={isRefModalOpen}
        onClose={() => setIsRefModalOpen(false)}
      />
    </div>
  );
}
