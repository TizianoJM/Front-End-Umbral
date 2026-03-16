import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithGoogle, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { LogIn } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/admin');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-100">
        <h1 className="text-3xl font-black text-navy mb-2 uppercase tracking-tighter">Umbral <span className="text-primary">Ingeniería</span></h1>
        <p className="text-slate-500 mb-8 font-medium">Panel de Administración</p>
        
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 text-slate-700 h-14 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
        >
          <LogIn className="h-5 w-5 text-primary" />
          Iniciar Sesión con Google
        </button>
        
        <p className="mt-6 text-xs text-slate-400">
          Acceso restringido solo para administradores autorizados.
        </p>
      </div>
    </div>
  );
}
