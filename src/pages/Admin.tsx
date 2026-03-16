import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { ExternalLink, Edit3, LogOut, Save, ArrowLeft, Plus, Trash2, ChevronRight, CheckCircle2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { PROJECTS as STATIC_PROJECTS, SERVICES as STATIC_SERVICES } from '../constants';
import { ImageUpload } from '../components/ImageUpload';

export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [view, setView] = React.useState<'menu' | 'editor' | 'services' | 'projects'>('menu');
  const [siteConfig, setSiteConfig] = React.useState({ homeHeaderPhoto: '' });
  const [services, setServices] = React.useState<any[]>([]);
  const [projects, setProjects] = React.useState<any[]>([]);
  const [message, setMessage] = React.useState<{ text: string, type: 'success' | 'error' } | null>(null);
  const [confirmDelete, setConfirmDelete] = React.useState<{ id: string, type: 'service' | 'project' } | null>(null);

  const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/login');
        return;
      }

      if (user.email === 'tizianominajo@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(true); 
      }
      
      try {
        // Config
        const docRef = doc(db, 'config', 'site');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSiteConfig(docSnap.data() as any);
        }

        // Services
        const sSnap = await getDocs(collection(db, 'services'));
        if (!sSnap.empty) {
          setServices(sSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        } else {
          setServices(STATIC_SERVICES);
        }

        // Projects
        const pSnap = await getDocs(collection(db, 'projects'));
        if (!pSnap.empty) {
          setProjects(pSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        } else {
          setProjects(STATIC_PROJECTS);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
      
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth);
    navigate('/');
  };

  const handleSaveConfig = async () => {
    try {
      await setDoc(doc(db, 'config', 'site'), siteConfig);
      showMessage('Configuración guardada con éxito');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'config/site');
      showMessage('Error al guardar la configuración', 'error');
    }
  };

  const handleSaveServices = async () => {
    setLoading(true);
    try {
      for (const service of services) {
        await setDoc(doc(db, 'services', service.id), service);
      }
      showMessage('Servicios guardados con éxito');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'services');
      showMessage('Error al guardar los servicios', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreServices = () => {
    if (window.confirm('¿Deseas restaurar los servicios originales? Esto no borrará los que ya guardaste, pero añadirá los faltantes.')) {
      const existingIds = services.map(s => s.id);
      const missing = STATIC_SERVICES.filter(s => !existingIds.includes(s.id));
      setServices([...services, ...missing]);
      showMessage('Servicios restaurados en el editor. No olvides guardar.');
    }
  };

  const handleSaveProjects = async () => {
    setLoading(true);
    try {
      for (const project of projects) {
        await setDoc(doc(db, 'projects', project.id), project);
      }
      showMessage('Proyectos guardados con éxito');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'projects');
      showMessage('Error al guardar los proyectos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = () => {
    const newId = `service-${Date.now()}`;
    setServices([...services, {
      id: newId,
      title: '',
      description: '',
      image: '',
      features: []
    }]);
  };

  const handleDeleteService = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'services', id));
      setServices(services.filter(s => s.id !== id));
      showMessage('Servicio eliminado con éxito');
      setConfirmDelete(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `services/${id}`);
      showMessage('Error al eliminar el servicio', 'error');
    }
  };

  const handleAddProject = () => {
    const newId = `project-${Date.now()}`;
    setProjects([...projects, {
      id: newId,
      title: '',
      category: '',
      image: '',
      fullDescription: '',
      scope: [],
      gallery: []
    }]);
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
      setProjects(projects.filter(p => p.id !== id));
      showMessage('Proyecto eliminado con éxito');
      setConfirmDelete(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
      showMessage('Error al eliminar el proyecto', 'error');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

  const renderEditor = () => (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 space-y-8">
        <h2 className="text-2xl font-bold text-navy flex items-center gap-2">
          <Edit3 className="h-6 w-6 text-primary" /> Imagen de Portada (Inicio)
        </h2>
        <div className="space-y-6">
          <ImageUpload 
            value={siteConfig.homeHeaderPhoto}
            onChange={(url) => setSiteConfig({...siteConfig, homeHeaderPhoto: url})}
            folder="config"
            label="Imagen Principal de la Web"
          />
          <button onClick={handleSaveConfig} className="w-full h-14 bg-primary text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Save className="h-5 w-5" /> Guardar Imagen de Portada
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button onClick={() => setView('services')} className="p-8 bg-white rounded-2xl border-2 border-slate-100 hover:border-primary transition-all flex items-center justify-between group">
          <div className="text-left">
            <h3 className="font-bold text-slate-900">Editar Servicios</h3>
            <p className="text-sm text-slate-500">Modificar títulos, fotos y descripciones</p>
          </div>
          <ChevronRight className="h-6 w-6 text-slate-300 group-hover:text-primary transition-colors" />
        </button>
        <button onClick={() => setView('projects')} className="p-8 bg-white rounded-2xl border-2 border-slate-100 hover:border-primary transition-all flex items-center justify-between group">
          <div className="text-left">
            <h3 className="font-bold text-slate-900">Editar Proyectos</h3>
            <p className="text-sm text-slate-500">Gestionar portafolio y ficha técnica</p>
          </div>
          <ChevronRight className="h-6 w-6 text-slate-300 group-hover:text-primary transition-colors" />
        </button>
      </div>
    </div>
  );

  const renderServicesEditor = () => (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy">Gestión de Servicios</h2>
          <p className="text-sm text-slate-500">Los cambios solo se aplicarán al pulsar "Guardar Todos"</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleRestoreServices}
            className="flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-lg font-bold hover:bg-slate-200 transition-colors"
          >
            Restaurar Originales
          </button>
          <button 
            onClick={handleAddService}
            className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg font-bold hover:bg-accent/90 transition-colors"
          >
            <Plus className="h-5 w-5" /> Agregar Servicio
          </button>
        </div>
      </div>
      {services.map((service, index) => (
        <div key={service.id} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 relative group">
          <button 
            onClick={() => setConfirmDelete({ id: service.id, type: 'service' })}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
            title="Eliminar servicio"
          >
            <Trash2 className="h-5 w-5" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Título</label>
              <input 
                type="text" 
                value={service.title} 
                onChange={(e) => {
                  const newServices = [...services];
                  newServices[index].title = e.target.value;
                  setServices(newServices);
                }}
                className="w-full h-12 px-4 rounded-lg border border-slate-200"
                placeholder="Título del servicio"
              />
            </div>
            <div className="space-y-2">
              <ImageUpload 
                value={service.image}
                onChange={(url) => {
                  const newServices = [...services];
                  newServices[index].image = url;
                  setServices(newServices);
                }}
                folder="services"
                label="Imagen del Servicio"
              />
            </div>
          </div>
          <textarea 
            value={service.description}
            onChange={(e) => {
              const newServices = [...services];
              newServices[index].description = e.target.value;
              setServices(newServices);
            }}
            className="w-full p-4 rounded-lg border border-slate-200 min-h-[100px]"
            placeholder="Descripción"
          />
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Items Relevantes (separados por coma)</label>
            <input 
              type="text" 
              value={service.features.join(', ')} 
              onChange={(e) => {
                const newServices = [...services];
                newServices[index].features = e.target.value.split(',').map(s => s.trim());
                setServices(newServices);
              }}
              className="w-full h-12 px-4 rounded-lg border border-slate-200"
            />
          </div>
        </div>
      ))}
      <button 
        onClick={handleSaveServices} 
        disabled={loading}
        className="w-full h-16 bg-emerald-500 text-white font-black text-lg rounded-xl flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-200 disabled:opacity-50"
      >
        {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Save className="h-6 w-6" />}
        GUARDAR TODOS LOS SERVICIOS
      </button>
    </div>
  );

  const renderProjectsEditor = () => (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy">Gestión de Proyectos</h2>
          <p className="text-sm text-slate-500">Recuerda guardar para aplicar los cambios en la web</p>
        </div>
        <button 
          onClick={handleAddProject}
          className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg font-bold hover:bg-accent/90 transition-colors"
        >
          <Plus className="h-5 w-5" /> Agregar Proyecto
        </button>
      </div>
      {projects.map((project, index) => (
        <div key={project.id} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 relative group">
          <button 
            onClick={() => setConfirmDelete({ id: project.id, type: 'project' })}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
            title="Eliminar proyecto"
          >
            <Trash2 className="h-5 w-5" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              type="text" 
              value={project.id} 
              disabled
              className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-slate-50"
              placeholder="ID"
            />
            <input 
              type="text" 
              value={project.title} 
              onChange={(e) => {
                const newProjects = [...projects];
                newProjects[index].title = e.target.value;
                setProjects(newProjects);
              }}
              className="w-full h-12 px-4 rounded-lg border border-slate-200"
              placeholder="Título"
            />
            <input 
              type="text" 
              value={project.category} 
              onChange={(e) => {
                const newProjects = [...projects];
                newProjects[index].category = e.target.value;
                setProjects(newProjects);
              }}
              className="w-full h-12 px-4 rounded-lg border border-slate-200"
              placeholder="Rubro"
            />
          </div>
          <div className="space-y-2">
            <ImageUpload 
              value={project.image}
              onChange={(url) => {
                const newProjects = [...projects];
                newProjects[index].image = url;
                setProjects(newProjects);
              }}
              folder="projects"
              label="Foto de Portada del Proyecto"
            />
          </div>
          <textarea 
            value={project.fullDescription}
            onChange={(e) => {
              const newProjects = [...projects];
              newProjects[index].fullDescription = e.target.value;
              setProjects(newProjects);
            }}
            className="w-full p-4 rounded-lg border border-slate-200 min-h-[100px]"
            placeholder="Ficha Técnica / Descripción Completa"
          />
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Alcances (separados por coma)</label>
            <input 
              type="text" 
              value={project.scope.join(', ')} 
              onChange={(e) => {
                const newProjects = [...projects];
                newProjects[index].scope = e.target.value.split(',').map(s => s.trim());
                setProjects(newProjects);
              }}
              className="w-full h-12 px-4 rounded-lg border border-slate-200"
            />
          </div>
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase">Galería de Fotos</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.gallery.map((url: string, i: number) => (
                <div key={i} className="relative">
                  <ImageUpload 
                    value={url}
                    onChange={(newUrl) => {
                      const newProjects = [...projects];
                      if (newUrl === '') {
                        newProjects[index].gallery.splice(i, 1);
                      } else {
                        newProjects[index].gallery[i] = newUrl;
                      }
                      setProjects(newProjects);
                    }}
                    folder={`projects/${project.id}`}
                  />
                </div>
              ))}
              <button
                onClick={() => {
                  const newProjects = [...projects];
                  newProjects[index].gallery.push('');
                  setProjects(newProjects);
                }}
                className="aspect-video rounded-xl border-2 border-dashed border-slate-200 hover:border-primary hover:bg-slate-50 transition-all flex flex-col items-center justify-center gap-2 text-slate-400"
              >
                <Plus className="h-5 w-5" />
                <span className="text-[10px] font-bold uppercase">Añadir Foto</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      <button 
        onClick={handleSaveProjects} 
        disabled={loading}
        className="w-full h-16 bg-emerald-500 text-white font-black text-lg rounded-xl flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-200 disabled:opacity-50"
      >
        {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Save className="h-6 w-6" />}
        GUARDAR TODOS LOS PROYECTOS
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
              <Trash2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-navy text-center mb-2">¿Confirmar eliminación?</h3>
            <p className="text-slate-500 text-center mb-8">Esta acción no se puede deshacer y el {confirmDelete.type === 'service' ? 'servicio' : 'proyecto'} será borrado permanentemente.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setConfirmDelete(null)}
                className="flex-1 h-12 rounded-lg border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => confirmDelete.type === 'service' ? handleDeleteService(confirmDelete.id) : handleDeleteProject(confirmDelete.id)}
                className="flex-1 h-12 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {message && (
        <div className={`fixed top-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border animate-in fade-in slide-in-from-top-4 duration-300 ${
          message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-red-50 border-red-100 text-red-800'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Trash2 className="h-5 w-5 text-red-500" />}
          <span className="font-bold">{message.text}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {view !== 'menu' && (
          <button 
            onClick={() => setView('menu')}
            className="flex items-center gap-2 text-slate-600 hover:text-primary mb-8 font-bold"
          >
            <ArrowLeft className="h-5 w-5" /> Volver al Menú
          </button>
        )}

        {view === 'menu' ? (
          <div className="max-w-md mx-auto space-y-6 pt-20">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-black text-navy uppercase tracking-tighter">Panel <span className="text-primary">Admin</span></h1>
              <p className="text-slate-500 font-medium">Umbral Ingeniería</p>
            </div>
            <button 
              onClick={() => setView('editor')}
              className="w-full h-24 bg-white border-2 border-slate-100 rounded-2xl flex items-center px-8 gap-4 hover:border-primary hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Edit3 className="h-6 w-6" />
              </div>
              <div className="text-left">
                <span className="block font-bold text-slate-900 text-lg">Modificar Contenido</span>
                <span className="text-sm text-slate-400">Editar fotos, servicios y proyectos</span>
              </div>
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-red-500 font-bold transition-colors pt-8"
            >
              <LogOut className="h-5 w-5" /> Cerrar Sesión
            </button>
          </div>
        ) : (
          <div className="pb-20">
            {view === 'editor' && renderEditor()}
            {view === 'services' && renderServicesEditor()}
            {view === 'projects' && renderProjectsEditor()}
          </div>
        )}
      </div>
    </div>
  );
}
