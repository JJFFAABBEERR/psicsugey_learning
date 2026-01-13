
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login: Any email works
    const demoUser: User = {
      id: 'u1',
      name: email.split('@')[0].toUpperCase() || 'Estudiante Demo',
      email: email || 'sugey@psicsugey.com',
      role: 'student',
      avatar: 'pages/sugey.jpeg',
      enrolledCourses: []
    };
    onLogin(demoUser);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-psic-green rounded-2xl flex items-center justify-center font-bold text-3xl text-white mx-auto mb-4 transform rotate-12">P</div>
          <h2 className="text-3xl font-black text-psic-blue">Bienvenido</h2>
          <p className="text-gray-500">Ingresa para continuar aprendiendo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Correo Electrónico</label>
            <input
              type="email"
              required
              placeholder="ejemplo@correo.com"
              className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-psic-green focus:bg-white transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-psic-green focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="rounded text-psic-green focus:ring-psic-green" />
              Recordarme
            </label>
            <a href="#" className="text-psic-green font-bold hover:underline">¿Olvidaste tu contraseña?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-psic-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 text-sm">
          ¿No tienes una cuenta? <a href="#" className="text-psic-green font-bold hover:underline">Regístrate gratis</a>
        </p>
      </div>
    </div>
  );
};
