
import React from 'react';
import { Star, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  progress?: number;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, isEnrolled, progress }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      <div className="relative h-48 overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 left-4 bg-psic-blue/90 text-white text-xs font-bold px-3 py-1 rounded-full">
          {course.category}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-1 text-yellow-500 mb-2">
          <Star size={16} fill="currentColor" />
          <span className="text-sm font-bold text-gray-700">{course.rating}</span>
          <span className="text-xs text-gray-400">({course.students} estudiantes)</span>
        </div>
        
        <h3 className="font-bold text-lg mb-2 text-psic-blue leading-tight h-12 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold">
            {course.instructor.charAt(0)}
          </div>
          <span className="text-sm text-gray-600 font-medium">{course.instructor}</span>
        </div>

        {isEnrolled ? (
          <div>
             <div className="flex justify-between items-center text-xs mb-1">
               <span className="text-gray-500">Progreso</span>
               <span className="font-bold text-psic-green">{progress || 0}%</span>
             </div>
             <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
               <div className="bg-psic-green h-2 rounded-full transition-all" style={{ width: `${progress || 0}%` }}></div>
             </div>
             <Link to={`/course/${course.id}`} className="block text-center bg-psic-blue text-white py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all">
               Continuar Aprendiendo
             </Link>
          </div>
        ) : (
          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-psic-blue">${course.price}</span>
            <Link to={`/explore/${course.id}`} className="bg-psic-green/10 text-psic-green px-4 py-2 rounded-lg font-bold hover:bg-psic-green hover:text-white transition-all flex items-center gap-2">
              Ver Detalles <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
