
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlayCircle, CheckCircle, Brain, Download, ChevronRight, Lock, Sparkles, MessageSquare } from 'lucide-react';
import { MOCK_COURSES } from '../constants';
import { User, CourseProgress, Lesson } from '../types';
import { summarizeLesson } from '../services/geminiService';
import { jsPDF } from "jspdf";

interface CourseDetailProps {
  user: User | null;
  progress: Record<string, CourseProgress>;
  onMarkComplete: (courseId: string, lessonId: string) => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ user, progress, onMarkComplete }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = MOCK_COURSES.find(c => c.id === id);
  const [activeLesson, setActiveLesson] = React.useState<Lesson | null>(null);
  const [summary, setSummary] = React.useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = React.useState(false);

  React.useEffect(() => {
    if (course) {
      setActiveLesson(course.modules[0].lessons[0]);
    }
  }, [course]);

  if (!course || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold">Curso no encontrado o sesión expirada</h2>
        <button onClick={() => navigate('/explore')} className="bg-psic-blue text-white px-6 py-2 rounded-lg">Ir a Explorar</button>
      </div>
    );
  }

  const isLessonComplete = (lessonId: string) => {
    return progress[course.id]?.completedLessons.includes(lessonId);
  };

  const calculateProgress = () => {
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const completed = progress[course.id]?.completedLessons.length || 0;
    return Math.round((completed / totalLessons) * 100);
  };

  const handleSummarize = async () => {
    if (!activeLesson) return;
    setLoadingSummary(true);
    setSummary(null);
    const result = await summarizeLesson(activeLesson.title, activeLesson.description);
    setSummary(result);
    setLoadingSummary(false);
  };

  const generateCertificate = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4"
    });

    // Background color
    doc.setFillColor(10, 37, 64);
    doc.rect(0, 0, 297, 210, "F");
    
    // Border
    doc.setDrawColor(29, 185, 84);
    doc.setLineWidth(5);
    doc.rect(10, 10, 277, 190);

    // Text
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(40);
    doc.text("PsicSugey Learning", 148, 60, { align: "center" });

    doc.setFontSize(18);
    doc.setFont("helvetica", "normal");
    doc.text("CERTIFICADO DE FINALIZACION", 148, 80, { align: "center" });

    doc.setFontSize(16);
    doc.text("Este documento certifica que", 148, 100, { align: "center" });

    doc.setFontSize(32);
    doc.setTextColor(29, 185, 84);
    doc.setFont("helvetica", "bold");
    doc.text(user.name, 148, 120, { align: "center" });

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("ha completado con éxito el curso de:", 148, 140, { align: "center" });

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(course.title, 148, 155, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 148, 180, { align: "center" });
    doc.text(`ID Verificación: PSC-${course.id}-${user.id.slice(0,4)}`, 148, 188, { align: "center" });

    doc.save(`Certificado-${course.title.replace(/\s/g, "-")}.pdf`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Header info */}
      <div className="bg-psic-blue text-white p-4">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm font-bold opacity-80 hover:opacity-100">
            <ChevronRight className="rotate-180" size={16} /> Volver a mi Dashboard
          </button>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-psic-green tracking-wider">Tu Progreso</p>
              <p className="text-sm font-bold">{calculateProgress()}% Completado</p>
            </div>
            <div className="w-32 bg-white/20 h-2 rounded-full overflow-hidden">
               <div className="bg-psic-green h-full" style={{ width: `${calculateProgress()}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-4 h-full">
        {/* Sidebar Curriculum */}
        <div className="lg:col-span-1 bg-white border-r border-gray-200 overflow-y-auto max-h-screen">
          <div className="p-6 border-b border-gray-100">
             <h3 className="font-bold text-psic-blue text-lg">Contenido del Curso</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {course.modules.map(module => (
              <div key={module.id} className="p-4 space-y-3">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{module.title}</p>
                <div className="space-y-1">
                  {module.lessons.map(lesson => (
                    <button 
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeLesson?.id === lesson.id ? 'bg-psic-green/10 text-psic-green' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                      {isLessonComplete(lesson.id) ? <CheckCircle size={18} className="text-psic-green flex-shrink-0" /> : <PlayCircle size={18} className="flex-shrink-0" />}
                      <div className="text-left">
                        <p className="text-sm font-bold leading-tight">{lesson.title}</p>
                        <p className="text-[10px] opacity-60 font-medium">{lesson.duration}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {calculateProgress() === 100 && (
             <div className="p-6 space-y-4">
                <div className="bg-psic-green/10 p-4 rounded-2xl border border-psic-green/20">
                  <p className="text-psic-green font-bold text-sm mb-2 flex items-center gap-1"><Award size={16} /> ¡Felicitaciones!</p>
                  <p className="text-xs text-psic-blue/70">Has completado el 100% del curso. Ya puedes descargar tu certificado.</p>
                </div>
                <button 
                  onClick={generateCertificate}
                  className="w-full bg-psic-blue text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 shadow-lg"
                >
                  <Download size={20} /> Descargar Certificado
                </button>
             </div>
          )}
        </div>

        {/* Video Player Area */}
        <div className="lg:col-span-3 p-6 space-y-6">
          {activeLesson ? (
            <>
              <div className="bg-black rounded-3xl overflow-hidden aspect-video shadow-2xl relative group">
                <video 
                  key={activeLesson.id}
                  src={activeLesson.videoUrl} 
                  controls 
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <h1 className="text-2xl font-black text-psic-blue">{activeLesson.title}</h1>
                  <p className="text-gray-500">{activeLesson.description}</p>
                </div>
                <button 
                  onClick={() => onMarkComplete(course.id, activeLesson.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${isLessonComplete(activeLesson.id) ? 'bg-gray-100 text-gray-400 cursor-default' : 'bg-psic-green text-white hover:bg-opacity-90 shadow-lg'}`}
                >
                  {isLessonComplete(activeLesson.id) ? <><CheckCircle size={20} /> Completado</> : "Marcar como Completada"}
                </button>
              </div>

              {/* AI Features */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2 text-psic-blue font-black">
                        <div className="bg-purple-100 text-purple-600 p-2 rounded-lg"><Sparkles size={20} /></div>
                        PsicSugey AI Tutor
                     </div>
                     <button 
                      onClick={handleSummarize}
                      disabled={loadingSummary}
                      className="text-sm font-bold text-psic-green hover:underline flex items-center gap-1 disabled:opacity-50"
                     >
                       {loadingSummary ? "Generando..." : "Resumir lección"}
                     </button>
                  </div>
                  
                  {summary ? (
                    <div className="bg-gray-50 p-6 rounded-2xl text-gray-700 text-sm leading-relaxed border border-gray-100 whitespace-pre-wrap animate-in fade-in slide-in-from-bottom-2">
                       {summary}
                    </div>
                  ) : (
                    <div className="text-center py-10 space-y-4">
                       <Brain size={48} className="mx-auto text-gray-100" />
                       <p className="text-gray-400 text-sm max-w-xs mx-auto">Deja que nuestra IA analice esta lección y te proporcione puntos clave para tu aprendizaje.</p>
                    </div>
                  )}
                </div>

                <div className="bg-psic-blue text-white p-8 rounded-3xl shadow-xl space-y-6">
                   <h3 className="font-bold text-xl flex items-center gap-2"><MessageSquare size={24} className="text-psic-green" /> Notas y Preguntas</h3>
                   <div className="space-y-4">
                      <textarea 
                        placeholder="Escribe tus notas aquí..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-psic-green h-32"
                      />
                      <button className="w-full bg-psic-green py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all">Guardar Nota</button>
                   </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-[60vh] text-gray-400">
               Selecciona una lección para comenzar
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Award = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
  </svg>
);
