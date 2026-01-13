
import React from 'react';
import { MOCK_COURSES } from '../constants';
import { CourseCard } from '../components/CourseCard';
import { Filter, Search, ChevronDown } from 'lucide-react';

export const Explore: React.FC = () => {
  const [filter, setFilter] = React.useState('Todos');
  const categories = ['Todos', 'Infantil', 'Bienestar', 'Profesional'];

  const filteredCourses = filter === 'Todos' 
    ? MOCK_COURSES 
    : MOCK_COURSES.filter(c => c.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <header className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-5xl font-black text-psic-blue">Expande tus Horizontes</h1>
        <p className="text-gray-500">Descubre programas diseñados en psicología clínica, deportiva y desarrollo humano.</p>
      </header>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap ${filter === cat ? 'bg-psic-blue text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="¿Qué quieres aprender hoy?" 
              className="w-full bg-white border border-gray-200 pl-11 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-psic-green focus:border-transparent"
            />
          </div>
          <button className="bg-white p-3 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
           <p className="text-gray-400">No se encontraron cursos en esta categoría.</p>
        </div>
      )}
    </div>
  );
};
