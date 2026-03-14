import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensaje enviado con éxito. Nos pondremos en contacto pronto.');
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
              Demos Energía a su Próximo Proyecto
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              Soluciones eléctricas profesionales para su hogar y negocio. Nuestro equipo certificado está listo para ayudarle con reparaciones de emergencia, instalaciones y mantenimiento.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-2xl font-bold mb-6 text-slate-900">Envíanos un mensaje</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Nombre Completo</label>
                  <input 
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="Juan Pérez"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Correo Electrónico</label>
                  <input 
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Mensaje</label>
                  <textarea 
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    className="w-full p-4 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Cuéntenos sobre sus necesidades eléctricas..."
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full h-14 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" /> Enviar Mensaje
                </button>
              </form>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900">Respuesta Rápida</h4>
                  <p className="text-sm text-emerald-700">Normalmente responde en 15 minutos</p>
                </div>
              </div>
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors">
                WhatsApp
              </button>
            </div>
          </div>

          {/* Info Side */}
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-lg text-slate-900">Nuestra Oficina</h4>
                <p className="text-slate-600">
                  123 Voltage Avenue<br />
                  Tech District, Suite 400<br />
                  San Francisco, CA 94103
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-lg text-slate-900">Información de Contacto</h4>
                <p className="text-slate-600">
                  +1 (555) 000-1234<br />
                  info@umbral.cl<br />
                  Soporte de Emergencia 24/7
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" 
                alt="Map location" 
                className="w-full h-full object-cover opacity-50 grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 text-slate-600">
                <div className="relative">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded shadow-xl text-xs font-bold whitespace-nowrap border border-primary/20">
                    Sede Central de Umbral Ingeniería
                  </div>
                  <MapPin className="h-12 w-12 text-primary drop-shadow-lg" />
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-bold mb-4 flex items-center gap-2 text-slate-900">
                <Clock className="h-5 w-5 text-primary" /> Horario de Atención
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Lunes - Viernes</span>
                  <span className="font-medium text-slate-900">08:00 AM - 06:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sábado</span>
                  <span className="font-medium text-slate-900">09:00 AM - 02:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Domingo</span>
                  <span className="font-medium text-primary">Solo Emergencias</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
