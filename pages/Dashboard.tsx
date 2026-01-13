
import React from 'react';
import { User, Course, CourseProgress } from '../types';
import { MOCK_COURSES } from '../constants';
import { CourseCard } from '../components/CourseCard';
import { Trophy, Clock, BookOpen, Search } from 'lucide-react';

interface DashboardProps {
  user: User;
  progress: Record<string, CourseProgress>;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, progress }) => {
  const enrolledCourses = MOCK_COURSES.filter(c => user.enrolledCourses.includes(c.id));
  
  const calculateTotalProgress = (courseId: string) => {
    const course = MOCK_COURSES.find(c => c.id === courseId);
    if (!course) return 0;
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const completed = progress[courseId]?.completedLessons.length || 0;
    return Math.round((completed / totalLessons) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-psic-blue">Hola, {user.name} 👋</h1>
          <p className="text-gray-500">Es un gran día para aprender algo nuevo hoy.</p>
        </div>
        <div className="bg-white p-2 rounded-2xl flex items-center shadow-sm border border-gray-100 w-full md:w-80">
          <Search size={20} className="text-gray-400 ml-2" />
          <input type="text" placeholder="Buscar en mis cursos..." className="bg-transparent border-none focus:ring-0 text-sm px-3 w-full" />
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-psic-blue text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-sm font-bold opacity-80 mb-1">Cursos Finalizados</p>
            <h3 className="text-4xl font-black">{enrolledCourses.filter(c => calculateTotalProgress(c.id) === 100).length}</h3>
          </div>
          <Trophy className="absolute right-[-10px] bottom-[-10px] text-white opacity-10" size={120} />
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 bg-psic-green/10 rounded-2xl flex items-center justify-center text-psic-green">
            <BookOpen size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400">Cursos en Progreso</p>
            <h3 className="text-3xl font-black text-psic-blue">{enrolledCourses.filter(c => calculateTotalProgress(c.id) < 100).length}</h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
            <Clock size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400">Total Lecciones</p>
            <h3 className="text-3xl font-black text-psic-blue">
               {enrolledCourses.reduce((acc, c) => acc + c.modules.reduce((macc, m) => macc + m.lessons.length, 0), 0)}
            </h3>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-black text-psic-blue">Mis Cursos</h2>
          {enrolledCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {enrolledCourses.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  isEnrolled={true} 
                  progress={calculateTotalProgress(course.id)} 
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                <Search size={32} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-psic-blue">Aún no tienes cursos</h3>
              <p className="text-gray-500 max-w-xs mx-auto">Comienza tu viaje de aprendizaje explorando nuestro catálogo de psicología.</p>
              <a href="#/explore" className="inline-block bg-psic-green text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all">
                Explorar Cursos
              </a>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-black text-psic-blue">Actividad Reciente</h2>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
            {Object.keys(progress).length > 0 ? (
              Object.entries(progress).slice(0, 3).map(([id, prog]) => {
                const course = MOCK_COURSES.find(c => c.id === id);
                // Cast 'prog' to 'CourseProgress' to fix the 'unknown' property access error
                const courseProg = prog as CourseProgress;
                return (
                  <div key={id} className="flex gap-4 items-center">
                    <img src={course?.image} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-psic-blue line-clamp-1">{course?.title}</p>
                      <p className="text-xs text-gray-400">Hace {Math.round((Date.now() - courseProg.lastAccessed) / 60000)} min</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-psic-green flex items-center justify-center text-[10px] font-bold text-psic-green">
                      {calculateTotalProgress(id)}%
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-400 text-center py-4 italic">No hay actividad registrada</p>
            )}
          </div>

          <div className="bg-psic-green/10 rounded-3xl p-8 space-y-4">
            <h3 className="text-xl font-black text-psic-blue">¿Necesitas ayuda?</h3>
            <p className="text-psic-blue/70 text-sm">Nuestro equipo de soporte está listo para ayudarte con cualquier duda técnica o académica.</p>
            <button className="w-full bg-psic-blue text-white py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all">
              Contactar Soporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
