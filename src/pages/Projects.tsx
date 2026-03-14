import React from 'react';
import { motion } from 'motion/react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import { ProjectCard } from '../components/ProjectCard';

const CATEGORIES = ['Todos los Proyectos', 'Residencial', 'Infraestructura', 'Industrial', 'Renovables'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = React.useState('Todos los Proyectos');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredProjects = PROJECTS.filter(project => {
    const matchesCategory = activeCategory === 'Todos los Proyectos' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Page Header */}
        <div className="flex flex-col gap-4 mb-10">
          <h1 className="text-slate-900 text-4xl md:text-5xl font-black leading-tight tracking-tight">
            Nuestro Portafolio de Excelencia
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
            Explore nuestra trayectoria en la entrega de soluciones eléctricas de alta calidad en diversos sectores, desde complejas redes industriales hasta automatización residencial a medida.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex h-10 items-center justify-center rounded-full px-6 text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                    : "bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No se encontraron proyectos que coincidan con tu búsqueda.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center mt-16">
          <div className="flex items-center gap-1 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
            <button className="flex size-10 items-center justify-center text-slate-400 hover:text-primary transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="text-sm font-bold flex size-10 items-center justify-center text-white rounded-lg bg-primary shadow-lg shadow-primary/20">1</button>
            <button className="text-sm font-medium flex size-10 items-center justify-center text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">2</button>
            <button className="text-sm font-medium flex size-10 items-center justify-center text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">3</button>
            <span className="text-slate-400 px-1">...</span>
            <button className="text-sm font-medium flex size-10 items-center justify-center text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">12</button>
            <button className="flex size-10 items-center justify-center text-slate-400 hover:text-primary transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
