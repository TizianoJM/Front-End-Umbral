import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Project } from '../types';

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden border border-slate-100 group shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="w-full aspect-[16/10] overflow-hidden relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6 flex flex-col gap-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider w-fit">
          {project.category}
        </span>
        <h3 className="text-slate-900 text-xl font-bold group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <Link 
          to={`/proyectos/${project.id}`}
          className="mt-4 flex items-center text-primary text-sm font-bold gap-1 group/btn"
        >
          Ver Caso de Éxito <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
