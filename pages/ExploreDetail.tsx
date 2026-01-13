
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_COURSES } from '../constants';
import { User, Course } from '../types';
import { Star, Users, Check, Play, ShieldCheck, Clock, Award, ChevronDown } from 'lucide-react';
import { PaymentModal } from '../components/PaymentModal';

interface ExploreDetailProps {
  user: User | null;
  onEnroll: (courseId: string) => void;
}

export const ExploreDetail: React.FC<ExploreDetailProps> = ({ user, onEnroll }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = MOCK_COURSES.find(c => c.id === id);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = React.useState(false);

  if (!course) return <div>Curso no encontrado</div>;

  const handleEnrollClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const isEnrolled = user.enrolledCourses.includes(course.id);
    if (isEnrolled) {
      navigate(`/course/${course.id}`);
      return;
    }

    setIsPaymentModalOpen(true);
  };

  const confirmEnrollment = () => {
    onEnroll(course.id);
    setIsPaymentModalOpen(false);
    navigate(`/course/${course.id}`);
  };

  const isEnrolled = user?.enrolledCourses.includes(course.id);

  return (
    <div className="pb-20">
      {/* Header Banner */}
      <div className="bg-psic-blue text-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-psic-green px-3 py-1 rounded-full text-xs font-bold tracking-widest">{course.category.toUpperCase()}</div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight">{course.title}</h1>
            <p className="text-xl text-gray-300 leading-relaxed">{course.description}</p>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star fill="currentColor" size={20} />
                <span className="font-bold text-white text-lg">{course.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} className="text-psic-green" />
                <span className="font-bold">{course.students.toLocaleString()} Estudiantes</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-psic-green" />
                <span className="font-bold">24 Horas de Contenido</span>
              </div>
            </div>
            <p className="text-sm font-medium">Creado por <span className="text-psic-green font-bold underline decoration-wavy">{course.instructor}</span></p>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-psic-green to-blue-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <img src={course.image} className="w-full h-full object-cover" alt={course.title} />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                 <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-all">
                    <Play fill="white" size={32} className="ml-1" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main info */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-10 shadow-xl space-y-12">
            <section className="space-y-6">
              <h2 className="text-2xl font-black text-psic-blue">Lo que aprenderás</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Fundamentos teóricos actualizados.",
                  "Aplicación práctica en casos reales.",
                  "Herramientas de diagnóstico clínico.",
                  "Metodologías de intervención ética.",
                  "Gestión de pacientes y alianza terapéutica.",
                  "Autocuidado profesional del terapeuta."
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <Check className="text-psic-green mt-1 flex-shrink-0" size={18} />
                    <p className="text-gray-600 text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-black text-psic-blue">Currículum del curso</h2>
              <div className="space-y-4">
                {course.modules.map((m, i) => (
                  <div key={m.id} className="border border-gray-100 rounded-2xl p-6 bg-gray-50 flex justify-between items-center group hover:border-psic-green transition-all">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-psic-blue shadow-sm">{i + 1}</div>
                        <div>
                           <h4 className="font-bold text-psic-blue">{m.title}</h4>
                           <p className="text-xs text-gray-400">{m.lessons.length} Lecciones</p>
                        </div>
                     </div>
                     <ChevronDown size={20} className="text-gray-300 group-hover:text-psic-green" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Pricing Sidebar */}
          <div className="lg:col-span-1">
             <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-24 space-y-6">
                <div className="flex items-end gap-2">
                   <span className="text-5xl font-black text-psic-blue">${course.price}</span>
                   <span className="text-gray-400 line-through mb-1">$99.99</span>
                   <span className="bg-red-50 text-red-500 text-xs font-bold px-2 py-1 rounded-md mb-2 ml-2">50% OFF</span>
                </div>
                
                <p className="text-sm text-gray-500 font-medium">Oferta por tiempo limitado. <span className="text-red-500">Faltan 2 horas.</span></p>

                <button 
                  onClick={handleEnrollClick}
                  className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-lg ${isEnrolled ? 'bg-psic-green text-white hover:bg-opacity-90' : 'bg-psic-blue text-white hover:scale-[1.02]'}`}
                >
                  {isEnrolled ? "Acceder al Curso" : "Inscribirse Ahora"}
                </button>

                <div className="space-y-4 pt-4">
                   <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                      <Clock size={18} className="text-psic-green" /> Acceso de por vida
                   </div>
                   <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                      <ShieldCheck size={18} className="text-psic-green" /> 30 días de garantía
                   </div>
                   <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                      <Award size={18} className="text-psic-green" /> Certificado de finalización
                   </div>
                </div>

                <div className="pt-6 border-t border-gray-100 text-center">
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pagos seguros con</p>
                   <div className="flex justify-center gap-4 opacity-30 grayscale">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-5" alt="PayPal" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirm={confirmEnrollment}
        course={course}
      />
    </div>
  );
};
