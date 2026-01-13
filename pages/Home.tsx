
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Shield, Award, Users, TrendingUp } from 'lucide-react';
import { MOCK_COURSES } from '../constants';
import { CourseCard } from '../components/CourseCard';

export const Home: React.FC = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 md:pt-32 md:pb-40 bg-psic-blue text-white">
        <div className="absolute inset-0 opacity-10">
          <img src="/Sugey.jpeg" className="w-full h-full object-cover" alt="Hero background" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="md:w-2/3 lg:w-1/2 space-y-8">
            <div className="inline-block bg-psic-green px-4 py-1 rounded-full text-sm font-bold tracking-wide animate-pulse">
              PLATAFORMA LÍDER EN PSICOLOGÍA
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Domina la <span className="text-psic-green">Mente</span>, Transforma Vidas
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Cursos certificados por experta en salud mental. Aprende a tu ritmo con la metodología de PsicSugey, diseñada para profesionales y entusiastas del bienestar emocional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/explore" className="bg-psic-green text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all text-center">
                Explorar Catálogo
              </Link>
              <Link to="/login" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-psic-blue transition-all text-center">
                Comenzar Gratis
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/${i + 20}/100`} className="w-10 h-10 rounded-full border-2 border-psic-blue" alt="Student" />
                ))}
                <div className="w-10 h-10 rounded-full bg-psic-green border-2 border-psic-blue flex items-center justify-center text-xs font-bold">+2k</div>
              </div>
              <p className="text-sm text-gray-400">Únete a más de <span className="text-white font-bold">2,500 alumnos</span> graduados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Award className="text-psic-green" />, label: "Cursos Certificados", val: "+50" },
            { icon: <Users className="text-psic-green" />, label: "Estudiantes Activos", val: "2,500+" },
            { icon: <TrendingUp className="text-psic-green" />, label: "Tasa de Finalización", val: "94%" },
            { icon: <Shield className="text-psic-green" />, label: "Seguridad Garantizada", val: "100%" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center text-center border border-gray-100">
              <div className="mb-2">{stat.icon}</div>
              <div className="text-2xl font-black text-psic-blue">{stat.val}</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black text-psic-blue mb-2">Cursos Destacados</h2>
            <p className="text-gray-500">Nuestros programas más valorados por la comunidad.</p>
          </div>
          <Link to="/explore" className="text-psic-green font-bold flex items-center gap-1 hover:underline">
            Ver todos <ArrowRight size={18} />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {MOCK_COURSES.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1544717297-fa154da09f9b?auto=format&fit=crop&w=800&q=80" className="rounded-3xl shadow-2xl" alt="Learning" />
              <div className="absolute -bottom-6 -right-6 bg-psic-green text-white p-6 rounded-2xl shadow-xl hidden md:block">
                <p className="text-sm font-bold opacity-80">Satisfacción</p>
                <p className="text-3xl font-black">99.8%</p>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-black text-psic-blue">¿Por qué aprender con <br/><span className="text-psic-green">PsicSugey</span>?</h2>
              <div className="space-y-4">
                {[
                  "Contenido validado por psicólogos clínicos colegiados.",
                  "Acceso vitalicio a todos tus cursos adquiridos.",
                  "Comunidad privada de networking para terapeutas.",
                  "Certificados digitales con código de verificación QR.",
                  "Soporte 24/7 para resolución de dudas académicas."
                ].map((text, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle className="text-psic-green flex-shrink-0" />
                    <p className="text-gray-700 font-medium">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Simple) */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-psic-blue rounded-[3rem] p-12 text-white relative overflow-hidden text-center space-y-8">
          <div className="text-psic-green/20 text-9xl absolute -top-10 -left-5 font-serif">"</div>
          <h2 className="text-3xl md:text-5xl font-bold max-w-2xl mx-auto relative z-10">
            "La plataforma cambió mi forma de abordar las terapias ´deportivas. Es clara, profesional y muy completa."
          </h2>
          <div className="flex flex-col items-center">
             <img src="https://picsum.photos/seed/doc/100" className="w-16 h-16 rounded-full border-4 border-psic-green mb-4" alt="Testimonial" />
             <p className="font-bold text-lg">Dra. Claudia Rivera</p>
             <p className="text-sm text-gray-400">Psicoterapeuta</p>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-12 h-12 bg-psic-green rounded-full flex items-center justify-center font-bold text-2xl text-white mx-auto mb-4">P</div>
          <p className="text-psic-blue font-bold text-xl mb-2">PsicSugey Learning</p>
          <p className="text-gray-500 text-sm">© 2024 JFaber"El Profe"-PsicSugey Learning. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
