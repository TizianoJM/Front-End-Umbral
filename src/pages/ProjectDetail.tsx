import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronRight, MapPin, Calendar, User, Zap, CheckCircle2, ArrowLeft } from 'lucide-react';
import { PROJECTS } from '../constants';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === id);

  if (!project) {
    return <Navigate to="/proyectos" replace />;
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm font-medium">
            <Link to="/" className="text-slate-500 hover:text-primary transition-colors">Inicio</Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <Link to="/proyectos" className="text-slate-500 hover:text-primary transition-colors">Proyectos</Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900 truncate">{project.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative h-[400px] md:h-[600px] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary text-white uppercase tracking-widest mb-4">
              {project.category}
            </span>
            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Descripción del Proyecto</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">Alcance del Proyecto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.scope.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">Galería de Fotos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery.map((img, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden aspect-video bg-slate-100">
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Technical Sheet */}
          <div className="space-y-8">
            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl sticky top-24">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" /> Ficha Técnica
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <User className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Cliente</p>
                    <p className="font-medium">{project.specs.client}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Ubicación</p>
                    <p className="font-medium">{project.specs.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Calendar className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Estado</p>
                    <p className="font-medium">{project.specs.status}</p>
                  </div>
                </div>
                {project.specs.power && (
                  <div className="flex items-start gap-4">
                    <Zap className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Potencia</p>
                      <p className="font-medium">{project.specs.power}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-10 pt-8 border-t border-white/10">
                <Link 
                  to="/contacto"
                  className="w-full h-12 flex items-center justify-center bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Solicitar Información
                </Link>
              </div>
            </div>

            <Link to="/proyectos" className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-colors px-4">
              <ArrowLeft className="h-4 w-4" /> Volver a Proyectos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
