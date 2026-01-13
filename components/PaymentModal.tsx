
import React from 'react';
import { X, CreditCard, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Course } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  course: Course;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onConfirm, course }) => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  if (!isOpen) return null;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onConfirm();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-psic-blue/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
        
        {/* Order Summary Sidebar */}
        <div className="bg-gray-50 p-8 md:w-5/12 border-r border-gray-100">
          <button onClick={onClose} className="md:hidden absolute top-4 right-4 text-gray-400">
            <X size={24} />
          </button>
          
          <h3 className="text-xl font-black text-psic-blue mb-6">Tu Pedido</h3>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <img src={course.image} className="w-16 h-16 rounded-xl object-cover shadow-sm" alt={course.title} />
              <div className="flex-1">
                <p className="text-xs font-bold text-psic-green uppercase tracking-widest">{course.category}</p>
                <p className="text-sm font-bold text-psic-blue line-clamp-2 leading-tight">{course.title}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Precio original</span>
                <span className="text-gray-400 line-through">$99.99</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Descuento (50%)</span>
                <span className="text-red-500">-$50.00</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-psic-blue">Total</span>
                <span className="text-3xl font-black text-psic-blue">${course.price}</span>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                <ShieldCheck size={14} className="text-psic-green" /> Pago 100% Seguro
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                <Lock size={14} className="text-psic-green" /> Encriptación SSL de 256 bits
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form Area */}
        <div className="p-8 md:w-7/12 relative bg-white">
          <button onClick={onClose} className="hidden md:block absolute top-6 right-6 text-gray-300 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>

          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-psic-green/10 text-psic-green rounded-full flex items-center justify-center mb-2">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-2xl font-black text-psic-blue">¡Pago Exitoso!</h2>
              <p className="text-gray-500 text-sm">Estamos preparando tu acceso al curso. <br/>Redirigiendo...</p>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-black text-psic-blue mb-6 flex items-center gap-2">
                <CreditCard className="text-psic-green" /> Detalles de Pago
              </h3>
              
              <form onSubmit={handlePayment} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nombre en la tarjeta</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Ej. Juan Pérez"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-psic-green focus:bg-white transition-all text-sm font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Número de tarjeta</label>
                  <div className="relative">
                    <input 
                      required 
                      type="text" 
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-psic-green focus:bg-white transition-all text-sm font-medium pr-12"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 opacity-40">
                      <CreditCard size={20} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Vencimiento</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="MM / AA"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-psic-green focus:bg-white transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">CVC / CVV</label>
                    <input 
                      required 
                      type="password" 
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-psic-green focus:bg-white transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    disabled={isProcessing}
                    type="submit"
                    className="w-full bg-psic-blue text-white py-4 rounded-2xl font-black text-lg hover:bg-opacity-90 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Procesando...
                      </>
                    ) : (
                      <>Pagar e Inscribirse</>
                    )}
                  </button>
                  <p className="text-[10px] text-gray-400 text-center mt-4">
                    Al hacer clic, aceptas nuestros <a href="#" className="underline">Términos de Servicio</a> y <a href="#" className="underline">Privacidad</a>.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
