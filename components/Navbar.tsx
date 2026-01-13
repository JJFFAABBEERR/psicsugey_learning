
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut, Menu, X, LayoutDashboard, Search } from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  user: UserType | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-psic-blue text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-psic-green rounded-full flex items-center justify-center font-bold text-xl text-white">P</div>
            <span className="font-bold text-xl tracking-tight hidden md:block">PsicSugey Learning</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 font-medium">
            <Link to="/" className="hover:text-psic-green transition-colors">Inicio</Link>
            <Link to="/explore" className="hover:text-psic-green transition-colors">Explorar</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-1 hover:text-psic-green transition-colors">
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                <div className="flex items-center gap-4 pl-4 border-l border-gray-700">
                  <div className="flex items-center gap-2">
                    <img src={user.avatar} className="w-8 h-8 rounded-full border border-psic-green" alt="User" />
                    <span className="text-sm">{user.name}</span>
                  </div>
                  <button onClick={onLogout} className="text-gray-400 hover:text-red-400 transition-colors">
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" className="bg-psic-green px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition-all">
                Iniciar Sesión
              </Link>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0e3152] px-4 pt-2 pb-6 space-y-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="block py-2">Inicio</Link>
          <Link to="/explore" onClick={() => setIsOpen(false)} className="block py-2">Explorar</Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block py-2">Dashboard</Link>
              <button onClick={() => { onLogout(); setIsOpen(false); }} className="w-full text-left py-2 text-red-400">Cerrar Sesión</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="block py-2 text-psic-green font-bold">Iniciar Sesión</Link>
          )}
        </div>
      )}
    </nav>
  );
};
